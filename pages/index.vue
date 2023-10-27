<template>
    <div>
        <MainSection title="Home" :loading="loading">
            <!-- {{ user }}   -->
            <Head>
                <Title>Twitter/Home</Title>
            </Head>
            <div class="border-b" :class="twitterBorderColor">
                <Tweet-Form :user="user" @on-success="handleFormSuccess"/>
            </div>

            <Tweet-ListFeed :tweets="homeTweets"/>
        </MainSection>
    </div>    

</template>
<script setup>
    const loading = ref(false)

    const {twitterBorderColor} = useTailwindConfig()
    const {useAuthUser} = useAuth()
    const user = useAuthUser()

    const homeTweets = ref([])

    const {getTweets} = useTweets()

    onBeforeMount(async ()=>{
        loading.value = true
        
        try {
            const {tweet} = await getTweets()
            
            homeTweets.value = tweet
        } catch (error) {
            console.log('on Before mount',error);
        } finally{
            loading.value = false
        }
        })

        function handleFormSuccess(tweet){
            navigateTo({
                path:`/status/${tweet.id}`
            })
        }

</script>