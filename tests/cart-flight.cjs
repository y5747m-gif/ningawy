// Run against the static server: node tests/cart-flight.cjs
// Requires Playwright; CART_TEST_URL and CHROMIUM_PATH are optional overrides.
const assert = require('node:assert/strict');
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: process.env.CHROMIUM_PATH || undefined,
    args: ['--no-sandbox', '--disable-dev-shm-usage']
  });
  try {
    for (const mobile of [false, true]) {
      const page = await browser.newPage({ viewport: mobile ? { width: 390, height: 844 } : { width: 1440, height: 1000 } });
      await page.addInitScript(() => { if (!localStorage.ninjawy_lang) localStorage.ninjawy_lang = 'ar'; });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(process.env.CART_TEST_URL || 'http://127.0.0.1:4173', { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('[data-add]');
      await page.locator('#pageLoader').waitFor({ state: 'hidden' });
      const button = page.locator('[data-add]').first();
      await button.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
      await button.click();
      assert.equal(await page.locator('#cartCount').textContent(), '1');
      assert.equal(await page.locator('.cart-flight').count(), 1);
      assert.equal(await page.locator('.cart-flight').getAttribute('aria-hidden'), 'true');
      assert.equal(await page.locator('.cart-flight .ic').count(), 1);
      // Freeze the center hold, then check the second stage's actual endpoint.
      const geometry = await page.locator('.cart-flight').evaluate(node => {
        const animation = node.getAnimations()[0];
        animation.pause();
        animation.currentTime = 760;
        const rect = node.getBoundingClientRect();
        return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2, width: innerWidth, height: innerHeight };
      });
      assert.ok(Math.abs(geometry.x - geometry.width / 2) < 1);
      assert.ok(Math.abs(geometry.y - geometry.height / 2) < 1);
      await page.locator('.cart-flight').evaluate(node => node.getAnimations()[0].finish());
      await page.waitForTimeout(30);
      const destination = await page.locator('.cart-flight').evaluate(node => {
        const animation = node.getAnimations()[0];
        animation.pause();
        animation.currentTime = 560;
        const r = node.getBoundingClientRect(), c = document.querySelector('#cartBtn').getBoundingClientRect();
        return { x: r.x + r.width / 2, y: r.y + r.height / 2, cx: c.x + c.width / 2, cy: c.y + c.height / 2 };
      });
      assert.ok(Math.abs(destination.x - destination.cx) < 2);
      assert.ok(Math.abs(destination.y - destination.cy) < 2);
      await page.locator('.cart-flight').evaluate(node => node.getAnimations()[0].finish());
      await page.waitForTimeout(50);
      assert.equal(await page.locator('.cart-flight').count(), 0);

      // Fast repeated additions remain exact, bounded, and clean up their labels.
      await button.evaluate(node => { for (let i = 0; i < 8; i++) node.click(); });
      assert.equal(await page.locator('#cartCount').textContent(), '9');
      assert.ok(await page.locator('.cart-flight').count() <= 4);
      await page.waitForFunction(() => !document.querySelector('.cart-flight'), null, { timeout: 10000 });
      await page.waitForFunction(() => !document.querySelector('.cart-flight'), null, { timeout: 10000 });
      assert.equal(await page.locator('.cart-flight').count(), 0);
      assert.equal(await button.locator('.btn-text').textContent(), 'أضف للسلة');
      assert.equal(await page.evaluate(() => JSON.parse(localStorage.ninjawy_cart)[0].quantity), 9);

      await button.click();
      await page.setViewportSize({ width: mobile ? 400 : 1400, height: 900 });
      await page.waitForFunction(() => !document.querySelector('.cart-flight'), null, { timeout: 10000 });
      assert.equal(await page.locator('.cart-flight').count(), 0);
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await button.click();
      assert.equal(await page.locator('.cart-flight').count(), 0);
      assert.equal(await page.locator('#cartCount').textContent(), '11');
      await page.emulateMedia({ reducedMotion: 'no-preference' });

      // Real images, LTR and light theme use the same flight.
      await page.evaluate(() => {
        localStorage.ninjawy_lang = 'en';
        localStorage.ninjawy_theme = 'light';
        localStorage.ninjawy_products = JSON.stringify([{ id: 99, price: 100, image: '/assets/ninja-hero.webp', ar: { name: 'منتج' }, en: { name: 'Product' } }]);
      });
      await page.reload({ waitUntil: 'domcontentloaded' });
      await page.locator('#pageLoader').waitFor({ state: 'hidden' });
      await page.locator('[data-add]').first().click();
      assert.equal(await page.locator('.cart-flight img').count(), 1);
      await page.waitForFunction(() => !document.querySelector('.cart-flight'), null, { timeout: 10000 });
      assert.equal(await page.locator('.cart-flight').count(), 0);
      assert.equal(await page.locator('html').getAttribute('dir'), 'ltr');
      assert.deepEqual(errors, []);
      console.log(`PASS: ${mobile ? 'mobile' : 'desktop'}: center, cart endpoint, rapid clicks, cleanup, resize, reduced motion, image, RTL/LTR`);
      await page.close();
    }
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
