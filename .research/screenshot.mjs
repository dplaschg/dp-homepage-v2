import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const URL = process.argv[2] || 'https://joost.design/';
const OUT = process.argv[3] || './shots';

await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
];

for (const vp of viewports) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();
  try {
    await page.goto(URL, { waitUntil: 'networkidle', timeout: 45000 });
  } catch (e) {
    console.error(`[${vp.name}] navigation issue:`, e.message);
  }
  await page.waitForTimeout(2000);

  // Above-the-fold
  await page.screenshot({
    path: path.join(OUT, `${vp.name}-hero.png`),
    fullPage: false,
  });

  // Full page
  await page.screenshot({
    path: path.join(OUT, `${vp.name}-full.png`),
    fullPage: true,
  });

  // Mid-scroll snapshot
  await page.evaluate(() => window.scrollTo(0, window.innerHeight * 1.5));
  await page.waitForTimeout(800);
  await page.screenshot({
    path: path.join(OUT, `${vp.name}-mid.png`),
    fullPage: false,
  });

  await ctx.close();
  console.log(`[${vp.name}] done`);
}

await browser.close();
console.log('All screenshots saved to', OUT);
