<template>
    <div class="flex flex-col">
        <!-- Search bar -->
        <div class="relative m-2">
            <div class="absolute flex items-center h-full pl-4 text-gray-400 cursor-pointer">
                <div class="w-6 h-6">
                    <Icon name="heroicons:magnifying-glass" size="25" @click="handleSearch"/>
                </div>
            </div>
            <input
              type="text"
              class="flex items-center w-full pl-12 text-sm font-normal text-dark dark:text-gray-100 bg-gray-200 border border-r-gray-200 rounded-full shadow dark:bg-dim-400 dark:border-dim-400 focus:bg-gray-100 dark:focus:bg-dim-900 focus:outline-none focus:border focus:border-blue-200 h-9"
              placeholder="Search tweet"
              v-model="search"
            >

        </div>

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

        <footer>
            <ul class="mx-2 my-4 text-xs text-gray-500">
                <li class="inline-block mx-2"> 
                    <a href="#" class="hover:underline" @click.prevent="handleToggleDarkMode">Dark mode</a>
                </li>
                <li class="inline-block mx-2"> 
                    <a href="#" class="hover:underline">Privacy Policy</a>
                </li>
                <li class="inline-block mx-2"> 
                    <a href="#" class="hover:underline">Cookie Policy</a>
                </li>
                <li class="inline-block mx-2"> 
                    <a href="#" class="hover:underline">Accessability</a>
                </li>
                <li class="inline-block mx-2"> 
                    <a href="#" class="hover:underline">Ads info</a>
                </li>
                <li class="inline-block mx-2"> 
                    <a href="#" class="hover:underline">More</a>
                </li>
                <li class="inline-block mx-2"> 
                    &copy;  2022 Twitter, Inc
                </li>
            </ul>
            
        </footer>

    </div>

</template>
<script setup>
    const emitter = useEmitter()

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

    const search = ref('')
     
     function handleSearch(){
        useRouter().push({
            path:'/search',
        query:{
            q: search.value
        }
        })
     }

     function handleToggleDarkMode(){
        emitter.$emit('toggleDarkMode')
     }
</script>