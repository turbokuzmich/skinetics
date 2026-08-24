import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import LandingPage from "./page";

vi.mock("./_components/metrika", () => ({ default: () => null }));

describe("homepage", () => {
  it("presents the multi-brand catalog journey without video", () => {
    const { container } = render(<LandingPage />);
    const videoPath = ["/", "vid", "eo", "/"].join("");

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByText(
        /покупка и доставка оформляются на Wildberries или Ozon/i,
      ),
    ).toBeVisible();
    expect(
      screen.getByRole("link", { name: "Смотреть каталог" }),
    ).toHaveAttribute("href", "/catalog");
    expect(screen.getByRole("link", { name: "Сыворотки" })).toHaveAttribute(
      "href",
      "/serum",
    );
    expect(screen.getByRole("link", { name: "Кремы" })).toHaveAttribute(
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
    expect(
      screen.queryByRole("link", { name: /Купить/ }),
    ).not.toBeInTheDocument();
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
});
