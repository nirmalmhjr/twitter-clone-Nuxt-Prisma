<template>
    <div>
        <Tweet-Item :tweet="props.tweet"/>

        <Tweet-Form placeholder="Tweet your reply" :user="props.user" :replyTo="props.user" @on-success="handleFormSuccess"/>

        <Tweet-ListFeed :tweets="replies"/>
    </div>
</template>

<script setup>
    const props = defineProps({
        tweet:{
            type:Object,
            required: true
        },
        user:{
            type:Object,
            required: true
        },
        
    })
    console.log(props.tweet);

    const replies = computed(()=> props.tweet?.replies || [])

    function handleFormSuccess(tweet){
        navigateTo({
            path: `/status/${tweet.id}`
        })
    }

</script>


