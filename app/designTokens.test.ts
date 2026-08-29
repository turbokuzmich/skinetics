import { describe, expect, it } from "vitest";
import { brandAccents, skinColors, skinRadii, skinSpacing } from "./designTokens";

function relativeLuminance(hex: string) {
  const channels = hex
    .match(/[a-f\d]{2}/gi)!
    .map((channel) => Number.parseInt(channel, 16) / 255)
    .map((channel) =>
      channel <= 0.04045
        ? channel / 12.92
        : ((channel + 0.055) / 1.055) ** 2.4,
    );

  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}

function contrastRatio(foreground: string, background: string) {
  const lighter = Math.max(
    relativeLuminance(foreground),
    relativeLuminance(background),
  );
  const darker = Math.min(
    relativeLuminance(foreground),
    relativeLuminance(background),
  );

  return (lighter + 0.05) / (darker + 0.05);
}

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
      blueMist: "#E5EEF0",
      brandBlue: "#004AAD",
      focus: "#004AAD",
    });
  });

  it("uses the approved logo blue as an accessible portfolio accent", () => {
    expect(skinColors.brandBlue).toBe("#004AAD");
    expect(skinColors.focus).toBe(skinColors.brandBlue);
    expect(
      contrastRatio(skinColors.brandBlue, skinColors.surface),
    ).toBeGreaterThanOrEqual(4.5);
  });

  it("keeps all brand accents text-backed and centrally named", () => {
    expect(brandAccents).toEqual({
      "dr-health": "#526A56",
      skineticslab: "#315C70",
      "neon-beard": "#8C3F51",
    });
  });

  it("keeps text-backed brand accents at AA contrast on cards", () => {
    for (const accent of Object.values(brandAccents)) {
      expect(contrastRatio(accent, skinColors.surface)).toBeGreaterThanOrEqual(
        4.5,
      );
    }
  });

  it("uses the approved 4px spacing base and modest radii", () => {
    expect(skinSpacing(4)).toBe("16px");
    expect(skinRadii).toEqual({ small: 4, medium: 8, large: 16 });
  });
});
