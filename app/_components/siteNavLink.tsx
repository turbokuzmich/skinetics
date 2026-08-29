"use client";

import Link from "@mui/material/Link";
import NextLink from "next/link";
import { useSyncExternalStore } from "react";
import { skinColors } from "@/app/designTokens";

type Props = Readonly<{
  href: string;
  children: React.ReactNode;
}>;

const subscribe = () => () => undefined;
const getServerPath = () => "/";
const getClientPath = () => window.location.pathname;

export default function SiteNavLink({ href, children }: Props) {
  const pathname = useSyncExternalStore(
    subscribe,
    getClientPath,
    getServerPath,
  );
  const active = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      aria-current={active ? "page" : undefined}
      component={NextLink}
      href={href}
      underline="none"
      sx={{
        alignItems: "center",
        color: active ? skinColors.brandBlue : "text.primary",
        display: "inline-flex",
        minHeight: 44,
        px: 3,
        position: "relative",
        transition: "color 180ms ease",
        "&:hover": { color: skinColors.brandBlue },
        "&::after": {
          backgroundColor: skinColors.brandBlue,
          bottom: 4,
          content: '""',
          height: "1px",
          left: 24,
          opacity: active ? 1 : 0,
          position: "absolute",
          transform: active ? "scaleX(1)" : "scaleX(0.3)",
          transformOrigin: "left",
          transition: "opacity 180ms ease, transform 180ms ease",
          width: "calc(100% - 48px)",
        },
        "&:hover::after": { opacity: 1, transform: "scaleX(1)" },
      }}
    >
      {children}
    </Link>
  );
}
