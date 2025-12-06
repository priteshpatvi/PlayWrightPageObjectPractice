const { expect } = require("playwright/test");
const { BasePage } = require("./BasePage");

class ConfirmationPage extends BasePage{
    constructor(page){
super(page);

}

async ConfirmationPrompt(){

const modalHeader = this.page.locator(".sweet-alert h2"); 
await modalHeader.waitFor({ state: "visible" });

const successText = await modalHeader.textContent(); 
const trimmed = successText.trim();

expect(trimmed).toBe("Thank you for your purchase!");
console.log("Confirmation Text:", trimmed);

await this.page.getByRole("button", { name: "OK" }).click();

}

}
module.exports={ConfirmationPage};