import type { Metadata } from "next";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { literata, manrope } from "./fonts";
import { analyticsLoaders, analyticsQueues } from "@/lib/analyticsBootstrap";
import SiteFooter from "./_components/siteFooter";
import SiteHeader from "./_components/siteHeader";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://skinetics.ru"),
  title: "Skinetics",
  other: {
    "google-site-verification": "0RAz7vJ8nacRfJbT0QEZrDjYD1lKQnKbG69AQCJChQw",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <script
          id="analytics-queues"
          dangerouslySetInnerHTML={{ __html: analyticsQueues }}
        />
        <script
          id="analytics-loaders"
          dangerouslySetInnerHTML={{ __html: analyticsLoaders }}
        />
      </head>
      <body className={`${manrope.variable} ${literata.variable}`}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <a className="skip-link" href="#main-content">
              Перейти к содержанию
            </a>
            <SiteHeader />
            <main id="main-content">{children}</main>
            <SiteFooter />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
