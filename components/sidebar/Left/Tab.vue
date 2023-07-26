<template>
    <NuxtLink to="#" class="flex items-center hover:bg-gray-200 rounded-full w-min p-3 dark:hover:bg-dim-200 dark:text-white " :class="defaultTransition">
        <div class="w-6  h-8 text-dark " >
            <slot name="icon" />
        </div>
        <div class="ml-4 text-xl hidden sm:block" >
            <slot name="name"/>
        </div>
    </NuxtLink>

</template>
<script setup>
    const {defaultTransition} = useTailwindConfig()

    const props = defineProps({
        active:{
            type: Boolean,
            default: false
        }
    })

    const textClasses = computed(()=> props.active ? 'font-semibold' : 'font-normal')

</script>