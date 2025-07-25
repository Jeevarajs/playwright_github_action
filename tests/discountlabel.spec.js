// @ts-check
import { test, expect } from '@playwright/test';
import path from 'path';

test('Discountlabel SiteMonitoring orderFlow', async ({ page }) => { 
  await page.goto('https://www.discountlabels.com/User/Login/');
  await page.locator("#username").fill("test182@mailinatro.com",{timeout: 10000});
  await page.locator("#password").fill("Test@123",{timeout: 10000});
  await page.locator("[class*='new-login-btn']").click();
  await page.waitForLoadState('networkidle');
  await page.waitForURL('https://www.discountlabels.com/dashboard/');
  await page.locator(".menu__level0[href*='/products']").click({timeout: 20000});
  await page.locator("a[href*='/quick-ship-labels'] .product-categories__button").click({timeout: 20000});
  await page.waitForURL(/products\/quick-ship-labels/,{timeout: 10000});
  await page.waitForSelector("a[href*='/quick-ship-labels/anyshape'] .link");
  await page.locator("a[href*='/quick-ship-labels/anyshape'] .link").click({timeout: 10000});
  await page.waitForURL("**/quick-ship-labels/anyshape-labels/**", {timeout: 15000});
  await page.waitForLoadState('networkidle');
  await page.waitForSelector("a[href*='/OrderForm']");
  await page.locator("a[href*='/OrderForm']").click({timeout: 10000});
  await expect(page).toHaveURL(/EProduct\/OrderForm/,{timeout: 10000});
  await page.waitForLoadState('load');
  const filepath = path.resolve(__dirname, '../image.png');
  console.log('File path:', filepath);
   const fs = require('fs');
  if (!fs.existsSync(filepath)) {
    throw new Error(`File does not exist: ${filepath}`);
  }
  const [fileChooser] = await Promise.all([
    page.waitForEvent('filechooser'),
    page.locator("input[type*='file']").click({timeout:30000}),
  ]);
 console.log('File chooser triggered');
  await fileChooser.setFiles(filepath, { timeout: 10000});
  console.log('File set successfully');
  await page.locator("[name='6050-Ink']").selectOption("Black",{timeout: 10000});
  await Promise.all([
  page.waitForURL(/cart\//, { timeout: 40000 }),
  page.locator("[value='Proceed to cart']").click({ timeout: 20000 }),
  ]);
  await page.waitForLoadState("load");
  await page.locator('a.button--orange.button--with-arrow').click({ timeout: 40000 });
  await expect(page).toHaveURL(/Cart\/Your-Shipments/, { timeout: 30000 });
  await page.waitForLoadState('networkidle');
  await page.waitForSelector('.btnproceedtosummary', { state: 'visible', timeout: 15000 });
  await page.evaluate(() => {
  const button = document.querySelector('.btnproceedtosummary');
  if (button) {
    // @ts-ignore
    button.click();
  }
});
await page.waitForLoadState('networkidle');
await page.waitForURL(/Cart\/Order-Verification/, { timeout: 30000 });
});


