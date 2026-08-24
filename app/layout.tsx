import type { Metadata } from "next";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import { literata, manrope } from "./fonts";
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
      <Script id="yandex-metrica">
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
      <Script id="mailru-counter">
        {`var _tmr = window._tmr || (window._tmr = []);
_tmr.push({id: "3589962", type: "pageView", start: (new Date()).getTime()});
(function (d, w, id) {
  if (d.getElementById(id)) return;
  var ts = d.createElement("script"); ts.type = "text/javascript"; ts.async = true; ts.id = id;
  ts.src = "https://top-fwz1.mail.ru/js/code.js";
  var f = function () {var s = d.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ts, s);};
  if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); }
})(document, window, "tmr-code");`}
      </Script>
      <body className={`${manrope.variable} ${literata.variable}`}>
        <GoogleAnalytics gaId="G-6JC9JR7TQ0" />
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
