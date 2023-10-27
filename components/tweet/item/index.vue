
import { url } from 'inspector';

import { tweetTransformer } from 'server/transformers/tweet';

import { tweetTransformer } from 'server/transformers/tweet';
<template>
    <div>

        <Tweet-Item-Header :tweet="props.tweet"/>

        <div :class="tweetBodyWrapper">
            <p class="flex-shrink w-auto font-medium text-gray-800 dark:text-white" :class="textSize">
                {{ props.tweet.text }}
            </p>
            <div v-for="image in props.tweet.mediaFiles" :key="image"
                class="flex my-3 mr-2 border-2 rounded-2xl" :class="twitterBorderColor">
                <img :src="image.url" alt="" class="w-full rounded-2xl">
            </div>
        </div>

        <!-- Action button -->
        <div class="mt-2 ml-16" v-if="!props.hideActions">
            <Tweet-Item-Actions @onCommentClick="handleCommentClick" :tweet="props.tweet" :compact="props.compact"/>
        </div>


    </div>
</template>

<script setup>
    const props = defineProps({
        tweet: {
            type: Object,
            required: true
        },
        compact:{
            type: Boolean,
            default: false
        },
        hideActions:{
            type: Boolean,
            default: false
        }
    })


    const { twitterBorderColor }= useTailwindConfig()
    const emitter = useEmitter()    
    // for differencing margin in tweet comments
    const tweetBodyWrapper = computed(()=> props.compact ? 'ml-16' : 'ml-2 mt-4')
    // for tweeted text size
    const textSize = computed(()=>props.compact ? 'text-base' : 'text-2xl')

    function handleCommentClick(){
        emitter.$emit('replyTweet', props.tweet)
    }
</script>

