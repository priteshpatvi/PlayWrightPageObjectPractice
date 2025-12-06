const { expect } = require("playwright/test");
const { BasePage } = require("./BasePage");

class AddToCart extends BasePage{

constructor(page){

super(page);
this.AddToCartButton=page.locator("a:has-text('Add to cart')");


}

async AddProductToCart(neededProduct){

await this.AddToCartButton.click();
await this.page.once('dialog', async dialog=>{
    console.log('Dialog message:', dialog.message());
    await dialog.accept();
});

await this.page.locator('#cartur').click();
await this.page.locator('#tbodyid').waitFor();
const CartProduct = await this.page.getByRole('cell', { name: neededProduct }).first().textContent();

expect(CartProduct.trim()).toBe(neededProduct);
console.log("Product in cart: ", CartProduct.trim());
}

}

module.exports={AddToCart};