import {test as baseTest} from '@playwright/test'
import { ApiHelper } from '../api/ApiHelper'
import process from 'node:process'

//define type for API fixtures:

type APIFixtures= {
    apiHelper:ApiHelper
}

export let test=baseTest.extend<APIFixtures>({
    apiHelper:async({request}, use)=>{
            let apiHelper = new ApiHelper(request,process.env.API_BASE_URL!);
            await use(apiHelper);
        }
})

export {expect} from '@playwright/test'