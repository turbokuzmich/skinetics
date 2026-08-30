import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import LandingPage from "./page";

vi.mock("./_components/metrika", () => ({ default: () => null }));

describe("homepage", () => {
  it("presents the multi-brand catalog journey without video", async () => {
    const user = userEvent.setup();
    const { container } = render(<LandingPage />);
    const videoPath = ["/", "vid", "eo", "/"].join("");

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    const heroCarousel = screen.getByRole("figure", {
      name: "Средства трёх брендов каталога Skinetics",
    });

    expect(
      Array.from(
        heroCarousel.querySelectorAll('[aria-live="polite"]'),
        (element) => element.textContent?.trim(),
      ),
    ).not.toContain("01 / 03");

    const wildberriesLink = within(heroCarousel).getByRole("link", {
      name: "Купить на Wildberries",
    });

    expect(wildberriesLink).toHaveAttribute(
      "href",
      expect.stringContaining("wildberries.ru"),
    );
    expect(wildberriesLink).not.toHaveTextContent("Купить");
    expect(
      within(heroCarousel).queryByRole("link", { name: "Купить на Ozon" }),
    ).not.toBeInTheDocument();
    expect(
      heroCarousel.querySelector('img[src*="wildberries.svg"]'),
    ).toBeTruthy();

    await user.click(
      within(heroCarousel).getByRole("button", { name: "Следующий товар" }),
    );

    expect(
      within(heroCarousel).getByRole("link", { name: "Купить на Ozon" }),
    ).toHaveAttribute("href", expect.stringContaining("ozon.ru"));
    expect(
      heroCarousel.querySelector('img[src*="ozon-square.svg"]'),
    ).toBeTruthy();
    expect(
      screen.getByRole("link", { name: "Смотреть каталог" }),
    ).toHaveAttribute("href", "/catalog");
    expect(screen.getByRole("link", { name: "Сыворотки для кожи головы" })).toHaveAttribute(
      "href",
      "/serum",
    );
    expect(screen.getByRole("link", { name: "Кремы для лица" })).toHaveAttribute(
      "href",
      "/cream",
    );
    for (const slug of [
      "red_pepper",
      "copper_tripeptide",
      "climbazole",
      "ultra-lift",
      "renewal",
    ]) {
      expect(container.querySelector(`a[href="/catalog/${slug}"]`)).toBeTruthy();
    }
    expect(
      screen.getByText(
        "ООО «Демидов Люкс СПА» является членом Московского инновационного кластера.",
      ),
    ).toBeVisible();
    expect(
      screen.getByText(
        "Компания представлена в каталоге Московского экспортёра.",
      ),
    ).toBeVisible();
    expect(
      screen.getByText("Компания участвует в программе «Сделано в Москве»."),
    ).toBeVisible();
    expect(
      screen.getByRole("link", { name: "Подробнее о компании" }),
    ).toHaveAttribute("href", "/about");
    expect(container.querySelector("video")).not.toBeInTheDocument();
    expect(container.innerHTML).not.toContain(videoPath);
  });

  it("renders trust evidence as a semantic list", () => {
    render(<LandingPage />);

    const firstFact = screen.getByText(
      "ООО «Демидов Люкс СПА» является членом Московского инновационного кластера.",
    );
    const trustList = firstFact.closest("ul");

    expect(trustList).not.toBeNull();
    expect(
      Array.from(trustList!.children, ({ tagName }) => tagName),
    ).toEqual(["LI", "LI", "LI"]);
  });

  it("uses each category card as a single link", () => {
    render(<LandingPage />);

    for (const category of [
      {
        name: "Сыворотки для кожи головы",
        description:
          "Несмываемые сыворотки для ухода при склонности к выпадению волос, перхоти и жирности кожи головы.",
      },
      {
        name: "Кремы для лица",
        description:
          "Ежедневный уход за кожей лица с пептидами, увлажняющими и смягчающими компонентами.",
      },
    ]) {
      const links = screen.getAllByRole("link", { name: category.name });

      expect(links).toHaveLength(1);
      expect(
        within(links[0]).getByRole("heading", { name: category.name }),
      ).toBeVisible();
      expect(within(links[0]).getByText(category.description)).toBeVisible();
    }
  });
});
