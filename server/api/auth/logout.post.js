import { removeRefreshToken } from "../../db/refreshTokens"

export default defineEventHandler(async (event)=>{

    try {
        const cookies = useCookies(event)
        const refreshToken = cookies.refresh_token

        //remove Refresh Token
        removeRefreshToken(refreshToken)
    } catch (error) {
        
    }

    sendRefreshToken(event, null)

    return{
        message: "Done"
    }
})