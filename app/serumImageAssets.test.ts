import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { products } from "@/constants";

const expected = {
  red_pepper: "/items/red_pepper-wildberries.webp",
  copper_tripeptide: "/items/copper_tripeptide-wildberries.webp",
  climbazole: "/items/climbazole-wildberries.webp",
};

describe("serum presentation assets", () => {
  it.each(Object.entries(expected))(
    "uses a present verified asset for %s",
    (id, image) => {
      expect(products.find((product) => product.id === id)?.image).toBe(image);
      expect(fs.existsSync(path.join(process.cwd(), "public", image))).toBe(true);
    },
  );
});
