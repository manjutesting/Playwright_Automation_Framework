import process from 'node:process';
import {test, expect} from '../src/fixtures/pagefixtures'
import { CsvHelper } from '../src/utils/CsvHelper';
import { HomePage } from '../src/pages/HomePage';


test.beforeEach(async ({ loginpage }) => {
     
     await loginpage.goToLoginpage();
    
    await loginpage.doLogin(process.env.PW_USERNAME!, process.env.PW_PASSWORD!);
     });
test('verify  product imge count', async({homepage, searchresultpage,productinfopage, page})=>{
    await homepage.doSearch('MacBook')
    await searchresultpage.selectProduct('MacBook Pro');
    expect(await productinfopage.getProductImagesCount()).toBe(4);
    await page.pause();

})

test('verify product info', async ({ homepage, searchresultpage, productinfopage }) => {
  await homepage.doSearch('MacBook');
  await searchresultpage.selectProduct('MacBook Pro');
  let actualProductInfoMap = await productinfopage.getProductInfo();
  console.log('actual product info:', actualProductInfoMap);

  expect.soft(actualProductInfoMap.get('productheader')).toBe('MacBook Pro');
});



test('verify  product header', async({homepage, searchresultpage,productinfopage, page})=>{
    await homepage.doSearch('MacBook')
    await searchresultpage.selectProduct('MacBook Pro');
    expect(await productinfopage.getProductHeader()).toBe('MacBook Pro');
    await page.pause();

})
