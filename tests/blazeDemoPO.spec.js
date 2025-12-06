const{test,expect}= require('@playwright/test');
//const {customtest}= require('../Utils/test-base');

const {LandingPage}=require('../pageobject/LandingPage');
const { ProductCatalogue } = require('../pageobject/ProductCatalogue');
const dataset= require('../Utils/testData');
const {AddToCart}= require('../pageobject/AddToCart');
const {PlaceOrder}= require('../pageobject/PlaceOrder');
const { ConfirmationPage } = require('../pageobject/ConfirmationPage');
const { AsyncLocalStorage } = require('async_hooks');
//const testData = require('../Utils/testData');


dataset.forEach(data=>{

    test.describe('@smoke Smoke Test', ()=>{

    let landingPage;
    let productCat;

    test.beforeAll(async ({page})=>{

        landingPage=new LandingPage(page);
        productCat=new ProductCatalogue(page);
        
        await landingPage.goTo();
        await landingPage.ValidLogin(data.username, data.password);

    });
    
    test.afterAll(async ()=>{

        console.log(`Smoke test completed for user :  ${data.username}`)
    });


test(`@smoke BlazeDemo LoginFlow Test Case ${data.username}`, async ({page})=>{
 
    const landingPage = new LandingPage(page);
    await landingPage.goTo();
    await landingPage.ValidLogin(data.username, data.password);

});




test(`@smoke Product Selection Test Case  ${data.neededProduct}`, async ({page})=>{

    await productCat.ProductSelection(data.neededProduct);

});

    });


test.describe("@regression Regression Test", async ()=>{

let landingPage;
let productCat;
let addToCart;
let orderPlace;
let cnfPage;

test.beforeAll(async ()=>{

    landingPage= new LandingPage(page);
    productCat= new ProductCatalogue(page);
    addToCart= new AddToCart(page);
    orderPlace= new AddToCart(page);
    cnfPage= new ConfirmationPage(page);

    await landingPage.goTo();
    await landingPage.ValidLogin(data.username, data.password);

});

test.afterAll(async ()=>{

    console.log(`Regression test plan has been completed for ${data.username}`);
});



test(`@regression Add to cart the selected product and place order then give confirmation message for ${data.username}`, async ({page})=>{
    
    await productCat.ProductSelection(data.neededProduct);
    await addToCart.AddProductToCart(data.neededProduct);
    await orderPlace.FillPlaceOrderForm(data.name, data.country, data.city, data.creditCard, data.month, data.year);
    await cnfPage.ConfirmationPrompt();
    
});
});
});


/*
customtest.only(" Add to cart the selected product and place order then give confirmation", async ({page, testDataForOrder})=>{

 const landingPage = new LandingPage(page);
    await landingPage.goTo();
    await landingPage.ValidLogin(testDataForOrder.username, testDataForOrder.password);

    const productCat= new ProductCatalogue(page);
    await productCat.ProductSelection(testDataForOrder.neededProduct);
    const addToCart= new AddToCart(page);
    await addToCart.AddProductToCart(testDataForOrder.neededProduct);
    const orderPlace= new PlaceOrder(page);
    await orderPlace.FillPlaceOrderForm(testDataForOrder.name, testDataForOrder.country, testDataForOrder.city, testDataForOrder.creditCard, testDataForOrder.month, testDataForOrder.year);

    const cnfPage= new ConfirmationPage(page);
    await cnfPage.ConfirmationPrompt();
    

});*/

