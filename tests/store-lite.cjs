// Run against the static server: node tests/store-lite.cjs
// Requires Playwright (dev only). STORE_TEST_URL and CHROMIUM_PATH are optional.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');

const BASE = process.env.STORE_TEST_URL || 'http://127.0.0.1:4173';
const ROOT = path.join(__dirname, '..');

// A solid-color PNG large enough to prove uploads are downscaled.
async function sampleImage(page) {
  const data = await page.evaluate(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200; canvas.height = 900;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#FFB900'; ctx.fillRect(0, 0, 1200, 900);
    ctx.fillStyle = '#fff'; ctx.fillRect(100, 100, 400, 300);
    return canvas.toDataURL('image/png').split(',')[1];
  });
  return Buffer.from(data, 'base64');
}

(async () => {
  const payload = ['index.html', 'style.css', 'script.js']
    .reduce((n, f) => n + fs.statSync(path.join(ROOT, f)).size, 0);
  assert.ok(payload < 240 * 1024, `core payload too large: ${payload} bytes`);
  const source = ['index.html', 'style.css', 'script.js'].map(f => fs.readFileSync(path.join(ROOT, f), 'utf8')).join('\n');
  assert.ok(!/ننجاوي|نينجا|NINJAWY(?!2026)/.test(source), 'visible legacy branding must be removed');
  for (const color of ['#101D45', '#FFB900', '#FFFFFF', '#F4F6FA', '#263653', '#16A36A']) {
    assert.ok(fs.readFileSync(path.join(ROOT, 'style.css'), 'utf8').includes(color), `missing brand color ${color}`);
  }
  for (const asset of ['laffa-logo.webp']) {
    assert.ok(fs.existsSync(path.join(ROOT, 'assets', asset)), `missing logo asset ${asset}`);
  }

  const browser = await chromium.launch({
    headless: true,
    executablePath: process.env.CHROMIUM_PATH || undefined,
    args: ['--no-sandbox', '--disable-dev-shm-usage']
  });
  try {
    for (const mobile of [false, true]) {
      const page = await browser.newPage({ viewport: mobile ? { width: 390, height: 844 } : { width: 1440, height: 1000 } });
      const errors = [], external = [];
      page.on('pageerror', e => errors.push(e.message));
      page.on('request', req => {
        const url = req.url();
        if (!url.startsWith(BASE) && !url.startsWith('data:') && !url.startsWith('blob:')) external.push(url);
      });
      await page.addInitScript(() => {
        localStorage.ninjawy_lang = 'ar';
        localStorage.ninjawy_theme = 'light';
        window.__rafCalls = 0;
        const raf = window.requestAnimationFrame;
        window.requestAnimationFrame = cb => { window.__rafCalls += 1; return raf(cb); };
      });
      await page.goto(BASE, { waitUntil: 'networkidle' });
      await page.waitForSelector('[data-add]');
      assert.equal(await page.locator('.product-card').count(), 9);
      assert.equal(await page.locator('canvas, .page-loader, .cursor-dot, .cursor-ring, .bg-stack, .cart-flight').count(), 0);
      assert.equal(await page.locator('.hero-visual').count(), 1);
      assert.equal(await page.locator('.hero-visual').getAttribute('aria-hidden'), 'true');
      assert.equal(await page.locator('.brand-mark img').getAttribute('src'), 'assets/laffa-logo.webp');
      assert.equal(await page.locator('#whyTitle').textContent(), 'لماذا لفة؟');
      assert.equal(await page.locator('.product-stock').count(), 9);
      assert.equal(await page.locator('.product-badge').first().textContent(), 'أصلي');
      assert.equal(await page.locator('.footer-logo').getAttribute('src'), 'assets/laffa-logo.webp');
      const brandStyles = await page.evaluate(() => {
        const css = el => getComputedStyle(el);
        return {
          body: css(document.body).backgroundColor,
          nav: css(document.querySelector('.navbar')).backgroundColor,
          why: css(document.querySelector('.trust-strip')).backgroundColor,
          cta: css(document.querySelector('.hero-buttons .primary-btn')).backgroundColor,
          ctaText: css(document.querySelector('.hero-buttons .primary-btn')).color,
          cart: css(document.querySelector('.add-btn')).backgroundColor
        };
      });
      assert.deepEqual(brandStyles, { body: 'rgb(255, 255, 255)', nav: 'rgb(16, 29, 69)', why: 'rgb(38, 54, 83)', cta: 'rgb(255, 185, 0)', ctaText: 'rgb(16, 29, 69)', cart: 'rgb(255, 185, 0)' });
      assert.equal(await page.locator('html').getAttribute('dir'), 'rtl');
      assert.equal(await page.locator('#cartPanel').isHidden(), true);
      await page.waitForTimeout(350);
      assert.equal(await page.evaluate(() => window.__rafCalls), 0, 'no animation frame loop should run');
      assert.deepEqual(external, [], 'store must not request external fonts or libraries');

      // Responsive layout has no horizontal overflow.
      for (const width of [320, 390, 768, 1440]) {
        await page.setViewportSize({ width, height: 900 });
        const size = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, inner: innerWidth }));
        assert.ok(size.scroll <= size.inner + 1, `horizontal overflow at ${width}px: ${size.scroll}`);
      }
      await page.setViewportSize(mobile ? { width: 390, height: 844 } : { width: 1440, height: 1000 });

      // Cart updates are immediate, exact, and stored compactly.
      const add = page.locator('[data-add]').first();
      await add.scrollIntoViewIfNeeded();
      await add.evaluate(node => { for (let i = 0; i < 8; i++) node.click(); });
      assert.equal(await page.locator('#cartCount').textContent(), '8');
      assert.equal(await page.locator('.cart-flight').count(), 0);
      assert.equal(await page.evaluate(() => JSON.parse(localStorage.ninjawy_cart)[0].quantity), 8);
      assert.deepEqual(await page.evaluate(() => Object.keys(JSON.parse(localStorage.ninjawy_cart)[0]).sort()), ['id', 'quantity']);
      await page.waitForFunction(() => document.querySelector('[data-add] .btn-text').textContent === 'أضف للسلة');

      // Favorites update one button without rebuilding the grid.
      const fav = page.locator('[data-favorite]').first();
      await fav.click();
      assert.equal(await fav.getAttribute('aria-pressed'), 'true');
      await fav.click();
      assert.equal(await fav.getAttribute('aria-pressed'), 'false');

      // Category filter and search.
      await page.locator('[data-category="electronics"]').click();
      assert.equal(await page.locator('.product-card').count(), 2);
      await page.locator('#showAllBtn').click();
      assert.equal(await page.locator('.product-card').count(), 9);
      await page.locator('#searchBtn').click();
      await page.locator('#searchInput').fill('سماعات');
      await page.waitForSelector('.search-result[data-search-category]');
      assert.equal(await page.locator('.search-result[data-search-category]').count(), 1);
      await page.locator('.search-result[data-search-category]').first().click();
      assert.equal(await page.locator('.product-card').count(), 2);
      assert.equal(await page.locator('#searchModal').isHidden(), true);

      // Cart panel, quantity controls, validation and WhatsApp checkout.
      await page.locator('#cartBtn').click();
      assert.equal(await page.locator('#cartPanel').isVisible(), true);
      await page.locator('[data-increase]').first().click();
      assert.equal(await page.locator('#cartCount').textContent(), '9');
      await page.locator('[data-decrease]').first().click();
      assert.equal(await page.locator('#cartCount').textContent(), '8');
      await page.locator('#checkoutBtn').click();
      assert.equal(await page.locator('.toast-text').textContent(), 'من فضلك أكمل بيانات العميل.');
      await page.locator('#customerName').fill('عميل تجريبي');
      await page.locator('#customerPhone').fill('01000000000');
      await page.locator('#customerCity').fill('القاهرة');
      await page.locator('#customerAddress').fill('شارع الاختبار');
      await page.evaluate(() => { window.__waUrl = ''; window.open = url => { window.__waUrl = url; return {}; }; });
      await page.locator('#checkoutBtn').click();
      const waUrl = await page.evaluate(() => window.__waUrl);
      assert.ok(waUrl.startsWith('https://wa.me/201500721881?text='));
      const decodedWa = decodeURIComponent(waUrl);
      assert.ok(decodedWa.includes('عميل تجريبي'));
      assert.ok(decodedWa.includes('التفاصيل'));
      assert.ok(decodedWa.includes('الدفع عند الاستلام'));
      await page.locator('[data-remove]').first().click();
      assert.equal(await page.locator('#cartCount').textContent(), '0');
      await page.keyboard.press('Escape');
      assert.equal(await page.locator('#cartPanel').isHidden(), true);

      // Language and theme persist.
      await page.locator('.lang-opt[data-lang="en"]').click();
      assert.equal(await page.locator('html').getAttribute('dir'), 'ltr');
      assert.equal(await page.title(), 'LAFFA — Shop with confidence');
      assert.equal(await page.locator('.product-info h3').first().textContent(), 'Pro Wireless Headphones');
      await page.locator('#themeToggle').click();
      assert.equal(await page.locator('html').getAttribute('data-theme'), 'dark');
      assert.equal(await page.evaluate(() => localStorage.ninjawy_theme), 'dark');

      // Admin login, compressed image upload, add and delete.
      await page.locator('#showAllBtn').click();
      if (mobile) {
        await page.locator('#mobileMenuBtn').click();
        await page.locator('#adminOpenBtnMobile').click();
      } else {
        await page.locator('#adminOpenBtn').click();
      }
      await page.locator('#adminUsername').fill('wrong');
      await page.locator('#adminPassword').fill('wrong');
      await page.locator('#adminLoginForm button[type="submit"]').click();
      assert.equal(await page.locator('#loginError').textContent(), 'Incorrect username or password.');
      await page.locator('#adminUsername').fill('yaseen');
      await page.locator('#adminPassword').fill('NINJAWY2026');
      await page.locator('#adminLoginForm button[type="submit"]').click();
      assert.equal(await page.locator('#adminPanel').isVisible(), true);
      await page.locator('#productNameAr').fill('منتج اختبار');
      assert.equal(await page.locator('#productNameEn').inputValue(), 'Test Product');
      await page.locator('#productDescriptionAr').fill('سماعات لاسلكية مع صوت نقي وبطارية قوية');
      const autoDescEn = await page.locator('#productDescriptionEn').inputValue();
      assert.ok(autoDescEn.toLowerCase().includes('wireless') && autoDescEn.toLowerCase().includes('battery'), `expected auto-translated description, got: ${autoDescEn}`);
      await page.locator('#productPrice').fill('250');
      await page.locator('#productCategory').selectOption('electronics');
      await page.locator('#productImage').setInputFiles({ name: 'test.png', mimeType: 'image/png', buffer: await sampleImage(page) });
      await page.waitForSelector('#imagePreview img');
      await page.locator('#addProductForm button[type="submit"]').click();
      assert.equal(await page.locator('.product-card').count(), 10);
      assert.equal(await page.locator('.product-badge.is-new').count(), 1);
      const imageInfo = await page.evaluate(() => new Promise(resolve => {
        const stored = JSON.parse(localStorage.ninjawy_products)[0].image;
        const img = new Image();
        img.onload = () => resolve({ type: stored.slice(0, 30), w: img.naturalWidth, h: img.naturalHeight, bytes: stored.length });
        img.src = stored;
      }));
      assert.ok(/^data:image\/(webp|jpeg)/.test(imageInfo.type));
      assert.ok(imageInfo.w <= 640 && imageInfo.h <= 640);
      assert.ok(imageInfo.bytes < 200000);

      // Edit product details & image preservation, then save changes.
      await page.locator('[data-edit-product]').first().click();
      assert.equal(await page.locator('#editExtraActions').isHidden(), false);
      assert.equal(await page.locator('#imagePreview img').count(), 1);
      await page.locator('#productNameAr').fill('سماعة بلوتوث ذكية');
      assert.equal(await page.locator('#productNameEn').inputValue(), 'Bluetooth Headset Smart');
      await page.locator('#productPrice').fill('350');
      await page.locator('#addProductForm button[type="submit"]').click();
      assert.equal(await page.locator('.product-card').count(), 10);
      assert.equal(await page.locator('.product-info h3').first().textContent(), 'Bluetooth Headset Smart');
      assert.equal(await page.evaluate(() => JSON.parse(localStorage.ninjawy_products)[0].price), 350);
      assert.ok(await page.evaluate(() => JSON.parse(localStorage.ninjawy_products)[0].image.startsWith('data:image/')));

      // Duplicate product with all details.
      await page.locator('[data-duplicate-product]').first().click();
      assert.equal(await page.locator('.product-card').count(), 11);
      page.once('dialog', dialog => dialog.accept());
      await page.locator('[data-delete-product]').first().click();
      assert.equal(await page.locator('.product-card').count(), 10);
      page.once('dialog', dialog => dialog.accept());
      await page.locator('[data-delete-product]').first().click();
      assert.equal(await page.locator('.product-card').count(), 9);
      await page.locator('#logoutAdminBtn').click();
      // Custom request page: specs form, summary, WhatsApp request, saved requests.
      await page.locator('.lang-opt[data-lang="ar"]').click();
      await page.locator('.request-cta a[href="#request"]').click();
      assert.equal(await page.locator('#request').isVisible(), true);
      assert.equal(await page.locator('#requestSummaryList li').count(), 0);
      await page.fill('#rqName', 'سماعات بلوتوث');
      await page.fill('#rqSpecs', 'عزل ضوضاء وبطارية 20 ساعة');
      await page.selectOption('#rqCategory', 'electronics');
      assert.ok(await page.locator('#requestSummaryList li').count() >= 3);
      await page.locator('#requestSubmitBtn').click();
      assert.ok((await page.locator('.toast-text').textContent()).includes('أكمل'));
      await page.fill('#rqContactName', 'عميل طلب');
      await page.fill('#rqPhone', '01000000000');
      await page.fill('#rqCity', 'الجيزة');
      const [requestWa] = await Promise.all([
        page.waitForEvent('popup'),
        page.locator('#requestSubmitBtn').click()
      ]);
      const requestUrl = decodeURIComponent(requestWa.url().split('text=')[1] || '');
      assert.ok(requestWa.url().startsWith('https://wa.me/201500721881?text='));
      assert.ok(requestUrl.includes('سماعات بلوتوث') && requestUrl.includes('عزل ضوضاء'));
      assert.ok(requestUrl.includes('عميل طلب') && requestUrl.includes('الدفع عند الاستلام'));
      await requestWa.close();
      await page.locator('#requestSaveBtn').click();
      assert.equal(await page.locator('.request-saved-item').count(), 1);
      assert.equal(JSON.parse(await page.evaluate(() => localStorage.ninjawy_requests))[0].name, 'سماعات بلوتوث');
      await page.locator('#requestResetBtn').click();
      assert.equal(await page.locator('#rqName').inputValue(), '');
      await page.locator('[data-fill-request]').first().click();
      assert.equal(await page.locator('#rqName').inputValue(), 'سماعات بلوتوث');
      page.once('dialog', dialog => dialog.accept());
      await page.locator('[data-delete-request]').first().click();
      assert.equal(await page.locator('.request-saved-item').count(), 0);
      assert.equal(await page.locator('#requestSavedWrap').isHidden(), true);

      assert.equal(await page.locator('#adminPanel').isHidden(), true);

      // Minute countdown is initialized and has no seconds box.
      assert.equal(await page.locator('#cdSeconds').count(), 0);
      assert.notEqual(await page.locator('#cdDays').textContent(), '00');
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await add.click();
      assert.equal(await page.locator('.cart-flight').count(), 0);
      assert.equal(await page.locator('#cartCount').textContent(), '1');
      assert.deepEqual(errors, []);
      console.log(`PASS ${mobile ? 'mobile' : 'desktop'}: no effects/external requests, responsive, cart, search, checkout, i18n, theme, admin, image compression, custom request page, reduced motion`);
      await page.close();
    }

    // Legacy localStorage data migrates without breaking.
    const legacy = await browser.newPage();
    await legacy.addInitScript(() => {
      localStorage.ninjawy_lang = 'ar';
      localStorage.ninjawy_products = JSON.stringify([{ id: 5, category: 'إلكترونيات', icon: '🎧', price: 100, name: 'قديم', description: 'وصف' }]);
      localStorage.ninjawy_cart = JSON.stringify([{ id: 5, quantity: 2 }, { id: 5, quantity: 3 }]);
    });
    await legacy.goto(BASE, { waitUntil: 'domcontentloaded' });
    await legacy.waitForSelector('[data-add]');
    assert.equal(await legacy.locator('.product-card').count(), 1);
    assert.equal(await legacy.locator('#cartCount').textContent(), '5');
    assert.equal(await legacy.locator('.product-category').first().textContent(), 'إلكترونيات');
    await legacy.close();

    // Private mode / blocked storage must not crash the store.
    const blocked = await browser.newPage();
    const blockedErrors = [];
    blocked.on('pageerror', e => blockedErrors.push(e.message));
    await blocked.addInitScript(() => {
      Object.defineProperty(window, 'localStorage', { get() { throw new Error('blocked'); } });
    });
    await blocked.goto(BASE, { waitUntil: 'domcontentloaded' });
    await blocked.waitForSelector('[data-add]');
    await blocked.locator('[data-add]').first().click();
    assert.equal(await blocked.locator('#cartCount').textContent(), '1');
    await blocked.locator('#themeToggle').click();
    await blocked.locator('.lang-opt[data-lang="en"]').click();
    assert.deepEqual(blockedErrors, []);
    await blocked.close();
    console.log(`PASS: legacy migration, blocked storage, core payload ${Math.round(payload / 1024)} KB`);
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
