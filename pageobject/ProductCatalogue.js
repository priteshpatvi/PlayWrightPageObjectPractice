const { expect } = require("playwright/test");
const { BasePage } = require("./BasePage");

class ProductCatalogue extends BasePage{

constructor(page){

    //this.page=page; //taking page and initilazing for this class using constructor

    super(page);
     this.selectedProductName = page.locator(".name"); 

}

async ProductSelection(neededProduct){

await this.page.locator(".list-group-item", {hasText: "Laptops"}).click();

await this.page.locator('#tbodyid .card-title').first().waitFor();
await this.page.getByText(neededProduct, {exact: true}).click();

await expect(this.selectedProductName).toBeVisible();
const SelectedProduct = (await this.selectedProductName.textContent()).trim();
await expect(SelectedProduct).toBe(neededProduct);
console.log("Selected Product:", SelectedProduct);




}

}

module.exports={ProductCatalogue};
