import {test, expect} from '../src/fixtures/pagefixtures'
import { CsvHelper } from '../src/utils/CsvHelper';



test.beforeEach(async ({ loginpage,registerpage }) => {
     
     await loginpage.goToLoginpage();
     await registerpage.Registerlinkclicked();
     

});

test('Register link presents', async ({registerpage})=>{

    await expect(await registerpage.Registerlinkpresent()).toBeTruthy()
}
);

test('Register Account heading verify', async({registerpage})=>{
    let headingvisible=await registerpage.registerAccountheadingPresents()
    expect(headingvisible).toBeTruthy()
})

test.skip('verify your personal details text in the screen', async({registerpage})=>{
    let persoanlDetailsText = await registerpage.personalDetailstextExists()
    expect(persoanlDetailsText).toBeTruthy()
});

test('verify the Register scren fields', async({registerpage})=>{
    let fields= await registerpage.registerFieldsExists();
    await expect(fields.firstName).toBeTruthy();
    await expect(fields.lastName).toBeTruthy();
    await expect(fields.news).toBeTruthy();
    await expect(fields.password).toBeTruthy()
    await expect(fields.confirmpsw).toBeTruthy();
    await expect(fields.email).toBeTruthy();
    await expect(fields.pass).toBeTruthy();
    await expect(fields.telep).toBeTruthy();
});

// test('verify register function', async ({ registerpage }) => {
//   await registerpage.isregistered('mss','testing','msstesting@gmail.com','9448297761','MSS1234','MSS1234');
//   let msg = await registerpage.getAccountCreatedMsg(); // await the Promise
//   expect(msg).toBe('Your Account Has Been Created!');
  
// });


let testData = CsvHelper.readCsv('testdata/register.csv');

for (let row of testData) {
  test(
    `register user data - ${row.firstName} - ${row.lastName} - ${row.email} - ${row.telePhone} - ${row.passWord} - ${row.confirmPassword}`,
    async ({ registerpage }) => {
      await registerpage.isregistered(
        row.firstName,
        row.lastName,
        row.email,
        row.telePhone,
        row.passWord,
        row.confirmPassword
      );

      let msg = await registerpage.getAccountCreatedMsg();
      expect(msg).toBe('Your Account Has Been Created!');
    });
}