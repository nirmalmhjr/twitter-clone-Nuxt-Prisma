import { getUserByUsername } from "../../db/users"
import bcrypt from "bcrypt"
import { generateTokens, sendRefreshToken } from "../../utils/jwt"
import { userTransformer } from "../../transformers/users"
import { createReadStream } from "fs"
import {createRefreshToken} from "../../db/refreshTokens"

export default defineEventHandler(async (event) =>{
    const body = await readBody(event)

    const {username, password} = body

    if(!username || !password){
        return sendError(event, createError({
            statusCode:400, statusMessage:'Invalid Params'
        }))
    }

    //is the username registered
    const user = await getUserByUsername(username)

    if(!user){
        return sendError(event, createError({
            statusCode:400, statusMessage:'Username or Password do not match'
        }))
    }

    //is the password correct
    const doesThePasswordMatch = await bcrypt.compare(password, user.password)

    if(!doesThePasswordMatch){
        return sendError(event, createError({
            statusCode:400, statusMessage:'Username or Password do not match'
        }))
    }

    //generate tokens   

    //access token
    //refresh token
    const {accessToken, refreshToken} =  generateTokens(user)

    //save it in db
    await createRefreshToken({
        token: refreshToken,
        userId: user.id
    })

    //Add http only cookie
    sendRefreshToken(event, refreshToken)



    return{
        // body: user, doesThePasswordMatch,
        access_token: accessToken,
        
        user: userTransformer(user)
        
        }
})

