import process from 'node:process';
import {test, expect} from '../src/fixtures/pagefixtures'
import { CsvHelper } from '../src/utils/CsvHelper';
import { ExcelHelper } from '../src/utils/ExcelHelper';
import { JsonHelper } from '../src/utils/JsonHelper';


test.beforeEach(async ({ loginpage }) => {
      await loginpage.goToLoginpage();


});

test('register account heading presents', async({loginpage})=>{
    await expect(await loginpage.isRegister_account_exists()).toBeTruthy()
})

test('register clickable', async ({ loginpage }) => {
  let clickable = await loginpage.isRegisterAccountClickable();
  expect(clickable).toBeTruthy();
});

test('login page title', async ({ loginpage })=>{
    let title= await loginpage.getTitle()
    expect (title).toBe('Account Login');
})

test('forgotten link presents', async ({loginpage})=>{

     await expect(await loginpage.isForgottenLinkExists()).toBeTruthy()
}
)

test('new customer header presents', async({loginpage})=>{
    await expect(await loginpage.isnewCustomerExists()).toBeTruthy()
})
test('return customerheader present', async({loginpage})=>{
    await expect(await loginpage.isReturnCustomerExists()).toBeTruthy()
})

test('login the user',async({loginpage})=>{
    
    await loginpage.doLogin(process.env.USERNAME!, process.env.PASSWORD!);
})

test('iam returning account test', async({loginpage})=>{
    expect (await loginpage.is_iam_returning_customer_exists()).toEqual('I am a returning customer')
});

test('test register link available', async({loginpage})=>{

    expect(await loginpage.registerlinkexists()).toBeTruthy()

})

// let testData =CsvHelper.readCsv('testdata/logindata.csv')
// for(let row of testData){
//     test(`login the invalid user data - ${row.username} - ${row.password} `,async({loginpage})=>{
        
//         await loginpage.doLogin(row.username, row.password);
//         expect(await loginpage.isInvalidLoginErrorDisplayed()).toBeTruthy()
//     });

// };

let testData1 = JsonHelper.readJson('testdata/logindata.json')
for (let row of testData1) {
  test(`login the invalid user data - ${row.username} - ${row.password}`, async ({ loginpage }) => {
    await loginpage.doLogin(row.username, row.password);
    expect(await loginpage.isInvalidLoginErrorDisplayed()).toBeTruthy();
  });
}



