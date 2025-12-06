const { BasePage } = require("./BasePage");

class PlaceOrder extends BasePage{

constructor(page){

super(page);

}

async FillPlaceOrderForm(name, country, city, creditCard, month, year){

    await this.page.getByRole("button", { name: "Place Order" }).click();
    await this.page.locator("#name").waitFor();

    await this.page.locator("#name").fill(name);
    await this.page.locator("#country").fill(country);
    await this.page.locator('#city').fill(city);
    await this.page.locator("#card").fill(creditCard);
    await this.page.locator("#month").fill(month);
    await this.page.locator("#year").fill(year);
    await this.page.getByText("Purchase").click();
    await this.page.getByText("Thank you for your purchase!").waitFor();


}
}
module.exports={PlaceOrder};

