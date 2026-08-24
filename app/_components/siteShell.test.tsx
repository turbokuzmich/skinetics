import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import SiteFooter from "./siteFooter";
import SiteHeader from "./siteHeader";

const expectedLinks = ["Каталог", "Сыворотки", "Кремы", "О нас", "Контакты"];

describe("site shell", () => {
  it("renders the accepted desktop navigation in order", () => {
    render(<SiteHeader />);
    const nav = screen.getByRole("navigation", { name: "Основная навигация" });
    expect(within(nav).getAllByRole("link").map((link) => link.textContent)).toEqual(expectedLinks);
    expect(within(nav).queryByText(/Бренды|Ингредиенты|По задачам|Экспертные/)).not.toBeInTheDocument();
  });

  it("opens and closes the same navigation from the mobile menu", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);
    await user.click(screen.getByRole("button", { name: "Открыть меню" }));
    expect(screen.getByRole("navigation", { name: "Мобильная навигация" })).toBeVisible();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("navigation", { name: "Мобильная навигация" })).not.toBeInTheDocument();
  });

  it("groups only published destinations in the footer", () => {
    render(<SiteFooter />);
    const footer = screen.getByRole("contentinfo");
    expect(within(footer).getByRole("link", { name: "Все средства" })).toHaveAttribute("href", "/catalog");
    expect(within(footer).queryByText(/Ингредиенты|Экспертные материалы/)).not.toBeInTheDocument();
  });
});
