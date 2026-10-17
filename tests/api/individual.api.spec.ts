import process from 'node:process'
import {test, expect} from '../../src/fixtures/apifixture'

const TOKEN = process.env.API_TOKEN;

let AUTH_HEADER = {
    Authorization : `Bearer ${TOKEN}`
};

//helper Generic function create a user (post call):
// helper function
async function createUser(apiHelper: any) {
  let userData = {
    name: 'automation',
    email: `automation_${Date.now()}@test.com`,
    gender: 'male',
    status: 'active'
  };

  // Ensure correct path and header
  let response = await apiHelper.post('public/v2/users', userData, AUTH_HEADER);
  expect(response.status).toBe(201);
  return response.body;
}

//test post->create->get->verify
test(`create a user`, async ({ apiHelper }) => {
  let userResponse = await createUser(apiHelper);

  // verify user exists
  let getResponse = await apiHelper.get(`public/v2/users/${userResponse.id}`, AUTH_HEADER);
  expect(getResponse.status).toBe(200);
  expect(getResponse.body.name).toBe('automation');
});


//test2 
// post->create->get->verify->update->get->verify
test(`update a user`, async ({ apiHelper }) => {
  let userResponse = await createUser(apiHelper);

  // verify user exists
  let getResponse = await apiHelper.get(`public/v2/users/${userResponse.id}`, AUTH_HEADER);
  expect(getResponse.status).toBe(200);
  expect(getResponse.body.name).toBe('automation');
  let updateData= {
  'name':'automation-updated',
  'status':'active'
  };
  let updateResponse =await apiHelper.put(`public/v2/users/${userResponse.id}`,updateData, AUTH_HEADER);
  expect(updateResponse.status).toBe(200);
  expect(updateResponse.body.name).toBe(updateData.name);
  expect(updateResponse.body.status).toBe(updateData.status);

  getResponse = await apiHelper.get(`public/v2/users/${userResponse.id}`, AUTH_HEADER);
  expect(getResponse.status).toBe(200);
  expect(getResponse.body.name).toBe(updateData.name);
  expect(getResponse.body.status).toBe(updateData.status);

});

//test3
// post->create->get->verify->update->get->verify
test(`create update  delete a user`, async ({ apiHelper }) => {
  let userResponse = await createUser(apiHelper);

  // verify user exists
  let getResponse = await apiHelper.get(`public/v2/users/${userResponse.id}`, AUTH_HEADER);
  expect(getResponse.status).toBe(200);
  expect(getResponse.body.name).toBe('automation');
  let updateData= {
  'name':'automation-updated',
  'status':'active'
  };
  let updateResponse =await apiHelper.put(`public/v2/users/${userResponse.id}`,updateData, AUTH_HEADER);
  expect(updateResponse.status).toBe(200);
  expect(updateResponse.body.name).toBe(updateData.name);
  expect(updateResponse.body.status).toBe(updateData.status);

  getResponse = await apiHelper.get(`public/v2/users/${userResponse.id}`, AUTH_HEADER);
  expect(getResponse.status).toBe(200);
  expect(getResponse.body.name).toBe(updateData.name);
  expect(getResponse.body.status).toBe(updateData.status);

  let deleteResponse = await apiHelper.delete(`public/v2/users/${userResponse.id}`, AUTH_HEADER);
  console.log(`Deleted the User id:`,userResponse.id)
  expect(deleteResponse.status).toBe(204);
 

});

