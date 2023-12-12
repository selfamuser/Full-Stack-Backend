import {v2 as cloudinary} from 'cloudinary';
import fs from "fs"; //class to utilise file system 


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
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type : "auto" //this is use to auto detect type of file.
        })

        // console.log("File has been uploaded successfully",
        // response.url);
        fs.unlinkSync(localFilePath)
        return response
        
    } catch (error) {
        fs.unlinkSync(localFilePath) 
        return null;
    }


    //suppose if the upload operation failed but somehow url/file is been stored in our local system
        // We need to remove it.
        //it removes locally saved temporary file since the upload operation failed


}

export {uploadOnCloudinary}