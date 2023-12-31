import UrlPattern from "url-pattern"
import { decodeAccessToken } from "../utils/jwt"
import { sendError } from "h3"
import { getUserById } from "../db/users"

export default defineEventHandler(async (event)=>{

    const endPoints = [
        '/api/auth/user',
        '/api/user/tweets',
        '/api/tweets',
        '/api/tweets/:id'
    ]

    const isHandledByThisMiddleware = endPoints.some(endPoint =>{
        const pattern = new UrlPattern(endPoint)
        return pattern.match(event.req.url)
    })

    if(!isHandledByThisMiddleware){
        return
    }
    
    const token = event.req.headers['authorization']?.split(' ')[1]
    // console.log('"token from middleware folder auth.js"', token);
    const decoded = decodeAccessToken(token)

    if(!decoded){
        return sendError(event, createError({
            statusCode: 401,
            statusMessage:'Unauthorized'
        }))
    }

    try {
        const userId = decoded.userId

        const user = await getUserById(userId)

        event.context.auth = {user}


    } catch (error) {   
        return
    }
    
})
