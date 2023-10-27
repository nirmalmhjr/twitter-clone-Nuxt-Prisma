import { getTweets } from "../../db/tweets"
import { tweetTransformer } from "../../transformers/tweet"

export default defineEventHandler( async (event)=>{
    const  {query}  = getQuery(event)

    // const tweets = await getTweets({
    //     include:{
    //         mediaFiles: true,
    //         author: true,
    //         replies: {
    //             include: {
    //                 author: true
    //             }
    //         },
    //         replyTo:{
    //             include:{
    //                 author: true
    //             }
    //         }
    //     },
    //     orderBy:[
    //         {
    //             createdAt: 'desc'
    //         }
    //     ]
        
    // })
  
    let primsaQuery = {
        include:{
            mediaFiles: true,
            author: true,
            replies: {
                include: {
                    author: true
                }
            },
            replyTo:{
                include:{
                    author: true
                }
            }
        },
        orderBy:[
            {
                createdAt: 'desc'
            }
        ]
    }

    if(!!query ){
         primsaQuery = {
            ...primsaQuery,
                where: {
                    text:{
                        contains: query
                    }
                }
         }
    }

    const tweets = await getTweets(primsaQuery)

    return{
        // tweet:  tweets.map(tweet => tweetTransformer(tweet))
        // query        

        // primsaQuery
        tweet:  tweets.map(tweetTransformer)
    }
})

