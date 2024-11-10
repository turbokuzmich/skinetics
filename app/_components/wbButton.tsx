"use client";

import Button from "@mui/material/Button";
import { useCallback } from "react";

type ReachGoalFn = (id: number, method: string, param: string) => void;

export default function WbButton({
  link,
  buttonText = "Купить на wildberries",
}: Readonly<{ link: string; buttonText?: string }>) {
  const onClick = useCallback(() => {
    if ("ym" in window) {
      (window.ym as ReachGoalFn)(98874723, "reachGoal", "go_wb");
    }
  }, []);

  return (
    <Button
      onClick={onClick}
      size="large"
      href={link}
      target="blank"
      rel="noopener"
      sx={{
        color: "white",
        textTransform: "uppercase",
        backgroundColor: "transparent",
        paddingInline: 3,
        backgroundImage:
          "linear-gradient(0.819turn,rgba(99,16,127,1) 0%,rgba(176,18,159,1) 100%)",
        "&:hover": {
          backgroundColor: "transparent",
        },
        "&:active": {
          backgroundColor: "transparent",
        },
        "&:focus": {
          backgroundColor: "transparent",
        },
      }}
    >
      {buttonText}
    </Button>
  );
}
