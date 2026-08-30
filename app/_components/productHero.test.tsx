import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { products } from "@/constants";
import ProductHero, { getQuantityLabel } from "./productHero";

type AnalyticsWindow = Window & {
  gtag?: ReturnType<typeof vi.fn>;
  ym?: ReturnType<typeof vi.fn>;
  _tmr?: { push: ReturnType<typeof vi.fn> };
};

const analyticsWindow = window as AnalyticsWindow;
const serum = products.find(({ id }) => id === "red_pepper")!;
const cream = products.find(({ id }) => id === "renewal")!;

afterEach(() => {
  delete analyticsWindow.gtag;
  delete analyticsWindow.ym;
  delete analyticsWindow._tmr;
  window.history.replaceState({}, "", "/");
});

describe("ProductHero", () => {
  it("uses category-aware quantity labels", () => {
    expect(getQuantityLabel("serum")).toBe("Объем");
    expect(getQuantityLabel("face-cream")).toBe("Масса");
  });

  it.each(products)("shows the distinguishing summary for $id beside its title", (product) => {
    render(<ProductHero product={product} />);

    const heading = screen.getByRole("heading", { level: 1, name: product.title });
    const summary = screen.getByText(product.summary);
    const image = screen.getByRole("img", { name: product.imageAlt });

    expect(summary).toBeVisible();
    expect(heading.compareDocumentPosition(summary)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
    expect(summary.compareDocumentPosition(image)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
  });

  it("renders canonical product identity and marketplace actions", () => {
    render(<ProductHero product={cream} />);
    expect(
      screen.getByRole("heading", { level: 1, name: cream.title }),
    ).toBeVisible();
    expect(screen.getByText("SkineticsLab")).toBeVisible();
    expect(screen.getByText("50 г")).toBeVisible();
    expect(screen.getByRole("img", { name: cream.imageAlt })).toBeVisible();
    expect(screen.getAllByRole("link", { name: /Купить/ })).toHaveLength(2);
  });

  it("uses Ozon brand colors for its marketplace gradient", () => {
    render(<ProductHero product={cream} />);

    expect(screen.getByRole("link", { name: "Купить на Ozon" })).toHaveStyle({
      backgroundImage: "linear-gradient(0.819turn, #005bff 0%, #f1117e 100%)",
    });
  });

  it("uses a white, borderless product image surface", () => {
    render(<ProductHero product={serum} />);

    const imageSurface = screen.getByRole("img", {
      name: serum.imageAlt,
    }).parentElement;

    expect(imageSurface).toHaveStyle({
      backgroundColor: "rgb(255, 255, 255)",
    });
    expect(imageSurface?.parentElement).toHaveStyle({ border: "none" });
  });

  it("emits the one-marketplace serum product-hero payload", () => {
    const gtag = vi.fn();
    analyticsWindow.gtag = gtag;
    analyticsWindow.ym = vi.fn();
    analyticsWindow._tmr = { push: vi.fn() };
    window.history.replaceState({}, "", "/catalog/red_pepper?utm_campaign=growth");

    render(<ProductHero product={serum} />);
    const link = screen.getByRole("link", { name: "Купить на Wildberries" });
    link.addEventListener("click", (event) => event.preventDefault());
    fireEvent.click(link);

    expect(gtag).toHaveBeenCalledWith("event", "marketplace_click", {
      product_id: "red_pepper",
      brand_id: "dr-health",
      marketplace: "wildberries",
      placement: "product-hero",
      page_path: "/catalog/red_pepper",
      campaign: "growth",
    });
  });

  it("emits both two-marketplace cream product-hero payloads", () => {
    const gtag = vi.fn();
    analyticsWindow.gtag = gtag;
    analyticsWindow.ym = vi.fn();
    analyticsWindow._tmr = { push: vi.fn() };
    window.history.replaceState({}, "", "/catalog/renewal?utm_campaign=renewal");

    render(<ProductHero product={cream} />);
    for (const link of screen.getAllByRole("link", { name: /Купить/ })) {
      link.addEventListener("click", (event) => event.preventDefault());
      fireEvent.click(link);
    }

    expect(gtag).toHaveBeenNthCalledWith(1, "event", "marketplace_click", {
      product_id: "renewal",
      brand_id: "skineticslab",
      marketplace: "wildberries",
      placement: "product-hero",
      page_path: "/catalog/renewal",
      campaign: "renewal",
    });
    expect(gtag).toHaveBeenNthCalledWith(2, "event", "marketplace_click", {
      product_id: "renewal",
      brand_id: "skineticslab",
      marketplace: "ozon",
      placement: "product-hero",
      page_path: "/catalog/renewal",
      campaign: "renewal",
    });
  });

  it("keeps a cream product-hero destination usable when analytics throws", () => {
    analyticsWindow.gtag = vi.fn(() => {
      throw new Error("analytics unavailable");
    });
    analyticsWindow.ym = vi.fn(() => {
      throw new Error("analytics unavailable");
    });
    analyticsWindow._tmr = {
      push: vi.fn(() => {
        throw new Error("analytics unavailable");
      }),
    };

    render(<ProductHero product={cream} />);
    const link = screen.getByRole("link", { name: "Купить на Ozon" });
    link.addEventListener("click", (event) => event.preventDefault());

    expect(() => fireEvent.click(link)).not.toThrow();
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(link.getAttribute("href")).toMatch(/^https:\/\/(?:www\.)?ozon\.ru\//);
  });

  it("keeps the mobile document order independent of the desktop grid", () => {
    render(<ProductHero product={cream} />);

    const brand = screen.getByText("SkineticsLab");
    const heading = screen.getByRole("heading", {
      level: 1,
      name: cream.title,
    });
    const image = screen.getByRole("img", { name: cream.imageAlt });
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
