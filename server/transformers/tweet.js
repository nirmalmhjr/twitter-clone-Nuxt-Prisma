import { mediaFilesTransformer } from "./mediaFiles"
import { userTransformer } from "./users"
import human from 'human-time'

export const tweetTransformer = (tweet) =>{
    return {
        id: tweet.id,
        text: tweet.text,
        mediaFiles: !!tweet.mediaFiles ? tweet.mediaFiles.map(mediaFilesTransformer) : [] ,
        author: !!tweet.author ? userTransformer(tweet.author) : null,
        replies: !!tweet.replies ? tweet.replies.map(tweetTransformer) : [],
        replyTo: !!tweet.replyTo ? tweetTransformer(tweet.replyTo)  : null,
        replyCount: !!tweet.replies ? tweet.replies.length : 0,
        // createdAt: tweet.createdAt,
        postedAtHuman: human(tweet.createdAt)
    }
}

