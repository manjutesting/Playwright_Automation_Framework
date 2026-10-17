
import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage"


export class RegisterPage extends BasePage{

    //Private locators
    private readonly registerLink:Locator;
    private readonly registerAccount:Locator;
    private readonly yourPersonalDetails:Locator;
    private readonly yourPassword:Locator;
    private readonly newsletter:Locator;
    private readonly firstName:Locator;
    private readonly lastName:Locator;
    private readonly email:Locator;
    private readonly telePhone:Locator;
    private readonly passWord:Locator;
    private readonly confirmPassword:Locator;
    private readonly policy_checkbox:Locator;
    private readonly continue:Locator;
    private readonly accountCreated:Locator;

    constructor(page:Page){
        super(page);
        this.registerLink=page.getByRole('link', { name: 'Register' }).first()
        this.registerAccount=page.getByRole('heading', { name: 'Register Account', level: 1 });
        this.yourPersonalDetails=page.getByText('Your Personal Details')
        this.newsletter= page.getByText('Newsletter', { exact: true }).first();
        this.yourPassword= page.getByText('Your Password')
        this.firstName=page.getByRole('textbox', { name: '* First Name' })
        this.lastName=page.getByRole('textbox', { name: '* Last Name' })
        this.email=page.getByRole('textbox', { name: '* E-Mail' })
        this.telePhone=page.getByRole('textbox', { name: '* Telephone' })
        this.passWord=page.getByRole('textbox', { name: '* Password', exact: true });
        this.confirmPassword=page.getByPlaceholder('Password Confirm')
        this.policy_checkbox = page.locator('#content > form.form-horizontal > div.buttons > div.pull-right > input:nth-of-type(1)');
        this.continue = page.getByRole('button', { name: 'Continue' });
        this.accountCreated = page.getByRole('heading', { name: 'Your Account Has Been Created!', level: 1 });
}

     async Registerlinkpresent(): Promise<boolean>{
        return await this.registerLink.isVisible()

    }
    async Registerlinkclicked(): Promise<void>{
         await this.registerLink.click()
         await this.page.waitForTimeout(5000)

    }

    async registerAccountheadingPresents():Promise<boolean>{
         return await this.registerAccount.isVisible()
    }

    async personalDetailstextExists():Promise<boolean>{
         return await this.yourPersonalDetails.isVisible()
    }
     async registerFieldsExists(): Promise<{password:boolean,firstName:boolean,lastName:boolean,news:boolean,email:boolean,pass:boolean,confirmpsw:boolean,telep:boolean}> {
  return {
    password: await this.yourPassword.isVisible(),
    firstName: await this.firstName.isVisible(),
    lastName: await this.lastName.isVisible(),
    news: await this.newsletter.isVisible(),
    pass:await this.passWord.isVisible(),
    confirmpsw:await this.confirmPassword.isVisible(),
    email: await this.email.isVisible(),
    telep:await this.telePhone.isVisible()
     };
}

async isregistered(firstName:string,lastName:string,email:string,telePhone:string,passWord:string,confirmPassword:string):  Promise<void>{

 
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.email.fill(email);
    await this.telePhone.fill(telePhone);
    await this.passWord.fill(passWord);
    await this.confirmPassword.fill(confirmPassword);
    await this.policy_checkbox.click()
    await this.continue.click()
    await this.page.waitForTimeout(5000) 
    
} 

 async getAccountCreatedMsg(): Promise<string> {
  return await this.accountCreated.innerText();
}


}