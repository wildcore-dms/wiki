/*
 * Mobile screenshot generator for the WildcoreDMS wiki.
 *
 * Drives the web panel in a mobile-emulated Chrome (via Playwright) and captures the
 * screenshots used by the docs (bottom navigation, "objects nearby"). See
 * AGENTS.md → "Скриншоты для документации" for the full workflow and rationale.
 *
 * Run:
 *   WC_BASE=https://demo.wildcore.tools WC_USER=admin WC_PASS=admin \
 *   OUT=/tmp/wcshots node tools/screenshots/mobile-shots.js
 *
 * Requirements: Google Chrome + Playwright (playwright-core). If the global
 * @playwright/mcp package is present its bundled playwright-core is reused.
 */
const path = require('path');
function loadChromium() {
  for (const p of ['playwright', 'playwright-core',
    path.join(process.env.HOME || '', '.nvm/versions/node', process.version, 'lib/node_modules/@playwright/mcp/node_modules/playwright-core')]) {
    try { return require(p).chromium; } catch (e) { /* try next */ }
  }
  throw new Error('playwright-core not found — npm i -g playwright, or install @playwright/mcp');
}
const chromium = loadChromium();
const fs = require('fs');

const BASE = process.env.WC_BASE || 'https://demo.wildcore.tools';
const USER = process.env.WC_USER || 'admin';
const PASS = process.env.WC_PASS || 'admin';
const OUT = process.env.OUT || '/tmp/wcshots';
const CHROME = process.env.CHROME_PATH || '/usr/bin/google-chrome';
fs.mkdirSync(OUT, { recursive: true });

const NAV_ITEMS = [
  { key: 'page:/', enabled: true },
  { key: 'page:/devices/list', enabled: true },
  { key: 'search', enabled: true },
  { key: 'nearby', enabled: true },
];
const log = (...a) => console.log('[shoot]', ...a);
const shot = async (t, file, opts = {}) => {
  try { await t.screenshot({ path: `${OUT}/${file}`, ...opts }); log('OK  ->', file); }
  catch (e) { log('FAIL', file, e.message); }
};

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] });
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
    locale: 'uk-UA', permissions: ['geolocation'],
    geolocation: { latitude: 50.4501, longitude: 30.5234 }, ignoreHTTPSErrors: true,
  });
  const page = await ctx.newPage();

  // ---- login ----
  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('input[type=password]', { timeout: 20000 });
  await page.fill('input[type=text]', USER);
  await page.fill('input[type=password]', PASS);
  await page.click('button[type=submit]');
  await page.waitForTimeout(4000);
  const key = await page.evaluate(() => { try { return JSON.parse(localStorage.getItem('auth'))?.key || null; } catch (e) { return null; } });
  log('logged in, auth key present:', !!key);
  if (!key) { log('LOGIN FAILED'); await browser.close(); process.exit(1); }

  // ---- position the nearby search over a coordinate that actually has objects ----
  try {
    const res = await page.evaluate(async (k) => {
      let j = null;
      for (const url of ['/api/v1/maps/groups', '/api/maps/groups']) {
        try { const r = await fetch(url, { headers: { 'X-Auth-Key': k } }); const t = await r.text();
          if (r.ok && (t.trim().startsWith('{') || t.trim().startsWith('['))) { j = JSON.parse(t); break; } } catch (e) {}
      }
      if (!j) return { err: 'no json endpoint' };
      const pts = [];
      const walk = (o) => { if (!o || typeof o !== 'object') return;
        const lat = o.lat ?? o.latitude ?? o.coordinates?.lat, lon = o.lon ?? o.lng ?? o.longitude ?? o.coordinates?.lon;
        if (lat != null && lon != null && isFinite(+lat) && isFinite(+lon)) pts.push([+lat, +lon]);
        for (const key in o) if (key !== 'coordinates') walk(o[key]); };
      walk(j);
      const cells = {}; for (const [a, b] of pts) { const ck = `${a.toFixed(2)},${b.toFixed(2)}`; (cells[ck] ||= []).push([a, b]); }
      let best = null, n = 0; for (const ck in cells) if (cells[ck].length > n) { n = cells[ck].length; best = cells[ck][0]; }
      return { count: pts.length, best };
    }, key);
    log('maps/groups ->', JSON.stringify(res).slice(0, 200));
    if (res.best) await ctx.setGeolocation({ latitude: res.best[0], longitude: res.best[1] });
  } catch (e) { log('coord lookup failed', e.message); }

  // ---- 1) bottom-nav settings card ----
  await page.goto(BASE + '/account/settings', { waitUntil: 'domcontentloaded' });
  try {
    await page.waitForSelector('.bottom-nav-settings-enabled', { timeout: 20000 });
    await page.waitForTimeout(700);
    const cb = page.locator('.bottom-nav-settings-enabled input[type=checkbox]').first();
    if (!(await cb.isChecked())) { await page.locator('.bottom-nav-settings-enabled label.switch-small').first().click(); await page.waitForTimeout(400); }
    const card = page.locator('.bottom-nav-settings-enabled').locator('xpath=ancestor::*[contains(@class,"card")][1]');
    await card.scrollIntoViewIfNeeded(); await page.waitForTimeout(400);
    await shot(card, 'bottom-nav-settings.png');
  } catch (e) { log('settings step failed', e.message); await shot(page, 'bottom-nav-settings.png'); }

  // ---- 2) rendered bottom nav bar ----
  // The demo backend does not persist bottom_nav settings, so flip it directly in the live
  // Vue state ($auth singleton exposed via app.config.globalProperties) and fire the app's own
  // update event — this renders the REAL BottomNavBar component (no mock markup).
  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3500);
  try {
    await page.evaluate((NAV) => {
      let app = null; for (const el of document.querySelectorAll('*')) if (el.__vue_app__) { app = el.__vue_app__; break; }
      const auth = app?.config?.globalProperties?.$auth; if (!auth) return;
      auth._auth.user.settings = auth._auth.user.settings || {};
      auth._auth.user.settings.global = auth._auth.user.settings.global || {};
      auth._auth.user.settings.global.bottom_nav_enabled = true;
      auth._auth.user.settings.global.bottom_nav_items = NAV;
      window.dispatchEvent(new CustomEvent('bottom-nav-settings-updated'));
    }, NAV_ITEMS);
    await page.waitForSelector('nav.bottom-nav', { timeout: 8000 });
    await page.waitForTimeout(800);
    await shot(page, 'bottom-nav-bar.png');
  } catch (e) { log('bottom nav bar not visible', e.message); await shot(page, 'bottom-nav-bar.png'); }

  // ---- 3) nearby page + results, 4) map modal ----
  await page.goto(BASE + '/nearby', { waitUntil: 'domcontentloaded' });
  try {
    await page.waitForSelector('.nearby-filters', { timeout: 20000 });
    await page.waitForTimeout(800);
    try { await page.locator('.nearby-field-distance select').selectOption('10000'); } catch (e) {}
    await page.locator('.nearby-location-button').click();
    await page.waitForTimeout(4500);
    await shot(page, 'nearby-page.png');
    await shot(page.locator('.nearby-location-button'), 'nearby-my-location.png');
    await shot(page.locator('.nearby-action-button').first(), 'nearby-choose-on-map.png');
    if (await page.locator('.nearby-results').count()) await shot(page.locator('.nearby-results'), 'nearby-results.png');
    const showOnMap = page.locator('button:has(.mdi-map-marker-multiple)').first();
    if (await showOnMap.count() && await showOnMap.isEnabled()) { await showOnMap.click(); await page.waitForTimeout(3500); await shot(page, 'nearby-map.png'); }
    else log('show-on-map disabled (no geo results)');
  } catch (e) { log('nearby step failed', e.message); await shot(page, 'nearby-page.png'); }

  await browser.close();
  log('DONE. files:', fs.readdirSync(OUT).filter(f => f.endsWith('.png')).join(', '));
})().catch(e => { console.error('FATAL', e); process.exit(1); });
