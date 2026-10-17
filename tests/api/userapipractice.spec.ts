import {test, expect} from '@playwright/test'


let AUTH_TOKEN= {
    Authorization : 'Bearer 47403837cb67e685a0ce7fa960905724342e2667f2a495ebbb7470401cb56005'
};

test('get all users api data', async({request})=>{
   let response= await request.get('https://gorest.co.in/public/v2/users',{
    headers : AUTH_TOKEN 
   });
  let jsonbody = await response.json();
  console.log(jsonbody);
  console.log(response.status());
  console.log(response.statusText());

  expect(response.status()).toBe(200);
  expect(response.statusText()).toBe('OK');

});

test('create user in post api', async({request})=>{
    let userData = {
        'name': 'dithvi',
        'gender': 'female',
        'email':`blAuto_${Date.now()}@yahoo.com`,
        'status':'active'
    }

    let createResponse=await request.post('https://gorest.co.in/public/v2/users',{
        headers :AUTH_TOKEN,
        data: userData
    })

    let jsonBody = await createResponse.json();
    console.log(jsonBody);
    console.log(createResponse.status());
    console.log(createResponse.statusText());

    expect(createResponse.status()).toBe(201);
    expect(createResponse.statusText()).toBe('Created')

})

//put 8665210


test('update user in put api', async({request})=>{
    let userData = {
        
        'status':'inactive'
    };

    let updatedResponse=await request.put('https://gorest.co.in/public/v2/users/8665254',{
       data: userData,
       headers :AUTH_TOKEN
    })

    let Body = await updatedResponse.json();
    console.log(Body);
    console.log(updatedResponse.status());
    console.log(updatedResponse.statusText());

    expect(updatedResponse.status()).toBe(200);
    expect(updatedResponse.statusText()).toBe('OK');

});

test('delete user in put api', async({request})=>{
   
    let deleteResponse=await request.delete('https://gorest.co.in/public/v2/users/8665254',{
        headers :AUTH_TOKEN,
        
    })

    //let Body = await deleteResponse.json();
    //console.log(Body);
    console.log(deleteResponse.status());
    console.log(deleteResponse.statusText());

    expect(deleteResponse.status()).toBe(204);
    expect(deleteResponse.statusText()).toBe('No Content');

})