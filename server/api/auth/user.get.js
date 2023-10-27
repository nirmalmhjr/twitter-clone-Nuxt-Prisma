import { userTransformer } from "../../transformers/users"

export default defineEventHandler(async(event)=>{


    return{
        user: userTransformer(event.context.auth?.user)   
    }
})  


