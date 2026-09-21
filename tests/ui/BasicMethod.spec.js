const { test, expect } = require('@playwright/test');

test('Basic method test', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.google.com/");
    await expect(page).toHaveTitle(/Google/);
});

test.only('Child window handle', async({browser}) => 
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const documentsLink =  page.locator("[href *='https://rahulshettyacademy.com/doc']");
    const [newPage] =  await Promise.all([
       context.waitForEvent('page'),
        await documentsLink.click()
    ])
    const msg = await newPage.locator("p.red").textContent();
    console.log(msg);

    
    
   


})