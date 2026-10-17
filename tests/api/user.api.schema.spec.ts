import  Ajv  from 'ajv'
import {test, expect} from '../../src/fixtures/apifixture'
import process from 'node:process';
import { ApiHelper } from '../../src/api/APIHelper';
//schema: type  od resposne data
    //ajv lib for schema validation
    //npm install ajv

const TOKEN = process.env.API_TOKEN;

let AUTH_HEADER = {
    Authorization : `Bearer ${TOKEN}`
};

//setup ajv
let ajv = new Ajv();
//define JSON Schema

let userSchema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Generated schema for Root",
  "type": "object",
  "properties": {
    "id": {
      "type": "number"
    },
    "name": {
      "type": "string"
    },
    "email": {
      "type": "string"
    },
    "gender": {
      "type": "string"
    },
    "status": {
      "type": "string"
    }
  },
  "required": [
    "id",
    "name",
    "email",
    "gender",
    "status"
  ]
}

test(`get user schema test`, async ({ apiHelper }) => {
  let userData = {
    name: "PW USER UPDATED One",
    email: `automation_${Date.now()}@test.com`, // ensure unique email
    gender: "male",
    status: "active"
  };

  let response = await apiHelper.post('public/v2/users', userData, AUTH_HEADER);
  expect(response.status).toBe(201);

  let userId = response.body.id;
  console.log(`created user:`, userId);

  let getUserResponse = await apiHelper.get(`public/v2/users/${userId}`, AUTH_HEADER);
  expect(getUserResponse.status).toBe(200);

  // schema validation
  let validate = ajv.compile(userSchema);
  let isSchemaValid = validate(getUserResponse.body);
  if (!isSchemaValid) {
    console.log("SCHEMA ERRORS", validate.errors);
  }
  expect(isSchemaValid).toBeTruthy();
});
