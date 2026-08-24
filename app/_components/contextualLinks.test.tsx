import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { products } from "@/constants";
import ContextualLinks from "./contextualLinks";

describe("ContextualLinks", () => {
  it("renders the category return as a 44px inline-flex target", () => {
    const product = products.find(({ id }) => id === "renewal")!;
    render(<ContextualLinks product={product} />);

    const navigation = screen.getByRole("navigation", {
      name: "Навигация по каталогу",
    });
    const link = screen.getByRole("link", {
      name: "Вернуться: Кремы для лица",
    });

    expect(navigation).toContainElement(link);
    expect(link).toHaveAttribute("href", "/cream");
    expect(link).toHaveStyle({
      alignItems: "center",
      display: "inline-flex",
      minHeight: "44px",
    });
  });
});
