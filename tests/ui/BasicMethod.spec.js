const{test,expect} = require('@playwright/test');

test('Basic method test', async({browser})=>{

const context = await browser.newContext();
const page = await context.newPage();
await page.goto("https://www.google.com/");
await expect(page).toHaveTitle(/Google/);

});