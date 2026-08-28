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
  { path: "/catalog/red_pepper", categoryPath: "/serum", categoryName: "Сыворотки" },
  { path: "/catalog/copper_tripeptide", categoryPath: "/serum", categoryName: "Сыворотки" },
  { path: "/catalog/climbazole", categoryPath: "/serum", categoryName: "Сыворотки" },
  { path: "/catalog/ultra-lift", categoryPath: "/cream", categoryName: "Кремы" },
  { path: "/catalog/renewal", categoryPath: "/cream", categoryName: "Кремы" },
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
assert(
  homepage.includes('<script id="analytics-queues">'),
  "analytics queues should be parser-executed from rendered HTML",
);
assert(
  homepage.includes('<script id="analytics-loaders">'),
  "interaction analytics listeners should be parser-executed from rendered HTML",
);
assert(homepage.includes("window.gtag"), "Google Analytics queue should render");
assert(homepage.includes("window.ym"), "Yandex Metrica queue should render");
assert(homepage.includes("window._tmr"), "Mail.ru queue should render");
const analyticsQueueHtml = homepage.match(
  /<script id="analytics-queues">([\s\S]*?)<\/script>/i,
)?.[1];
assert(analyticsQueueHtml, "analytics queue script should be readable");
assert(
  !analyticsQueueHtml.includes('type:"pageView"'),
  "the route tracker should exclusively own Mail.ru pageviews",
);
assert(
  homepage.includes("pointerdown") &&
    homepage.includes("keydown") &&
    homepage.includes("loadAnalytics"),
  "analytics adapters should load on the first pointer or keyboard interaction",
);

for (const { path, categoryPath, categoryName } of productRoutes) {
  const html = htmlByPath.get(path);
  assert(html, `${path} HTML should be present`);
  const breadcrumbHtml = html.match(
    /<nav[^>]+aria-label="Хлебные крошки"[^>]*>([\s\S]*?)<\/nav>/i,
  )?.[1];
  assert(breadcrumbHtml, `${path} should contain visible breadcrumbs`);
  assert(
    breadcrumbHtml.includes(`href="${categoryPath}"`) &&
      breadcrumbHtml.includes(categoryName),
    `${path} should show its canonical category inside visible breadcrumbs`,
  );
  assert(
    /href="https:\/\/(?:www\.)?(?:wildberries|ozon)\.ru\//i.test(html),
    `${path} should contain an accepted marketplace link`,
  );
  const breadcrumbJsonLd = [...html.matchAll(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi,
  )]
    .map((match) => JSON.parse(match[1]))
    .find((entry) => entry["@type"] === "BreadcrumbList");
  assert(breadcrumbJsonLd, `${path} should contain BreadcrumbList JSON-LD`);
  assert.deepEqual(
    breadcrumbJsonLd.itemListElement.map(({ item }) => item),
    [
      "https://skinetics.ru/",
      `https://skinetics.ru${categoryPath}`,
      `https://skinetics.ru${path}`,
    ],
    `${path} should expose the exact canonical BreadcrumbList sequence`,
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
  `Phase 04 rendered-site validation passed for ${routes.length} current routes and ${gatedRoutes.length} gated routes.`,
);
