<template>
  <div :class="{'dark': darkMode }">
    <div class="bg-white dark:bg-dim-900">

      <LoadingPage v-if="isAuthLoading"/>

        <!--  App -->
      <div v-else-if="user" class="min-h-full">
        <div class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-5">
          <!-- Left Sidebar -->
          <div class="hidden md:block xs:col-span-1 xl:col-span-2">
            <div class="sticky top-0">
              <sidebar-Left :user="user" @onTweet="handleOpenTweetModal" @onLogout="handleUserLogout"/>
            </div>
            
          </div>

          <!-- Main Content -->
          <main class="   col-span-12 md:col-span-8 xl:col-span-6">
            <router-view/>

          </main>

          <!-- Right Sidebar -->
          <div class="hidden col-span-12   md:block md:col-span-3 xl:col-span-4">
            <div class="sticky top-0">
              <sidebar-Right />
            </div>
          </div>
        
        </div>  

      </div>

      
        <Page v-else/>
      

        <UI-Modal :isOpen="postTweetModal" @onClose="handleModalClose">
          <!-- {{ replyTweet }} -->
          <Tweet-Form
            :user="user"
            @on-success="handleFormSuccess"
            :replyTo="replyTweet"
            showReply
          />
        </UI-Modal>
    </div>
  </div>
</template>

<script setup>
  import Page from './components/Auth/Page.vue'

  const darkMode = ref(false)

  const { useAuthUser, initAuth, useAuthLoading, logout  } = useAuth()
  const {closePostTweetModal, usePostTweetModal, openPostTweetModal, useReplyTweet  } = useTweets()
  const user = useAuthUser()
  const isAuthLoading = useAuthLoading()
  const postTweetModal = usePostTweetModal()
  const emitter = useEmitter()
  const replyTweet = useReplyTweet()

  onBeforeMount(()=>{
    initAuth()
  })

  emitter.$on('replyTweet', (tweet)=>{
    openPostTweetModal(tweet)
  })

  emitter.$on('toggleDarkMode',()=>{
    darkMode.value= !darkMode.value
  })
  function handleFormSuccess(tweet){
      closePostTweetModal()
      
      navigateTo({
                path:`/status/${tweet.id}`
            })
        }

function handleModalClose(){
    closePostTweetModal()
}

function handleOpenTweetModal(){
  openPostTweetModal(null)
}

function handleUserLogout(){
  logout()
}
</script>