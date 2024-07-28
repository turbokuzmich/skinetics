import type { Metadata } from "next";
import CssBaseline from "@mui/material/CssBaseline";
import AppAppBar from "./components/appBar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Footer from "./components/foot";
import Divider from "@mui/material/Divider";
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
