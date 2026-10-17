import {test, expect} from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage";
import { RegisterPage } from "../src/pages/RegisterPage";

let loginpage:LoginPage;
let registerpage:RegisterPage

test.beforeEach(async ({ page }) => {
     loginpage = new LoginPage(page);
     registerpage = new RegisterPage(page);
     await loginpage.goToLoginpage();
     await registerpage.Registerlinkclicked();
     

});

test('Register link presents', async ({page})=>{

    await expect(await registerpage.Registerlinkpresent()).toBeTruthy()
}
);
test('Regsiter link clicked', async({page})=>{
    //await registerpage.Registerlinkclicked();
    await expect(page).toHaveTitle('Register Account');
})

test('Register Account heading verify', async({page})=>{
    let headingvisible=await registerpage.registerAccountheadingPresents()
    expect(headingvisible).toBeTruthy()
})

test('verify your personal details text in the screen', async({page})=>{
    let persoanlDetailsText = await registerpage.personalDetailstextExists()
    expect(persoanlDetailsText).toBeTruthy()
});

test('verify the Register scren fields', async({page})=>{
    let fields= await registerpage.registerFieldsExists();
    await expect(fields.firstName).toBeTruthy();
    await expect(fields.lastName).toBeTruthy();
    await expect(fields.news).toBeTruthy();
    await expect(fields.password).toBeTruthy()
    await expect(fields.confirmpsw).toBeTruthy();
    await expect(fields.email).toBeTruthy();
    await expect(fields.pass).toBeTruthy();
    await expect(fields.telep).toBeTruthy();
})
