import { describe, expect, it } from "vitest";
import { brandAccents, skinColors, skinRadii, skinSpacing } from "./designTokens";

describe("Phase 04 design tokens", () => {
  it("exposes the approved navigational-editorial palette", () => {
    expect(skinColors).toEqual({
      canvas: "#F5F1E8",
      surface: "#FBF8F0",
      ink: "#17221E",
      mutedInk: "#46534D",
      border: "#D8D0C2",
      clay: "#A5563B",
      botanical: "#657A68",
      focus: "#005FCC",
    });
  });

  it("keeps all brand accents text-backed and centrally named", () => {
    expect(brandAccents).toEqual({
      "dr-health": "#657A68",
      skineticslab: "#315C70",
      "neon-beard": "#8C3F51",
    });
  });

  it("uses the approved 4px spacing base and modest radii", () => {
    expect(skinSpacing(4)).toBe("16px");
    expect(skinRadii).toEqual({ small: 4, medium: 8, large: 16 });
  });
});
