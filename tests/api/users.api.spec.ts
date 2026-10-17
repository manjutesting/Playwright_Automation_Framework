import process from 'node:process'
import {test, expect} from '../../src/fixtures/apifixture'

const TOKEN = process.env.API_TOKEN;

let AUTH_HEADER = {
    Authorization : `Bearer ${TOKEN}`
};

let userID: number;

test.describe.serial('running e2e gorest crud apis test', () => {

    test(`GET-API Read All user data`, async({apiHelper}) => {
      let response = await apiHelper.get('public/v2/users', AUTH_HEADER);
    expect(response.status).toBe(200);
  
    });

  test('Post API - Create a user', async ({ apiHelper }) => {
    let userData = {
      name: 'sachintendulakar',
      email: `sachin_auto_${Date.now()}@leka.com`, // unique email
      gender: 'male',                         // ✅ correct spelling
      status: 'active'
    };

    let response = await apiHelper.post('public/v2/users', userData, AUTH_HEADER);
    expect(response.status).toBe(201);

    userID = response.body?.id;
    expect(userID).toBeTruthy();   // sanity check
    console.log(`created user id:`, userID);
  });

  test('PUT API - Update a user', async ({ apiHelper }) => {
    let updateData = { name: 'lokeshdaa', status: 'inactive' };

    // ensure userID is valid before making the call
    expect(userID).toBeTruthy();

    let response = await apiHelper.put(`public/v2/users/${userID}`, updateData, AUTH_HEADER);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(updateData.name);
    expect(response.body.status).toBe(updateData.status);
    console.log(`updated user id:`,userID)
  });

  test('DELETE API - Delete a user', async ({ apiHelper }) => {
    console.log(`Deleted the User id:`,userID)
    let response = await apiHelper.delete(`public/v2/users/${userID}`, AUTH_HEADER);
    expect(response.status).toBe(204);   // correct status for successful delete
    
  });
});
