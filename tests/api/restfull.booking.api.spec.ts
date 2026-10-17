import process from 'node:process'
import {test, expect} from '../../src/fixtures/apifixture'

const TOKEN = process.env.API_TOKEN;

let AUTH_HEADER = {
    Authorization : `Bearer ${TOKEN}`
};

let ID: number;


test.describe.serial('running e2e gorest crud apis test', () => {
    test(`GET API- get all booking ids`, async({apiHelper}) => {
        let response = await apiHelper.get('', AUTH_HEADER);
            expect(response.status).toBe(200);
    })

    let testData = {
        "id": 10,
    "title": "string data",
    "dueDate": "2026-10-13T13:05:35.227Z",
    "completed": true
    }
    test(`post api- create activities api`, async({apiHelper}) => {
        let response = await apiHelper.post('', testData);
            expect(response.status).toBe(200);
    })

    test(`put api- create activities api`, async({apiHelper}) => {
        let updatedData = {
            "id": 10,
            "title": "sdata",
            "dueDate": "2026-09-13T13:05:35.227Z",
            "completed": true 
        }
        let response = await apiHelper.put('/${ID}',updatedData);
            expect(response.status).toBe(200);
    })

    test(`Delete api- create activities api`, async({apiHelper}) => {
        
        let response = await apiHelper.delete('/${ID}');
            expect(response.status).toBe(200);
    })

})