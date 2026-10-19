
import process from "node:process";
import {test, expect} from '../src/fixtures/pagefixtures'



// test.beforeEach(async ({ page }) => {
//      loginpage = new LoginPage(page);
//      homepage = new HomePage(page);
//      await loginpage.goToLoginpage();
//      await loginpage.doLogin("manjubldevops@gmail.com","Dithvi@143");

// });

test.beforeEach(async ({ loginpage }) => {
     
     await loginpage.goToLoginpage();
    
    //await loginpage.doLogin("manjubldevops@gmail.com","Dithvi@143");
    await loginpage.doLogin(process.env.PW_USERNAME!, process.env.PW_PASSWORD!);
     });

test('test my account', async({homepage})=>{
    expect(await homepage.isMyaccountExists()).toBeTruthy()
})

test('home page title test', async ({homepage}) => {
    let pageTitle = await homepage.getHomePageTitle();
    console.log('home page title: ', pageTitle);
    expect(pageTitle).toBe('My Account');
});

test('logout link exist test', async ({homepage}) => {
    expect(await homepage.isLogoutLinkExist()).toBeTruthy();
});

test('home page headers exist test', async ({homepage}) => {
    let allHeaders = await homepage.getHomePageHeaders();
    console.log('home page headers: ', allHeaders);
    expect.soft(allHeaders).toHaveLength(4);
    expect.soft(allHeaders).toEqual([
        'My Account',
        'My Orders',
        'My Affiliate Account',
        'Newsletter'
    ]);
});