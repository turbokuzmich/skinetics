import { render, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import Metrika from "./metrika";

type AnalyticsWindow = Window & {
  ym?: unknown;
  _tmr?: unknown[];
};

const analyticsWindow = window as AnalyticsWindow;

afterEach(() => {
  delete analyticsWindow.ym;
  delete analyticsWindow._tmr;
  window.history.replaceState({}, "", "/");
});

describe("Metrika route tracking", () => {
  it("queues exactly one Mail.ru pageview for the current route", async () => {
    analyticsWindow._tmr = [];
    window.history.replaceState({}, "", "/catalog/red_pepper");

    render(<Metrika />);

    await waitFor(() => {
      expect(analyticsWindow._tmr).toEqual([
        {
          id: 3589962,
          type: "pageView",
          url: "https://skinetics.ru/catalog/red_pepper",
        },
      ]);
    });
  });
});
