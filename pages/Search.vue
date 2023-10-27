<template>
    <div>
        <MainSection title="Home" :loading="loading">
            <!-- {{ user }}   -->
            <Head>
                <Title>Search</Title>
            </Head>
            

            <Tweet-ListFeed :tweets="searchTweets"/>
        </MainSection>
    </div>    

</template>
<script setup>
    const loading = ref(false)
    const searchTweets = ref([])

    const {getTweets} = useTweets()
    const searchQuery =  useRoute().query.q

    
    onBeforeMount(async ()=>{

        loading.value = true
        
        try {
            const {tweet} = await getTweets({
                query: searchQuery
            })

            searchTweets.value = tweet
        } catch (error) {
            console.log('on Before mount', error);
        } finally{
            loading.value = false
        }
        })

    watch(()=> useRoute().fullPath, ()=> getTweet() ) 

</script>