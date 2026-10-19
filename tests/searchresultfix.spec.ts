import process from 'node:process';
import {test, expect} from '../src/fixtures/pagefixtures'
import { CsvHelper } from '../src/utils/CsvHelper';


test.beforeEach(async ({ loginpage }) => {
     
     await loginpage.goToLoginpage();
    
    await loginpage.doLogin(process.env.PW_USERNAME!, process.env.PW_PASSWORD!);
     });

//data provider:
// let productData = CsvHelper.readCsv('testdata/product.csv');
// for (let row of productData) {
//     test(`verify search results count - ${row.searchkey} - ${row.productname}`, async ({ homepage, searchresultpage }) => {
//         await homepage.doSearch(row.searchkey);
//         let actResultCount = await searchresultpage.getProductSearchResultsCount();
//         console.log('Search Results Count: ', actResultCount);
//         expect(actResultCount).toBe(Number(row.resultcount));
//     });
// }

// for (let row of productData) {
//     test(`verify user is able to land on the product page - ${row.searchkey} - ${row.productname}`, async ({ homepage, searchresultpage, page }) => {
//         await homepage.doSearch(row.searchkey);
//         await searchresultpage.selectProduct(row.productname);
//         expect(await page.title()).toBe(row.productname);
//     });
// }
test('verify search product', async({homepage, searchresultpage})=>{
    await homepage.doSearch('MacBook')
    let resultcount=await searchresultpage.getProductSearchResultsCount()
    console.log('Search result count:', resultcount )
    expect(resultcount).toBe(3);
});

test('verify search product value', async({homepage, searchresultpage, page})=>{
    await homepage.doSearch('MacBook')
    await searchresultpage.selectProduct('MacBook Pro');
    expect(await page.title()).toBe('MacBook Pro');
    await page.pause();
})

let productData =CsvHelper.readCsv('testdata/product.csv')
for(let row of productData){
    test(`seched product count - ${row.searchkey} - ${row.productname} -#{row.resultcount} `,async({homepage, searchresultpage,page})=>{
        
      await homepage.doSearch(row.searchkey)
      let actresultcount=await searchresultpage.getProductSearchResultsCount()
      console.log('Search result count:', actresultcount )
      expect(actresultcount).toBe(Number(row.resultcount));
    });
};