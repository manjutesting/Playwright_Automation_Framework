import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";


export class LoginPage extends BasePage{

    // 1. Private locators
    private readonly emailId:Locator ;
    private readonly password:Locator;
    private readonly login:Locator;
    private readonly forgottenPasswordLink:Locator;
    private readonly newCustomer:Locator;
    private readonly returnCustomer:Locator;
    private readonly register_account:Locator;
    private readonly iam_return_customer:Locator;
    private readonly registerLink:Locator;
    private readonly loginErrorMessage:Locator;
    //2.contructor

    constructor(page:Page){
        super(page);
        this.emailId=page.getByRole('textbox',{name:'E-Mail Address'});
        this.password=page.getByRole('textbox',{name:'Password'});
        this.login= page.getByRole('button',{name:'Login'}).first();
        this.forgottenPasswordLink= page.getByRole('link',{name:'Forgotten Password'}).first();
        this.returnCustomer=page.getByRole('heading', { name: 'Returning Customer', level: 2 });
        this.newCustomer=page.getByRole('heading', { name: 'New Customer', level: 2 });
        this.register_account = page.getByText('Register Account', { exact: true });
        this.iam_return_customer = page.getByText('I am a returning customer', { exact: true });
        this.registerLink=page.getByRole('link', { name: 'Register' }).first()
        this.loginErrorMessage = page.locator('.alert.alert-danger.alert-dismissible');

    }

    // public actions/method(behaviour):Encapsulation

    async goToLoginpage(): Promise<void>{
        await this.page.goto("opencart/index.php?route=account/login");
        await this.page.waitForTimeout(10000)
    }

    async getTitle():Promise<string>{
        return await this.page.title();
    }
    async isForgottenLinkExists():Promise<boolean>{
        return await this.forgottenPasswordLink.isVisible();

    }

    async isnewCustomerExists():Promise<boolean>{
        return await this.newCustomer.isVisible();
    }
    async isReturnCustomerExists():Promise<boolean>{
        return this.returnCustomer.isVisible();
    }

async doLogin(username: string, password: string): Promise<void> {
  console.log(`user credentials: ${username} - ${password}`);
  await this.emailId.fill(username);
  await this.password.fill(password);
  await this.login.click();
}

    async isRegisterAccountClickable() {
      return await this.registerLink.isVisible();
      //await this.registerLink.click()
    }

    async isRegister_account_exists(){
        return await this.register_account.textContent()
    }

     async is_iam_returning_customer_exists(){
        return await this.iam_return_customer.textContent()
    }

    async registerlinkexists(): Promise<boolean>{
        return await this.registerLink.isVisible()

    }

    async isInvalidLoginErrorDisplayed(): Promise<boolean> {
        return await this.loginErrorMessage.isVisible();
        
    }
}