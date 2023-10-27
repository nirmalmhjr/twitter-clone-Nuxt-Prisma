<template>
    <div>
        <div v-if="loading" class="flex items-center justify-center p-6">
            <UISpinner />
        </div>
        <div v-else>
            <Tweet-Item :tweet="props.replyTo" v-if="props.replyTo && props.showReply" hideActions/>
            <Tweet-Form-Input :user="props.user" @onSubmit="handleFormSubmit" :placeholder="props.placeholder"/>
        </div>

    </div>
</template>

<script setup>
    const emits = defineEmits(['on-success'])
    const loading = ref(false)
    const { postTweet } = useTweets()

    const props= defineProps({
        user: {
            type: Object,
            required: true
        },
        placeholder:{
            type: String,
            default:"What's happening ?"
        },
        replyTo:{
            type: Object,
            default: null
        },
        showReply:{
            type: Boolean,
            default: false
        }
    })

    async function handleFormSubmit(data){
        loading.value = true
        try {
            const response = await postTweet({
                text: data.text,
                mediaFiles: data.mediaFiles,
                replyTo: props.tweet?.id //this is object of tweet not a single string
                
            })
            // alert(JSON.stringify(response))
            emits('on-success', response.tweet)
        } catch (error) {
            console.log(error);
        } finally{
            loading.value = false
        }

    }


</script>

