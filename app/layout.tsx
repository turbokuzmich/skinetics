import type { Metadata } from "next";
import CssBaseline from "@mui/material/CssBaseline";
import AppAppBar from "./_components/appBar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Footer from "./_components/foot";
import Divider from "@mui/material/Divider";
import theme from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";

import "./globals.css";

export const metadata: Metadata = {
  title: "Dr. Health",
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
    <html lang="en">
      <Script>
        {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
  m[i].l=1*new Date();
  for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
  (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

  ym(98874723, "init", {
    defer:true,
    clickmap:true,
    trackLinks:true,
    accurateTrackBounce:true,
    webvisor:true
  });`}
      </Script>
      <body>
        <GoogleAnalytics gaId="G-6JC9JR7TQ0" />
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppAppBar />
            <Stack
              sx={{
                minHeight: "100vh",
              }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                  flexShrink: 1,
                }}
              >
                {children}
              </Box>
              <Divider />
              <Footer />
            </Stack>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
