import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const deleteLocalFile = (filePath) => {
  try {
    fs.unlinkSync(filePath);
  } catch (error) {
    console.warn("Could not delete local file:", filePath, error.message);
  }
};

const uploadOnCloudinary = async (filePath) => {
  if (!filePath) return null;

  try {
    const response = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });

    deleteLocalFile(filePath);
    return response;
  } catch (error) {
    console.error("Cloudinary upload failed:", error.message);
    deleteLocalFile(filePath);
    return null;
  }
};

export { uploadOnCloudinary };
