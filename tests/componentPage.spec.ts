import {test , expect} from "@playwright/test"
import { LoginPage } from "../src/pages/LoginPage"
import { ComponetPage } from "../src/pages/ComponetsPage";

let loginpage:LoginPage;
let componetPage:ComponetPage;

test.beforeEach(async ({ page }) => {
     loginpage = new LoginPage(page);
     componetPage = new ComponetPage(page); 
     await loginpage.goToLoginpage();
     await loginpage.doLogin(process.env.PW_USERNAME!, process.env.PW_PASSWORD!)
     
     

});

test("validate nav items", async () => {
  await componetPage.homeIconClicked()
  await componetPage.validateNavItems();  // ✅ now works
});
