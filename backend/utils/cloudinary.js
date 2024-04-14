// v2 cloudinary
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
    api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET,
    secure: true,
});


export const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            console.log("file not exits", localFilePath);
            return null;
        };
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        console.log("error while uploading on cloudinary", error)
        fs.unlinkSync(localFilePath)
        return null;
    }
}
