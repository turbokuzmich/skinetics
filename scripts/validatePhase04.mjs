import assert from "node:assert/strict";

const baseUrl = process.env.SKINETICS_BASE_URL ?? "http://127.0.0.1:3000";

const routes = [
  "/",
  "/catalog",
  "/serum",
  "/cream",
  "/catalog/red_pepper",
  "/catalog/copper_tripeptide",
  "/catalog/climbazole",
  "/catalog/ultra-lift",
  "/catalog/renewal",
  "/about",
  "/contacts",
  "/ingredients",
];

const productRoutes = [
  { path: "/catalog/red_pepper", categoryPath: "/serum" },
  { path: "/catalog/copper_tripeptide", categoryPath: "/serum" },
  { path: "/catalog/climbazole", categoryPath: "/serum" },
  { path: "/catalog/ultra-lift", categoryPath: "/cream" },
  { path: "/catalog/renewal", categoryPath: "/cream" },
];

const gatedRoutes = ["/brands", "/concerns", "/expert"];

function countTags(html, tag) {
  return html.match(new RegExp(`<${tag}(?:\\s|>)`, "gi"))?.length ?? 0;
}

async function fetchRoute(path) {
  const response = await fetch(new URL(path, baseUrl), { redirect: "manual" });
  return { path, response, html: await response.text() };
}

const renderedRoutes = await Promise.all(routes.map(fetchRoute));

for (const { path, response, html } of renderedRoutes) {
  assert.equal(response.status, 200, `${path} should return 200`);
  assert.equal(countTags(html, "h1"), 1, `${path} should contain exactly one h1`);
  assert.equal(countTags(html, "main"), 1, `${path} should contain exactly one main`);
  assert.equal(countTags(html, "header"), 1, `${path} should contain exactly one header`);
  assert.equal(countTags(html, "footer"), 1, `${path} should contain exactly one footer`);
}

const htmlByPath = new Map(renderedRoutes.map(({ path, html }) => [path, html]));
const homepage = htmlByPath.get("/");
assert(homepage, "homepage HTML should be present");

for (const { path } of productRoutes) {
  assert(
    homepage.includes(`href="${path}"`),
    `homepage should link to ${path}`,
  );
}

assert(!/<video(?:\s|>)/i.test(homepage), "homepage should not render a video element");
assert(!homepage.includes("/video/"), "homepage should not reference /video/");
assert(!/carousel/i.test(homepage), "homepage should not reference carousel code");
assert(
  homepage.includes('<script id="analytics-queues">'),
  "analytics queues should be parser-executed from rendered HTML",
);
assert(homepage.includes("analytics-loaders"), "deferred analytics loaders should render");
assert(homepage.includes("window.gtag"), "Google Analytics queue should render");
assert(homepage.includes("window.ym"), "Yandex Metrica queue should render");
assert(homepage.includes("window._tmr"), "Mail.ru queue should render");

for (const { path, categoryPath } of productRoutes) {
  const html = htmlByPath.get(path);
  assert(html, `${path} HTML should be present`);
  assert(
    html.includes(`href="${categoryPath}"`),
    `${path} should link its canonical category breadcrumb`,
  );
  assert(
    /href="https:\/\/(?:www\.)?(?:wildberries|ozon)\.ru\//i.test(html),
    `${path} should contain an accepted marketplace link`,
  );
  assert(
    html.includes('"@type":"BreadcrumbList"'),
    `${path} should contain BreadcrumbList JSON-LD`,
  );
}

const ingredientsHtml = htmlByPath.get("/ingredients");
assert(ingredientsHtml, "/ingredients HTML should be present");
assert(
  /<meta[^>]+name="robots"[^>]+content="[^"]*noindex[^"]*follow[^"]*"/i.test(
    ingredientsHtml,
  ),
  "/ingredients should contain noindex, follow robots metadata",
);

const sitemapResponse = await fetch(new URL("/sitemap.xml", baseUrl));
assert.equal(sitemapResponse.status, 200, "/sitemap.xml should return 200");
const sitemap = await sitemapResponse.text();
assert(!sitemap.includes("/ingredients"), "/ingredients should be absent from sitemap");

for (const path of gatedRoutes) {
  const response = await fetch(new URL(path, baseUrl), { redirect: "manual" });
  assert.equal(response.status, 404, `${path} should return 404`);
}

console.log(
  `Phase 04 rendered-site validation passed for ${routes.length} published routes and ${gatedRoutes.length} gated routes.`,
);
