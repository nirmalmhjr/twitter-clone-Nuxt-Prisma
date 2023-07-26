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
        </div>
    </div>

</template>
<script setup>
    const {defaultTransition} = useTailwindConfig()

</script>