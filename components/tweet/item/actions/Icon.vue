<template>
    <div @click.stop.prevent="emits('onClick')" class="flex items-center text-gray-400 cursor-pointer group" >
        <div :class="`p-2 rounded-full group-hover:bg-${props.color}-100 group-hover:text-${props.color}-400 dark:group-hover:bg-opacity-20 ${defaultTransition}`" >
            <!-- <Icon name="heroicons:chat-bubble-oval-left-ellipsis-20-solid" size="25" /> -->

            <slot name="icon" :class="`w-${props.size} h-${props.size}`" />

        </div>
        <span :class="`ml-1 group-hover:text-${props.color}-400  `">
            <slot name="default"></slot>
        </span>
    
    </div> 

</template>

<script setup>
// import { defineProps } from 'vue'

    const { defaultTransition } = useTailwindConfig()

   const props = defineProps({
    color:{
        type: String,
        required: true
    },
    size:{
        type: String,
        default: "5" 
    }
   })

   const emits =  defineEmits(['onClick'])
</script>
