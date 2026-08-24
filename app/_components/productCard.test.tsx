import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { products } from "@/constants";
import ProductCard from "./productCard";
import SectionHeading from "./sectionHeading";

const serum = products.find(({ id }) => id === "red_pepper")!;
const cream = products.find(({ id }) => id === "ultra_lift")!;

describe("ProductCard", () => {
  it("shows brand, quantity, purpose, image alternative, and canonical detail link", () => {
    render(<ProductCard product={serum} />);
    expect(screen.getByText("Dr. Health")).toBeVisible();
    expect(screen.getByText("100 мл")).toBeVisible();
    expect(screen.getByText(serum.summary)).toBeVisible();
    expect(screen.getByRole("img", { name: serum.imageAlt })).toBeVisible();
    expect(
      screen.getByRole("link", { name: `Подробнее: ${serum.title}` }),
    ).toHaveAttribute("href", "/catalog/red_pepper");
  });

  it("renders both cream marketplaces in accepted order", () => {
    render(<ProductCard product={cream} showMarketplaceActions />);
    expect(
      screen
        .getAllByRole("link", { name: /Купить/ })
        .map((link) => link.textContent),
    ).toEqual(["Купить на WB", "Купить на Ozon"]);
  });
});

describe("SectionHeading", () => {
  it("preserves the requested semantic heading level", () => {
    render(
      <SectionHeading
        component="h2"
        description="Краткое описание раздела"
        eyebrow="Категория"
        heading="Выберите средство"
      />,
    );
    expect(
      screen.getByRole("heading", { level: 2, name: "Выберите средство" }),
    ).toBeVisible();
    expect(screen.getByText("Краткое описание раздела")).toBeVisible();
  });
});
