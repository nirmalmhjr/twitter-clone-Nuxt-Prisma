<template>
    <div class="flex flex-col">
        <!-- Preview card : What's Happening -->
        <sidebar-Right-PreviewCard title="What's Happening">
            <sidebar-Right-PreviewCard-Item v-for="whatsHappening in whatsHappeningItems" :key="whatsHappening">
                <div>
                    <h1 class="font-bold text-gray-800 text-md dark:text-white">{{ whatsHappening.title }}</h1>
                    <p class="text-xs text-gray-400 dark:text-white">{{ whatsHappening.count }}</p>
                </div>
            </sidebar-Right-PreviewCard-Item>

        </sidebar-Right-PreviewCard>
        
        <!-- Preview card : Who to follow -->
        <sidebar-Right-PreviewCard title="Who to follow">
            <sidebar-Right-PreviewCard-Item v-for="whoToFollow in whoToFollowItems" :key="whoToFollow">
                <div class="flex flex-row justify-between p-2 items-center">
                    <div class="flex flex-row">
                        <img class="w-10 h-10 rounded-full" :src="whoToFollow.image" :alt="whoToFollow.name">
                        <div class="flex flex-col ml-2">
                            <h1 class="text-sm font-bold text-gray-900">{{ whoToFollow.name }}</h1>
                            <p class="text-xs text-gray-400">{{ whoToFollow.handle }}</p>
                        </div>
                    </div>
                    <div class="flex  h-full ">
                        <button class="px-4 py-2 font-bold text-xs bg-black text-white dark:bg-white dark:text-black rounded-full">Follow</button>
                    </div>
                </div>
            </sidebar-Right-PreviewCard-Item>

        </sidebar-Right-PreviewCard>

    </div>

</template>
<script setup>

     const whatsHappeningItems = ref([
        {
        title: 'SpaceX',
        count: '18.8k Tweets'
    },{
        title:'#CodingIsFun',
        count: '8.8k Tweets'
    },
    {
        title:'#artorall',
        count:'1.8k Tweets'
    }
    ])

    const whoToFollowItems= ref([
        {
            name:'Joe Biden',
            handle: '@JoeBiden',
            image: 'https://picsum.photos/200'
        },
        {
            name:'Joe Biden',
            handle: '@JoeBiden',
            image: 'https://picsum.photos/200'
        },
        {
            name:'Joe Biden',
            handle: '@JoeBiden',
            image: 'https://picsum.photos/200'
        },
        {
            name:'Joe Biden',
            handle: '@JoeBiden',
            image: 'https://picsum.photos/200'
        },
    ])

</script>