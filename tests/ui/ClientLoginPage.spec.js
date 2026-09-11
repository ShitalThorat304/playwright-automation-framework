const {test, expect}=require('@playwright/test');

test('Validate Client Successful Login', async({page}) =>{
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    //macjson@gmail.com Practice@123
    await page.locator("#userEmail").fill("macjson@gmail.com");
    await page.locator("#userPassword").fill("Practice@123");
    await page.locator("#login").click();
    await page.waitForLoadState('networkidle');
    const Titles = await page.locator(".card-body b").allTextContents();
    console.log(Titles);
});