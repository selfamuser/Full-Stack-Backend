import {v2 as cloudinary} from 'cloudinary';
import fs from "fs";


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const uploadOnCloudinary = async (localFilePath) =>{

    try {

        if(!localFilePath){
            return null;
        }

        //it uploads the file to the cloudinary
        const response = await cloudinary.v2.uploader.upload(localFilePath,{
            resource_type : "auto"
        })

        console.log("File has been uploaded successfully",
        response.url);
        return response
        
    } catch (error) {

        //it removes locally saved temporary file since the upload operation failed
        fs.unlinkSync(localFilePath) 
        return null;
    }


}