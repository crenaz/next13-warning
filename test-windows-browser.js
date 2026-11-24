import { chromium } from '@playwright/test';

(async () => {
  console.log('Attempting to launch native WSL browser via WSLg...');
  
  const browser = await chromium.launch({
    headless: false // This will make a Linux Chrome window pop up on your Windows desktop!
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  // This will cleanly access your Linux development servers on localhost
  await page.goto('https://playwright.dev');
  console.log('Page title:', await page.title());

  await page.waitForTimeout(5000);
  await browser.close();
  console.log('Browser closed successfully!');
})();
