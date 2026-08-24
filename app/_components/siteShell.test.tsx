import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import SiteFooter from "./siteFooter";
import SiteHeader from "./siteHeader";

const expectedLinks = [
  { title: "Каталог", to: "/catalog" },
  { title: "Сыворотки", to: "/serum" },
  { title: "Кремы", to: "/cream" },
  { title: "О нас", to: "/about" },
  { title: "Контакты", to: "/contacts" },
];

describe("site shell", () => {
  it("renders the accepted desktop navigation in order", () => {
    render(<SiteHeader />);
    expect(screen.getByRole("link", { name: "Skinetics, главная" })).toHaveStyle({
      minHeight: "44px",
      minWidth: "44px",
    });
    const nav = screen.getByRole("navigation", { name: "Основная навигация" });
    expect(within(nav).getAllByRole("link").map((link) => link.textContent)).toEqual(
      expectedLinks.map(({ title }) => title)
    );
    expect(within(nav).queryByText(/Бренды|Ингредиенты|По задачам|Экспертные/)).not.toBeInTheDocument();
  });

  it("opens a named mobile dialog with the same ordered destinations", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);
    const trigger = screen.getByRole("button", { name: "Открыть меню" });

    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveAttribute("aria-controls", "mobile-navigation-drawer");
    await user.click(trigger);

    const dialog = screen.getByRole("dialog", { name: "Меню" });
    expect(dialog).toHaveAttribute("id", "mobile-navigation-drawer");
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("button", { name: "Закрыть меню" })).toHaveFocus();

    const nav = within(dialog).getByRole("navigation", { name: "Мобильная навигация" });
    expect(within(nav).getAllByRole("link").map((link) => ({
      title: link.textContent,
      to: link.getAttribute("href"),
    }))).toEqual(expectedLinks);
  });

  it("contains focus while open and restores it after Escape", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);
    const trigger = screen.getByRole("button", { name: "Открыть меню" });

    await user.click(trigger);
    const dialog = screen.getByRole("dialog", { name: "Меню" });
    for (let index = 0; index < expectedLinks.length + 3; index += 1) {
      await user.tab();
      expect(dialog).toContainElement(document.activeElement as HTMLElement);
    }

    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog", { name: "Меню" })).not.toBeInTheDocument());
    expect(trigger).toHaveFocus();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("closes from both the close button and a navigation link", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);
    const trigger = screen.getByRole("button", { name: "Открыть меню" });

    await user.click(trigger);
    await user.click(screen.getByRole("button", { name: "Закрыть меню" }));
    await waitFor(() => expect(screen.queryByRole("dialog", { name: "Меню" })).not.toBeInTheDocument());
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await user.click(trigger);
    const mobileNav = screen.getByRole("navigation", { name: "Мобильная навигация" });
    const catalogLink = within(mobileNav).getByRole("link", { name: "Каталог" });
    catalogLink.addEventListener("click", (event) => event.preventDefault());
    await user.click(catalogLink);
    await waitFor(() => expect(screen.queryByRole("dialog", { name: "Меню" })).not.toBeInTheDocument());
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("groups only published destinations in the footer", () => {
    render(<SiteFooter />);
    const footer = screen.getByRole("contentinfo");
    expect(within(footer).getAllByRole("heading", { level: 2 }).map((heading) => heading.textContent)).toEqual([
      "Записаться к трихологу",
      "Каталог",
      "Skinetics",
    ]);
    expect(within(footer).getByRole("link", { name: "Skinetics, главная" })).toHaveStyle({
      minHeight: "44px",
      minWidth: "44px",
    });
    expect(within(footer).getByRole("link", { name: "О нас" })).toHaveStyle({
      minHeight: "44px",
      minWidth: "44px",
    });
    expect(within(footer).getByRole("link", { name: "Все средства" })).toHaveAttribute("href", "/catalog");
    expect(within(footer).queryByText(/Ингредиенты|Экспертные материалы/)).not.toBeInTheDocument();
  });
});
