// @ts-check
import { test, expect } from '@playwright/test';
import path from 'path';

test.only('RippedSheet SiteMonitoring orderFlow', async ({ page }) => { 
  await page.goto('https://rippedsheets.com/my-account');
  await page.locator("#username").fill("test01@mailinator.com",{timeout: 10000});
  await page.locator("#password").fill("Test@123",{timeout: 10000});
  await page.locator("button[value*='Log in']").click();
  await page.waitForLoadState();
 await page.goto('https://rippedsheets.com/specialty/100850-adult-kids-waterproof-paper-tyvek-wristbands.html');
  
  await page.waitForLoadState();
  await expect(page).toHaveURL(/.*adult-kids-waterproof-paper-tyvek-wristbands/);
  await page.locator("input[value='10']").click({timeout: 10000});
  await page.waitForTimeout(1000);
  const orderBtn= await page.waitForSelector(".woocommerce-variation-add-to-cart-enabled button")
  await orderBtn.click({timeout: 10000,noWaitAfter: true });
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL(/cart/);
  await page.locator(".wc-proceed-to-checkout a").click({timeout: 10000});
    await page.waitForLoadState();
  await expect(page).toHaveURL(/.*checkout/);




  
  

  
});


