import { v2 as _cloudinary } from "cloudinary"


const cloudinary = () => {
    const config = useRuntimeConfig()

    _cloudinary.config({
        cloud_name: config.cloudinaryCloudName,
        api_key: config.cloudinaryApiKey,
        api_secret: config.cloudinaryApiSecret
    })

    return _cloudinary
}

export const uploadToCloudinary = (image) => {
    console.log('"This is image from uploadToCloudinary"',image);
    return new Promise((resolve, reject) => {
        cloudinary().uploader.upload(image, (error, data) => {
            if (error) {
                // console.log('Error uploading image to Cloudinary:', error);
                reject(error)
            }else{
                // console.log('Image successfully upload to Cloudinary', data);
                resolve(data)
            }
        })
        // console.log('"file.filePath from cloudinary_UPLOADTOCLOUDINARY"',image)
    })
}