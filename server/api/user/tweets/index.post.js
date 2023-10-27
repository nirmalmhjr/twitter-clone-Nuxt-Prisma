import formidable from "formidable"
import { createTweet } from "../../../db/tweets"
import { tweetTransformer } from "../../../transformers/tweet"
import { createMediaFile } from   "../../../db/mediaFiles"
import { uploadToCloudinary } from "../../../utils/cloudinary"

export default defineEventHandler(async (event)=>{

    const form = formidable({})

    const response = await new Promise((resolve, reject)=>{
        form.parse(event.req, (err, fields, files)=>{
            if(err){
                reject(err)
                // console.log(err);
            } else {
                resolve({ fields,files })
            }
        })
    })

    // console.log('resopnse from response is', response.files);

    const { fields, files } = response

    // console.log('from index.post.js',response);
    
    // to get userID
    const userId =  event.context?.auth?.user?.id

    //convert fields object array into strings
    function arrayToString(data){
        return JSON.stringify(data)
    }


    const tweetData = {
        text : arrayToString(fields.text),
        authorId : userId,
        // replyToId: arrayToString(fields.replyToId)
    }

    const replyTo = fields.replyTo

    console.log('this is replyTo', replyTo);

    // if(replyTo && replyTo !== 'null' && replyTo !== 'undefined'){
    if(replyTo && replyTo !== 'null' ){
        const reply = replyTo.join('')
        // tweetData.replyToId  = replyTo.join('')
        tweetData.replyToId  = reply
    }


    console.log(replyTo);

    const tweet = await createTweet(tweetData)


    const filePromises = Object.keys(files).map( async key =>{
        console.log('from index.post.js filepromises',key);
        const file = files[key]

        const cloudinaryResource = await uploadToCloudinary(file[0].filepath)
        
        // console.log('"cloudinary response after uploadToCloudinary"',cloudinaryResource);
        return createMediaFile({
            url:cloudinaryResource.url,
            providerPublicId: cloudinaryResource.public_id,
            tweetId: tweet.id,
            userId: userId
        })
    })

    // console.log('"cloudinaryResource ::::"',filePromises);
    
    await Promise.all(filePromises)
    console.log('file promises form Index.post.js', filePromises);
    return{
        tweet: tweetTransformer(tweet)  
        // cloudinaryResource_Response: filePromises
    }
})