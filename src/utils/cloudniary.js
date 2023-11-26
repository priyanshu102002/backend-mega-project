import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDNIARY_CLOUD_NAME,
    api_key: process.env.CLOUDNIARY_API_KEY,
    api_secret: process.env.CLOUDNIARY_SECRET_KEY,
});

const uploadOnCloudniary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;
        // uploading file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto"
        })
        // File has been uploaded
        fs.unlinkSync(localFilePath) //remove the locally saved temporary files as the upload operations got completed
        return response
    } catch (error) {
        //remove the locally saved temporary files as the upload operations got failed
        fs.unlinkSync(localFilePath) 
        return null
    }
}

export {uploadOnCloudniary}