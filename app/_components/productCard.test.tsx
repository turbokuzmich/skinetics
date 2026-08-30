import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { products } from "@/constants";
import Catalog from "./catalog";
import ProductCard from "./productCard";
import SectionHeading from "./sectionHeading";

const serum = products.find(({ id }) => id === "red_pepper")!;

describe("ProductCard", () => {
  it("shows brand, quantity, purpose, image alternative, and canonical detail link", () => {
    render(<ProductCard product={serum} />);
    expect(screen.getByRole("article")).toBeVisible();
    expect(screen.getByText("Dr. Health")).toBeVisible();
    expect(screen.getByText("100 мл")).toBeVisible();
    expect(screen.getByText(serum.summary)).toBeVisible();
    expect(screen.getByRole("img", { name: serum.imageAlt })).toBeVisible();
    expect(
      screen.getByRole("link", { name: `Подробнее: ${serum.title}` }),
    ).toHaveAttribute("href", "/catalog/red_pepper");
  });

  it("uses a white surface around the product image", () => {
    render(<ProductCard product={serum} />);

    expect(screen.getByRole("img", { name: serum.imageAlt }).parentElement)
      .toHaveStyle({ backgroundColor: "rgb(255, 255, 255)" });
  });

  it("uses the requested card heading level", () => {
    render(<ProductCard headingComponent="h2" product={serum} />);
    expect(
      screen.getByRole("heading", { level: 2, name: serum.title }),
    ).toBeVisible();
  });

});

describe("Catalog", () => {
  it("renders article cards with H2 titles under the listing H1", () => {
    render(<Catalog heading="Каталог" description="Описание каталога" />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Каталог" }),
    ).toBeVisible();
    const cards = screen.getAllByRole("article");
    expect(cards).toHaveLength(5);
    for (const card of cards) {
      expect(within(card).getByRole("heading", { level: 2 })).toBeVisible();
    }
  });

  it("keeps marketplace actions out of product cards", () => {
    render(<Catalog heading="Каталог" description="Описание каталога" />);

    for (const card of screen.getAllByRole("article")) {
      expect(within(card).queryByRole("link", { name: /Купить/ })).toBeNull();
    }
  });

  it("renders H3 card titles when Catalog is an H2 section", () => {
    render(
      <Catalog
        heading="Средства"
        headingComponent="h2"
        description="Описание раздела"
      />,
    );
    expect(
      screen.getByRole("heading", { level: 2, name: "Средства" }),
    ).toBeVisible();
    for (const card of screen.getAllByRole("article")) {
      expect(within(card).getByRole("heading", { level: 3 })).toBeVisible();
    }
  });

  it("prioritizes only the first listing image", () => {
    render(<Catalog heading="Каталог" description="Описание каталога" />);
    const images = screen.getAllByRole("img");
    expect(images[0]).toHaveAttribute("data-priority", "true");
    for (const image of images.slice(1)) {
      expect(image).toHaveAttribute("data-priority", "false");
    }
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
