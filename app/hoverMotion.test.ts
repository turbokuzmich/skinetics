import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const readSource = (relativePath: string) =>
  fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");

describe("hover motion", () => {
  it("keeps slider and card surfaces stationary while preserving arrow lift", () => {
    const carousel = readSource("app/_components/homeHeroCarousel.tsx");
    const categories = readSource("app/_components/categoryNavigation.tsx");
    const globals = readSource("app/globals.css");

    expect(carousel).not.toContain('transform: "translateY(-4px)"');
    expect(categories).not.toContain('transform: "translateY(-5px)"');
    expect(globals).not.toContain("transform: translateY(-6px)");
    expect(carousel.match(/transform: "translateY\(-2px\)"/g)).toHaveLength(2);
  });
});
