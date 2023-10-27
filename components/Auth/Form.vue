<template>
    <div class="w-full"> 
        <div class="flex justify-center">
            <div class="w-10 h-10">
                <LogoTwitter />
            </div>
        </div>

        <div class="pt-6 space-y-6">

            <UI-Input  label="Username" placeholder="@username" v-model="data.username"/>
            <UI-Input  label="Password" placeholder="***********" type="password" v-model="data.password"/>
            <!-- <h2>username is {{ data.username }}</h2> -->
            <!-- <h2>password is {{ data.password }}</h2> -->

            <UI-Button @click="handleLogin" :disabled="isButtonDisabled" liquid>
                Login
            </UI-Button>
            
        </div>
    </div>
</template>

<script setup>


    const data = reactive({
        username:'',
        password:'',
        loading: false
    })

    const  handleLogin = async () =>{
        data.loading = true
        const  {login}  = useAuth()

        try {
            await login({
                username: data.username,
                password: data.password
            })
        } catch (error) {
            console.log(error);
        } finally{
            data.loading = true
        }

    }

    const isButtonDisabled = computed(()=>{
        return (!data.username || !data.password) || data.loading 
    })
</script>
