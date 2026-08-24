import { afterEach, describe, expect, it, vi } from "vitest";
import { analyticsLoaders, analyticsQueues } from "./analyticsBootstrap";

type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  ym?: ((...args: unknown[]) => void) & { a?: unknown[] };
  _tmr?: unknown[];
};

const analyticsWindow = window as AnalyticsWindow;
const scriptIds = ["google-analytics", "yandex-metrica", "tmr-code"];

afterEach(() => {
  vi.useRealTimers();
  delete analyticsWindow.dataLayer;
  delete analyticsWindow.gtag;
  delete analyticsWindow.ym;
  delete analyticsWindow._tmr;
  for (const id of scriptIds) {
    document.getElementById(id)?.remove();
  }
});

describe("analytics bootstrap", () => {
  it("creates callable queues without duplicating the route-owned Mail.ru pageview", () => {
    Function(analyticsQueues)();

    expect(analyticsWindow.dataLayer).toHaveLength(2);
    expect(analyticsWindow.ym?.a).toHaveLength(1);
    expect(analyticsWindow._tmr).toEqual([]);
  });

  it("loads each external adapter on the first interaction and only once", () => {
    vi.useFakeTimers();
    Function(analyticsLoaders)();

    expect(scriptIds.every((id) => !document.getElementById(id))).toBe(true);
    window.dispatchEvent(new Event("pointerdown"));
    expect(scriptIds.every((id) => document.getElementById(id))).toBe(true);

    window.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
    vi.advanceTimersByTime(5000);
    expect(scriptIds.map((id) => document.querySelectorAll(`#${id}`).length)).toEqual([1, 1, 1]);
  });
});
