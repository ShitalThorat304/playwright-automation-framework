const {test,expect}=require("@playwright/test");

test('Validating Login Page Error Message', async({page}) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log( page.title());
    //locate by id
   await page.locator('#username').fill('rahulshettyacademy1');
   await page.locator("[type='password']").fill('Learning@830$3mK2');
   await page.locator("#signInBtn").click();
   console.log(await page.locator("[style *='block']").textContent());
   await expect(page.locator("[style *='block']")).toContainText("Incorrect");
});

test.only('Validating Successfull Login', async({page}) => {
    const cardTitles = page.locator(".card-body a");
   const documentsLink = page.locator("[href *='https://rahulshettyacademy.com/doc']");
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log( page.title());
    //locate by id
   await page.locator('#username').fill('rahulshettyacademy');
   await page.locator("[type='password']").fill('Learning@830$3mK2');
   const dropdown = page.locator("select.form-control");
   await dropdown.selectOption("consult");
   await page.locator("span.radiotextsty").last().click();
   await expect(documentsLink).toHaveAttribute("class","blinkingText");
   await expect( page.locator("span.radiotextsty").last()).toBeChecked();
   console.log( page.locator("span.radiotextsty").last().isChecked());
   await page.locator("#okayBtn").click();
   await page.locator("#terms").check();
   await page.locator("#signInBtn").click();
   //console.log(await page.locator(".card-body a").textContent()); //strict mode violation error
   console.log(await cardTitles.first().textContent());
   console.log(await cardTitles.nth(1).textContent());
   console.log(await cardTitles.allTextContents());
 
  
});