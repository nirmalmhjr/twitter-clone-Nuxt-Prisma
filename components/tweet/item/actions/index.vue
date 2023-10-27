<template>
    <div class="flex items-center justify-around w-full">

        <Tweet-Item-Actions-Icon @onClick="emits('onCommentClick')" color="blue" >
            <template v-slot:icon="{ classes }">
                <Icon name="heroicons:chat-bubble-oval-left-ellipsis" :size="size"  :class="classes"/>
            </template>
            <template v-if="showStats" v-slot:default>
                {{ props.tweet.repliesCount }}
            </template>
        </Tweet-Item-Actions-Icon>
        
        <Tweet-Item-Actions-Icon  color="green">
            <template v-slot:icon="{ classes }">
                <Icon name="tabler:refresh" :size="size"  :class="classes"/>
            </template>
            <template v-if="showStats" v-slot:default>
                {{generateRandomNumber()}}
            </template>
        </Tweet-Item-Actions-Icon>

        <Tweet-Item-Actions-Icon  color="red">
            <template v-slot:icon="{ classes }">
                <Icon name="heroicons:heart" :size="size"  :class="classes"/>
            </template>
            <template v-if="showStats" v-slot:default>
                {{generateRandomNumber()}}
            </template>
        </Tweet-Item-Actions-Icon>
        <Tweet-Item-Actions-Icon  color="blue">
            <template v-slot:icon="{ classes }">
                <Icon name="heroicons:arrow-up-tray" :size="size"  :class="classes"/>
            </template>
            <template v-if="showStats" v-slot:default>
                {{generateRandomNumber()}}
            </template>
        </Tweet-Item-Actions-Icon>
    </div>
</template>

<script setup>
    const props = defineProps({
        tweet:{
            type: Object,
            required: true
        },
        compact:{
            type: Boolean,
            default: false
        }
    })

    // console.log('Props tweet is ',props.tweet.replies);

    function generateRandomNumber(){
        return Math.floor(Math.random()*100)
    }
    //for showing number/stats of tweet, like share upload , if false donot show
    const showStats = computed (()=> props.compact)

    // for changin size on the basis of compact
    const size = computed(()=>props.size? "20" : "25")

    const emits = defineEmits(['onCommentClick'])
</script>
