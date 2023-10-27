import { useCookie } from "nuxt/app"
import { sendError } from "h3"
import { getRefreshTokenByToken } from "../../db/refreshTokens"
import {decodeRefreshToken, generateTokens} from '../../utils/jwt' 
import { getUserById } from "../../db/users"
import { access } from "fs"

export default defineEventHandler (async (event)=>{
    const cookies = parseCookies(event)
    const refreshToken = cookies.refresh_token

    if(!refreshToken){
        return sendError(event, createError({
            statusCode:401,
            statusMessage: 'Refresh121 Token is not valid'
        }))
    }
    
    // for checking whether refreshToken is available in database
    const rToken = await getRefreshTokenByToken(refreshToken)
    
    if(!rToken){
        return sendError(event,createError({
            statusCode:401,
            statusMessage: 'Refresh Token is not valid'
        }))
    }

    const token = decodeRefreshToken(refreshToken)
    // console.log('token after decodeRefreshToken',token);

    try {
        // for getting access to user
        const user = await getUserById(token.userId)
        // console.log('FROM refresh.get.js',user);

        const { accessToken }= generateTokens(user)
        
        return {
            access_Token : accessToken
        }
    } catch (error) {
        return sendError(event, createError({
            statusCode:500,
            statusMessage: 'Something went wrong while regenerating Refresh_Token'
        }))
    }
    
     
})