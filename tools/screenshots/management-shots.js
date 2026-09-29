/*
 * Desktop screenshot generator for the "Management" docs (devices, accesses, groups,
 * models, users, roles). Uses the demo stand only — see AGENTS.md → "Скриншоты".
 *
 * Run:
 *   WC_BASE=https://demo.wildcore.tools WC_USER=admin WC_PASS=admin LANGS=ua,en \
 *   OUT=/tmp/wcshots node tools/screenshots/management-shots.js
 * Files: $OUT/<lang>/<name>.png
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
const LANGS = (process.env.LANGS || 'ua,en').split(',');
const log = (...a) => console.log('[shoot]', ...a);

async function api(page, url) {
  return page.evaluate(async (u) => {
    const a = JSON.parse(localStorage.getItem('auth') || '{}');
    const r = await fetch('/api/v1' + u, { headers: { 'X-Auth-Key': a.key } });
    return r.json();
  }, url);
}

async function open(page, url) {
  await page.goto(BASE + url, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(4000);
}

async function shot(target, file, opts = {}) {
  try { await target.screenshot({ path: file, ...opts }); log('OK  ->', file); }
  catch (e) { log('FAIL', file, e.message.split('\n')[0]); }
}

async function newSession(browser, lang) {
  // Service worker is blocked so the language can be forced in API responses
  // (the demo user's own language is not changed).
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1,
    ignoreHTTPSErrors: true, serviceWorkers: 'block' });
  await ctx.route('**/api/v1/**', async (route) => {
    let resp;
    try { resp = await route.fetch(); } catch (e) { return route.abort(); }
    const ct = resp.headers()['content-type'] || '';
    if (!ct.includes('json')) return route.fulfill({ response: resp });
    let body = await resp.text();
    try {
      const j = JSON.parse(body);
      if (j?.data?.user?.language) j.data.user.language = lang;
      if (j?.data?.locales?.default) j.data.locales.default = lang;
      if (j?.data?.language && j?.data?.login) j.data.language = lang;
      body = JSON.stringify(j);
    } catch (e) { /* keep as is */ }
    return route.fulfill({ response: resp, body });
  });
  const page = await ctx.newPage();
  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('input[type=password]', { timeout: 20000 });
  await page.fill('input[type=text]', USER);
  await page.fill('input[type=password]', PASS);
  await page.click('button[type=submit]');
  await page.waitForTimeout(4000);
  return { ctx, page };
}

(async () => {
  const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] });
  for (const lang of LANGS) {
    const { ctx, page } = await newSession(browser, lang);
    await shootAll(page, lang);
    await ctx.close();
  }
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });

async function shootAll(page, lang) {
  const ONLY = process.env.ONLY;
  const unwrap = (r) => (r && (r.data ?? r)) || [];
  const devices = unwrap(await api(page, '/device'));
  const roles = unwrap(await api(page, '/user-role'));
  const users = unwrap(await api(page, '/user'));
  const models = unwrap(await api(page, '/device-model'));
  const dev = Array.isArray(devices) ? devices.find(d => /olt|bdcom/i.test(d.name || '')) || devices[0] : null;
  const role = Array.isArray(roles) ? roles.find(r => r.id > 0 && !/owner/i.test(r.name)) || roles[0] : null;
  const user = Array.isArray(users) ? users.find(u => u.login !== 'admin') || users[0] : null;
  const model = Array.isArray(models) ? (dev && models.find(m => m.id === (dev.model?.id ?? dev.model_id))) || models[0] : null;
  log(lang, 'ids', { dev: dev?.id, role: role?.id, user: user?.id, model: model?.id });

  const dir = `${OUT}/${lang}`;
  fs.mkdirSync(dir, { recursive: true });

  if (ONLY === 'access') { await accessModal(page, dir); return; }
  await open(page, '/management/device');
  await shot(page, `${dir}/device-list.png`);
  if (dev) {
    await open(page, `/management/device/${dev.id}`);
    await shot(page, `${dir}/device-edit.png`, { fullPage: true });
  }
  await accessModal(page, dir);
  await open(page, '/management/device-group');
  await shot(page, `${dir}/group-list.png`);
  await open(page, '/management/device-model');
  await shot(page, `${dir}/model-list.png`);
  if (model) {
    await open(page, `/management/device-model/${model.id}`);
    await shot(page, `${dir}/model-edit.png`, { fullPage: true });
  }
  await open(page, '/management/user');
  await shot(page, `${dir}/user-list.png`);
  if (user) {
    await open(page, `/management/user/${user.id}`);
    await shot(page, `${dir}/user-edit.png`, { fullPage: true });
  }
  await open(page, '/management/user-role');
  await shot(page, `${dir}/role-list.png`);
  if (role) {
    await open(page, `/management/user-role/${role.id}`);
    await shot(page, `${dir}/role-edit.png`, { fullPage: true });
  }
}

async function accessModal(page, dir) {
  await open(page, '/management/device-access');
  await shot(page, `${dir}/access-list.png`);
  try {
    await page.locator('tbody tr').first().locator('.btn').first().click();
    await page.waitForTimeout(1000);
    const toggle = page.locator('.wc-management-access-connection-toggle');
    if (await toggle.count()) { await toggle.first().click(); await page.waitForTimeout(500); }
    await shot(page, `${dir}/access-edit.png`);
    await page.keyboard.press('Escape');
  } catch (e) { log('access modal', e.message.split('\n')[0]); }
}
