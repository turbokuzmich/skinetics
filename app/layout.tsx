import type { Metadata } from "next";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import Script from "next/script";
import { literata, manrope } from "./fonts";
import SiteFooter from "./_components/siteFooter";
import SiteHeader from "./_components/siteHeader";

import "./globals.css";

const analyticsQueues = `window.dataLayer=window.dataLayer||[];
window.gtag=window.gtag||function(){window.dataLayer.push(arguments)};
window.gtag("js",new Date());
window.gtag("config","G-6JC9JR7TQ0");
window.ym=window.ym||function(){(window.ym.a=window.ym.a||[]).push(arguments)};
window.ym.l=1*new Date();
window.ym(98874723,"init",{defer:true,clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});
window._tmr=window._tmr||[];
window._tmr.push({id:"3589962",type:"pageView",start:(new Date()).getTime()});`;

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
      </head>
      <Script id="analytics-loaders" strategy="lazyOnload">
        {`window.setTimeout(function(){
var sources=[
  ["google-analytics","https://www.googletagmanager.com/gtag/js?id=G-6JC9JR7TQ0"],
  ["yandex-metrica","https://mc.yandex.ru/metrika/tag.js"],
  ["tmr-code","https://top-fwz1.mail.ru/js/code.js"]
];
sources.forEach(function(source){
  if(document.getElementById(source[0]))return;
  var script=document.createElement("script");
  script.async=true;
  script.id=source[0];
  script.src=source[1];
  document.head.appendChild(script);
});
},5000);`}
      </Script>
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
