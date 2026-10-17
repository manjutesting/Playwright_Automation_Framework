import {test as baseTest} from '@playwright/test'
import { BasePage } from '../pages/BasePage'
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { RegisterPage } from '../pages/RegisterPage';
import { SearchResultsPage } from '../pages/SearchResultPage';
import { ProductInfoPage } from '../pages/ProductInfoPage';

type pagefixtures = {
    basepage: BasePage;
    loginpage:LoginPage;
    homepage:HomePage;
    registerpage:RegisterPage;
    searchresultpage:SearchResultsPage;
    productinfopage:ProductInfoPage;
    

};

//extends plawright test:using baseTest.extend:inheritance
export let test = baseTest.extend<pagefixtures>({

    basepage:async({page}, use)=>{
        let basepage = new BasePage(page);
        await use(basepage);
    },
    loginpage:async({page}, use)=>{
        let loginpage = new LoginPage(page);
        await use(loginpage);
    },
    homepage:async({page}, use)=>{
        let homepage = new HomePage(page);
        await use(homepage);
    },

    registerpage:async({page}, use)=>{
        let registerpage = new RegisterPage(page);
        await use(registerpage);
    },
    searchresultpage: async ({ page }, use) => {
    const searchresultpage = new SearchResultsPage(page);
    await use(searchresultpage);
  },
    productinfopage: async ({ page }, use) => {
    const productinfopage = new ProductInfoPage(page);
    await use(productinfopage);
  }
  
})

export {expect} from '@playwright/test'
