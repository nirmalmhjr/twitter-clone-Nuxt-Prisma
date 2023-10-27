<template>
    <div class=" h-screen flex flex-col">
        <div class="p-2 my-2 hover:bg-blue-50 rounded-full w-min dark:hover:bg-white/20" 
            :class="defaultTransition">
            <NuxtLink to="/">
                <div class="w-8 h-8">
                    <logo-Twitter />
                </div>
            </NuxtLink>
        </div>

        <div class="mt-2 space-y-3">
            <Sidebar-Left-Tab active>
                <template v-slot:icon>
                    <Icon name="material-symbols:home" size="30" />
                </template>
                <template v-slot:name>
                    Home
                </template>
            </Sidebar-Left-Tab>
            <Sidebar-Left-Tab >
                <template v-slot:icon>
                    <Icon name="heroicons:hashtag" size="30" />
                </template>
                <template v-slot:name>
                    Explore
                </template>
            </Sidebar-Left-Tab>
            <Sidebar-Left-Tab >
                <template v-slot:icon>
                    <Icon name="heroicons:bell" size="30" />
                </template>
                <template v-slot:name>
                    Inbox
                </template>
            </Sidebar-Left-Tab>
            <Sidebar-Left-Tab >
                <template v-slot:icon>
                    <Icon name="heroicons:inbox" size="30" />
                </template>
                <template v-slot:name>
                    Messages
                </template>
            </Sidebar-Left-Tab>
            <Sidebar-Left-Tab >
                <template v-slot:icon>
                    <Icon name="heroicons:bookmark" size="30" />
                </template>
                <template v-slot:name>
                    Bookmarks
                </template>
            </Sidebar-Left-Tab>
            <Sidebar-Left-Tab >
                <template v-slot:icon>
                    <Icon name="heroicons:document-text" size="30" />
                </template>
                <template v-slot:name>
                    Lists
                </template>
            </Sidebar-Left-Tab>
            <Sidebar-Left-Tab >
                <template v-slot:icon>
                    <Icon name="heroicons:user" size="30" />
                </template>
                <template v-slot:name>
                    Profile
                </template>
            </Sidebar-Left-Tab>
            <Sidebar-Left-Tab >
                <template v-slot:icon>
                    <Icon name="heroicons:ellipsis-horizontal-circle" size="30" />
                </template>
                <template v-slot:name>
                    More
                </template>
            </Sidebar-Left-Tab>

            <div class="hidden xl:block" @click="emits('onTweet')">
                <UI-Button size="lg" liquid >
                    <span class="font-bold">Tweet</span>
                </UI-Button>
            </div>
            <div class="block xl:hidden" @click="emits('onTweet')">
                <UI-Button>
                    <div class="w-6 h-6 font-bold ">
                        <Icon name="material-symbols:edit-outline" size="30" />
                    </div>
                </UI-Button>
            </div>
        </div>
        
        <div
          :class="defaultTransition"
          class="flex flex-row items-center justify-center px-2 py-2 mx-auto mt-auto mb-5 rounded-full cursor-pointer w-14 xl:w-full hover:bg-gray-100 dark:hover:bg-dim-800"
          @click="emits('onLogout')"
        >
            <div class="flex flex-row">
                <img :src="props.user.profileImage" class="w-10 h-10 rounded-full">
                <div class="flex-col hidden ml-2 xl:block">
                    <h1 class="flex-col hidden ml-2 xl:block">
                        {{ props.user.name }}
                    </h1>
                    <p class="text-sm text-gray-400">
                        {{ props.user.handle }}
                    </p>
                </div>
            </div>
            <div class="hidden ml-auto xl:block">
                <div class="w-6 h-6">
                     <Icon name="heroicons:chevron-down" size="25" />
                </div>
    
            </div>
        </div>

    </div>
</template>
<script setup>
    const {defaultTransition} = useTailwindConfig()

    const emits = defineEmits(['onTweet','onLogout'])
    const props = defineProps({
        user: {
            type: Object,
            required: true
        }
    })

</script>