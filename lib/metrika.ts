import type {
  MarketplaceClickEvent,
  MarketplaceId,
} from "@/types";

type Goal = "form" | "go_wb" | "go_ozon";

type ReachGoalFn = (
  id: number,
  method: "reachGoal",
  goal: Goal,
  params?: MarketplaceClickEvent
) => void;

type GtagFn = (
  command: "event",
  eventName: "marketplace_click",
  params: MarketplaceClickEvent
) => void;

type TMR = {
  push(params: { type: string; id: number; goal: string }): void;
};

export default function reachGoal(goal: Goal) {
  if ("ym" in window) {
    (window.ym as ReachGoalFn)(98874723, "reachGoal", goal);
  }
  if ("_tmr" in window && window._tmr.push) {
    (window._tmr as TMR).push({ id: 3589962, type: "reachGoal", goal });
  }
}

export function reachGoalForm() {
  reachGoal("form");
}

const marketplaceGoals: Record<MarketplaceId, Goal> = {
  wildberries: "go_wb",
  ozon: "go_ozon",
};

export function reachMarketplaceClick(event: MarketplaceClickEvent) {
  try {
    if ("gtag" in window) {
      (window.gtag as GtagFn)("event", "marketplace_click", event);
    }
  } catch {
    // Analytics must never prevent marketplace navigation.
  }

  const compatibilityGoal = marketplaceGoals[event.marketplace];

  try {
    if ("ym" in window) {
      (window.ym as ReachGoalFn)(
        98874723,
        "reachGoal",
        compatibilityGoal,
        event
      );
    }
  } catch {
    // Analytics must never prevent marketplace navigation.
  }

  try {
    if ("_tmr" in window && window._tmr.push) {
      (window._tmr as TMR).push({
        id: 3589962,
        type: "reachGoal",
        goal: compatibilityGoal,
      });
    }
  } catch {
    // Analytics must never prevent marketplace navigation.
  }
}
