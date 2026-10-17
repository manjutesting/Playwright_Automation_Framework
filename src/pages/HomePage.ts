import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";


export class HomePage extends BasePage{

    // 1. Private locators
    private readonly myaccount:Locator ;
    private readonly logoutLink: Locator;
    private readonly headers: Locator;
    private readonly searchBox: Locator;
    private readonly searchIcon: Locator;


    constructor(page:Page) {
        super(page);
        this.myaccount = page.getByRole('heading', { name: 'My Account', level: 2 }).first()
        this.logoutLink = page.getByRole('link', { name: 'Logout' });
        this.headers = page.getByRole('heading', { level: 2 });
        this.searchBox = page.getByRole('textbox', { name: 'Search' });
        this.searchIcon = page.locator('#search button')
    }

    async isMyaccountExists():Promise<boolean>{
        return await this.myaccount.isVisible();
    }
    //page actions:
    async getHomePageTitle(): Promise<string> {
        await this.page.waitForTimeout(10000)
        return await this.page.title();
    }

    async isLogoutLinkExist(): Promise<boolean> {
        return await this.logoutLink.isVisible();
    }

    async getHomePageHeaders(): Promise<string[]> {
        return await this.headers.allInnerTexts();
    }

    async doSearch(searchKey: string): Promise<void> {
        console.log('search key: ', searchKey);
        await this.searchBox.fill(searchKey);
        await this.searchIcon.click();
    }



}