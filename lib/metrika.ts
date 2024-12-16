type Goal = "form" | "go_wb";

type ReachGoalFn = (id: number, method: string, param: string) => void;

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

export function reachGoalGoWb() {
  reachGoal("go_wb");
}
