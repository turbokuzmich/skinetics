import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { products } from "@/constants";
import Catalog from "./catalog";
import ProductCard from "./productCard";
import SectionHeading from "./sectionHeading";

const serum = products.find(({ id }) => id === "red_pepper")!;
const cream = products.find(({ id }) => id === "ultra_lift")!;

type AnalyticsWindow = Window & {
  gtag?: ReturnType<typeof vi.fn>;
  ym?: ReturnType<typeof vi.fn>;
  _tmr?: { push: ReturnType<typeof vi.fn> };
};

const analyticsWindow = window as AnalyticsWindow;

afterEach(() => {
  delete analyticsWindow.gtag;
  delete analyticsWindow.ym;
  delete analyticsWindow._tmr;
  window.history.replaceState({}, "", "/");
});

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

  it("uses the requested card heading level", () => {
    render(<ProductCard headingComponent="h2" product={serum} />);
    expect(
      screen.getByRole("heading", { level: 2, name: serum.title }),
    ).toBeVisible();
  });

  it("renders both cream marketplaces in accepted order", () => {
    render(<ProductCard product={cream} showMarketplaceActions />);
    expect(
      screen
        .getAllByRole("link", { name: /Купить/ })
        .map((link) => link.textContent),
    ).toEqual(["Купить на WB", "Купить на Ozon"]);
  });

  it("emits the two-marketplace cream card payload", () => {
    const gtag = vi.fn();
    analyticsWindow.gtag = gtag;
    analyticsWindow.ym = vi.fn();
    analyticsWindow._tmr = { push: vi.fn() };
    window.history.replaceState({}, "", "/cream?utm_campaign=face-care");

    render(<ProductCard product={cream} showMarketplaceActions />);
    const link = screen.getByRole("link", { name: "Купить на Ozon" });
    link.addEventListener("click", (event) => event.preventDefault());
    fireEvent.click(link);

    expect(gtag).toHaveBeenCalledWith("event", "marketplace_click", {
      product_id: "ultra_lift",
      brand_id: "neon-beard",
      marketplace: "ozon",
      placement: "catalog-card",
      page_path: "/cream",
      campaign: "face-care",
    });
  });

  it("preserves marketplace URL attributes, campaign data, and catalog-card analytics", async () => {
    const gtag = vi.fn();
    const ym = vi.fn();
    const tmrPush = vi.fn();
    analyticsWindow.gtag = gtag;
    analyticsWindow.ym = ym;
    analyticsWindow._tmr = { push: tmrPush };
    window.history.replaceState(
      {},
      "",
      "/catalog?utm_source=newsletter&utm_medium=email&utm_campaign=summer&utm_term=scalp",
    );

    render(<ProductCard product={serum} showMarketplaceActions />);
    const link = screen.getByRole("link", { name: "Купить на WB" });
    link.addEventListener("click", (event) => event.preventDefault());

    await waitFor(() => {
      const url = new URL(link.getAttribute("href")!);
      expect(url.origin).toBe("https://www.wildberries.ru");
      expect(url.pathname).toBe("/catalog/397061523/detail.aspx");
      expect(url.searchParams.get("utm_source")).toBe("newsletter");
      expect(url.searchParams.get("utm_medium")).toBe("email");
      expect(url.searchParams.get("utm_campaign")).toBe(
        "73308-id-site-summer",
      );
      expect(url.searchParams.get("utm_term")).toBe("scalp");
    });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");

    fireEvent.click(link);
    const event = {
      product_id: "red_pepper",
      brand_id: "dr-health",
      marketplace: "wildberries",
      placement: "catalog-card",
      page_path: "/catalog",
      campaign: "summer",
    };
    expect(gtag).toHaveBeenCalledWith("event", "marketplace_click", event);
    expect(ym).toHaveBeenCalledWith(98874723, "reachGoal", "go_wb", event);
    expect(tmrPush).toHaveBeenCalledWith({
      id: 3589962,
      type: "reachGoal",
      goal: "go_wb",
    });
  });

  it("keeps the external destination usable when analytics adapters throw", () => {
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

    render(<ProductCard product={serum} showMarketplaceActions />);
    const link = screen.getByRole("link", { name: "Купить на WB" });
    link.addEventListener("click", (event) => event.preventDefault());

    expect(() => fireEvent.click(link)).not.toThrow();
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(link.getAttribute("href")).toMatch(
      /^https:\/\/www\.wildberries\.ru\/catalog\/397061523\/detail\.aspx/,
    );
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
