const { expect } = require("playwright/test");
const { BasePage } = require("./BasePage");
const { TIMEOUT } = require("dns");

class LandingPage extends BasePage{

constructor(page){

 //this.page=page; //if you not write it you cant access page in other methods you will on able to use in constuctor.
 super(page);// we can use this also because we are inheriting parent properties so super used.
 // these value are used across the class and initiaded first.
 this.signInButtonSelector=page.locator("[data-target='#logInModal']");
 this.loginModal = page.locator('#logInModal');
 this.userName=page.locator('#loginusername');
 this.PassWord=page.locator('#loginpassword');
 this.LogIN=page.locator("[onclick='logIn()']");
 this.loggedInUser = page.locator('#nameofuser');

} //We are using BasePage as Parent inheriting parent constructor for page


async goTo(){

   await this.page.goto('https://demoblaze.com/', { waitUntil: 'domcontentloaded' });
   await this.page.locator('#tbodyid').first().waitFor();


}

async ValidLogin(username,password){ //this argument is passed from test file.
//these are the actions to be performed on the page. method created for that so we can call it in test file.
    


     // await this.page.locator('#logInModal').waitFor({state: 'visible'});
await this.signInButtonSelector.click({TIMEOUT:25000}); //for wait    
await this.loginModal.waitFor({ state: 'visible', TIMEOUT:15000 });

await expect(this.userName).toBeVisible();
await this.userName.fill(username);
await expect(this.PassWord).toBeVisible();
await this.PassWord.fill(password);

        // 4️⃣ Click login button
await this.LogIN.click();

        // 5️⃣ Wait for user to be logged in
await this.loggedInUser.waitFor({ state: "visible" });

        // Optional: Print logged-in text
const name = await this.loggedInUser.textContent();
//console.log("Logged in user:", name.trim());

}


}

module.exports={LandingPage}; //for accessing this class in other files. need to export it and also in other file import like require. in that file.
