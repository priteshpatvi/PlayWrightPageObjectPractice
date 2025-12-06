const {test, expect, request} = require('@playwright/test');
const dataPayload= {userEmail:"priteshtest@gmail.com",userPassword:"Test1234"};



let token;

test.beforeAll(async ()=>{

    const apiContext= await request.newContext();
    const LoginResponse=await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',{data:dataPayload});

    expect(LoginResponse.ok()).toBeTruthy();
    const loginResponseJson= await LoginResponse.json();
     token= loginResponseJson.token;
     console.log(token);


});


test('Client App Login', async ({page})=>{

    page.addInitScript(value=>{
        window.localStorage.setItem('token',value);
    }, token); //here 1st value is argument and last token is parameter

await page.goto("https://rahulshettyacademy.com/client");
//await page.locator("#userEmail").fill("anshika@gmail.com");
//await page.locator("#userPassword").fill("Iamking@000");
//await page.locator("[value='Login']").click();
//await page.waitForLoadState('networkidle'); sometimes its flicky so alternate is below its for sometimes all product not load properly so it wait till load by network checking
await page.locator(".card-body b").first().waitFor();
const titles= await page.locator(".card-body b").allTextContents();
console.log(titles);

});
