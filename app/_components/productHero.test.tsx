import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { products } from "@/constants";
import ProductHero, { getQuantityLabel } from "./productHero";

describe("ProductHero", () => {
  it("uses category-aware quantity labels", () => {
    expect(getQuantityLabel("serum")).toBe("Объем");
    expect(getQuantityLabel("face-cream")).toBe("Масса");
  });

  it("renders canonical product identity and marketplace actions", () => {
    const product = products.find(({ id }) => id === "renewal")!;
    render(<ProductHero product={product} />);
    expect(
      screen.getByRole("heading", { level: 1, name: product.title }),
    ).toBeVisible();
    expect(screen.getByText("SkineticsLab")).toBeVisible();
    expect(screen.getByText("50 г")).toBeVisible();
    expect(screen.getByRole("img", { name: product.imageAlt })).toBeVisible();
    expect(screen.getAllByRole("link", { name: /Купить/ })).toHaveLength(2);
  });

  it("keeps the mobile document order independent of the desktop grid", () => {
    const product = products.find(({ id }) => id === "renewal")!;
    render(<ProductHero product={product} />);

    const brand = screen.getByText("SkineticsLab");
    const heading = screen.getByRole("heading", {
      level: 1,
      name: product.title,
    });
    const image = screen.getByRole("img", { name: product.imageAlt });
    const quantity = screen.getByText("Масса");
    const marketplaceAction = screen.getByRole("link", {
      name: "Купить на Wildberries",
    });

    expect(brand.compareDocumentPosition(heading)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
    expect(heading.compareDocumentPosition(image)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
    expect(image.compareDocumentPosition(quantity)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
    expect(quantity.compareDocumentPosition(marketplaceAction)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
  });
});
