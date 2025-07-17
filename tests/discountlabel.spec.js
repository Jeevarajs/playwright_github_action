// @ts-check
import { test, expect } from '@playwright/test';

test('Discountlabel SiteMonitoring orderFlow', async ({ page }) => {
  await page.goto('https://www.discountlabels.com/User/Login/');
  await page.locator("#username").fill("test182@mailinatro.com");
  await page.locator("#password").fill("Test@123");
  await page.locator("[class*='new-login-btn']").click();
  await page.waitForLoadState('networkidle');
  await page.waitForURL('https://www.discountlabels.com/dashboard/');
  await page.locator(".menu__level0[href*='/products']").click({timeout: 10000});
  await page.locator("a[href*='/quick-ship-labels'] .product-categories__button").click({timeout: 10000});
  await page.waitForURL("https://www.discountlabels.com/products/quick-ship-labels/")
  await page.locator("a[href*='/quick-ship-labels/anyshape'] .link").click({timeout: 10000});
  await page.waitForURL("https://www.discountlabels.com/products/quick-ship-labels/anyshape-labels/");
  await page.locator("a[href*='/OrderForm']").click({timeout: 10000});
  await expect(page).toHaveURL("https://www.discountlabels.com/EProduct/OrderForm/?Product=29");
  
});


