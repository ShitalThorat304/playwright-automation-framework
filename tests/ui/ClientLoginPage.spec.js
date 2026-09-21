const { test, expect } = require('@playwright/test');

test('Validate Client Successful Login', async ({ page }) => {
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    const productName = "ZARA COAT 3";
    await page.locator("#userEmail").fill("macjson@gmail.com");
    await page.locator("#userPassword").fill("Practice@123");
    await page.locator("#login").click();
    await page.waitForLoadState('networkidle');

    await page.locator(".card-body b").first().waitFor();
    const Titles = await page.locator(".card-body b").allTextContents();
    console.log(Titles);
    const count = await products.count();
    const email = "macjson@gmail.com";
    for (let i = 0; i < count; i++) {
        if (await products.nth(i).locator("b").textContent() === productName) {
            await products.nth(i).locator("text = Add To Cart").click();
            break;

        }
    }
    await page.locator("[routerlink *='cart']").click();
    await page.locator("div li").first().waitFor();
    const isAvailable = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(isAvailable).toBeTruthy();
    await page.locator("text=Checkout").click();
    await page.locator("[placeholder *='Country']").pressSequentially("ind", { delay: 100 });
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    console.log(optionsCount);
    for (let i = 0; i < optionsCount; i++) {
        const value = await dropdown.locator("button").nth(i).textContent();
        console.log(value);
        if (value === " India") {
            await dropdown.locator("button").nth(i).click();
            break;
        }

    }

    expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);

    await page.locator(".fa-handshake-o").click();
    const rows = await page.locator("tbody tr");
    await page.locator("tbody").waitFor();
    console.log("rows", rows);
    for (let i = 0; i < await rows.count(); i++) {

        const id = await rows.nth(i).locator("th").textContent();
        console.log(id);
        if (orderId.includes(id)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderDetails)).toBeTruthy();
});