import jwt_decode from 'jwt-decode'
// import jwtDecode from "jwt-decode"

export default () =>{
    const useAuthToken = () => useState('auth_token')
    const useAuthUser = () => useState('auth_user')
    const useAuthLoading = () => useState('auth_loading', () => true)

    const setToken = (newToken) =>{
        const authToken = useAuthToken()
        authToken.value = newToken
        // console.log('set Token vlaue', authToken.value);
    }

    const setUser = (newUser) =>{
        const authUser = useAuthUser()
        authUser.value = newUser
        // console.log('set_user is', authUser.value); 
    }

    const setIsAuthLoading = (value) =>{
        const authLoading =  useAuthLoading()
        authLoading.value = value
    }

    const login = ({username, password}) =>{
        return new Promise(async(resolve, reject)=>{
            try {
                const  data  = await $fetch('/api/auth/login',{
                    method:'POST',
                    body: {
                        username,
                        password
                    }
                })

                setToken(data.access_token)
                setUser(data.user)

                console.log('from login useAuth.js',data);
                resolve(true)   
            } catch (error) {
                reject(error);
            }
        })
    }

    const refreshToken = ()=>{
        return new Promise( async (resolve, reject)=>{
            try {
                const data = await $fetch('/api/auth/refresh')

                setToken(data.access_Token)
                // console.log('after refreshtoken function',data.access_Token);

                resolve(true)
            } catch (error) {
                reject(error)
            }
        })
    }

    const getUser = ()=>{
        return new Promise(async(resolve, reject)=>{
            try {
                const data = await useFetchApi('/api/auth/user')
                
                setUser(data.user)
                console.log('after UseFetchAPI access token is ', data.access_Token);
                
                console.log('from getUser in useAuth.js', data);
                resolve(true)
            } catch (error) {
                reject(error)
            }
        })
    }

    //recreating Refressh Token after certian time,, As refresh Token is to renew as per protocol
    const reRefreshAccessToken = () =>{
        const auth_token = useAuthToken()
        console.log('receiving in reRefreshAccesstoken is ',auth_token);

        if(!auth_token.value){
            return
            // console.log('no auth token value');
        }
        console.log('reRefresh is activating');
        const jwt =  jwt_decode(auth_token.value)
        console.log('jwt is ',jwt);

        const newRefreshTime = jwt.exp - 60000

        setTimeout(async ()=>{
            await refreshToken()
            reRefreshAccessToken()
            console.log('auth token value is ',auth_token.value);
        }, newRefreshTime)

    }
    
    //everytime page refresh or if refresh token expires, for re-authorization or validation
    const initAuth = () =>{
        return new Promise(async (resolve, reject)=>{
            setIsAuthLoading(true)
            try {
                // alert('initAuth is triggered')
                await refreshToken()
                await getUser()

                reRefreshAccessToken()

                resolve(true)
            } catch (error) {
                reject(error)
            }
            finally{
                setIsAuthLoading(false)
            }
        })
    }

    const logout = () =>{
        return new Promise( async(resolve,reject)=>{
            try {
                   await useFetchApi('/api/auth/logout',{
                    method:'POST'
                   })

                    setToken(null)
                    setUser(null)
                    resolve()
            } catch (error) {
                reject(error)
            }
        })
    }

     return{
        login,
        useAuthUser,
        useAuthToken,
        initAuth,
        useAuthLoading,
        logout
     }  
}