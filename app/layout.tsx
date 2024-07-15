import type { Metadata } from "next";
import CssBaseline from "@mui/material/CssBaseline";
import AppAppBar from "./components/appBar";
import Footer from "./components/footer";
import theme from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

import "./globals.css";

export const metadata: Metadata = {
  title: "Dr. Health",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppAppBar />
            {children}
            <Footer />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
