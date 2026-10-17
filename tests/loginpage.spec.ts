import {test , expect} from "@playwright/test"
import { LoginPage } from "../src/pages/LoginPage"

let loginpage:LoginPage;

test.beforeEach(async ({ page }) => {
     loginpage = new LoginPage(page);
     await loginpage.goToLoginpage();

});

test('register account heading presents', async({page})=>{
    await expect(await loginpage.isRegister_account_exists()).toBeTruthy()
})

test('register clickable', async ({ page }) => {
  let clickable = await loginpage.isRegisterAccountClickable();
  expect(clickable).toBeTruthy();
});

test('login page title', async ({ page })=>{
    loginpage= new LoginPage(page);
    await expect (page).toHaveTitle('Account Login');
})

test('forgotten link presents', async ({page})=>{

     await expect(await loginpage.isForgottenLinkExists()).toBeTruthy()
}
)

test('new customer header presents', async({page})=>{
    await expect(await loginpage.isnewCustomerExists()).toBeTruthy()
})
test('return customerheader present', async({page})=>{
    await expect(await loginpage.isReturnCustomerExists()).toBeTruthy()
})

test('login the user',async({page})=>{
    
    await loginpage.doLogin('manjubldevops@gmail.com','Dithvi@143');
})

test('iam returning account test', async({page})=>{
    expect (await loginpage.is_iam_returning_customer_exists()).toEqual('I am a returning customer')
});

test('test register link available', async({page})=>{

    expect(await loginpage.registerlinkexists()).toBeTruthy()

})