export default () =>{

    const usePostTweetModal=()=> useState('post_tweet_modal', ()=>false)
    const useReplyTweet =()=> useState('reply_tweet', ()=> null)

    const closePostTweetModal =()=>{
        const postTweetModal = usePostTweetModal()
        postTweetModal.value = false
    }

    const setReplyTo = (tweet) =>{
            const replyTweet = useReplyTweet()
            replyTweet.value = tweet
    }

    const openPostTweetModal =(tweet)=>{
        const postTweetModal = usePostTweetModal()
        postTweetModal.value = true

        setReplyTo(tweet)
    }

    const postTweet = (formData) =>{
        const form = new FormData()

        form.append('text', formData.text)
        console.log('from compoasable useTweet.js',formData);
        // form.append('replyTo',formData.replyTo)

        // yo 12 hexa number id ko place ma 9 number matra aayo vanera error aako hunale
         if(formData.replyTo !== undefined){
            console.log('this is formdata.repyTo',formData.replyTo);
            form.append('replyTo',formData.replyTo)
         }


        formData.mediaFiles.forEach((mediaFile,index) => {
            form.append('media_file_' + index, mediaFile)
        });

        return useFetchApi('/api/user/tweets', {
            method: 'POST',
            body: form
        })
    }


    const getTweets =  (params = {}) =>{
        return new Promise( async (resolve, reject)=>{
            try {
                const response = await useFetchApi('/api/tweets',{
                    method: 'GET',
                    params
                })

                resolve(response)
            } catch (error) {
                reject(error);
            }
        })
    }

    const getTweetById = (tweetId)=>{
        return new Promise(async (resolve, reject)=>{
            try {
                const response = await useFetchApi(`/api/tweets/${tweetId}`)

                resolve(response)
            } catch (error) {
                reject(error)
            }
        })
    }

    return {
        postTweet,
        getTweets,
        getTweetById,
        closePostTweetModal,
        usePostTweetModal,
        openPostTweetModal,
        useReplyTweet
    }

}