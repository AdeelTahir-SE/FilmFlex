import { NextResponse } from "next/server";
import cloudinary from "cloudinary";
import { uploadImage } from "@/DB/User";

// Set up Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export const config = {
  api: {
    bodyParser: false, // Disable body parser for raw file upload
  },
};

export async function POST(req) {
  try {
    const formData = await req.formData(); // Get the FormData from the request

    // Get the file from the FormData object (assuming the field name is 'profile_picture')
    const file = formData.get("profile_picture");

    if (!file) {
      return NextResponse.json({
        error: "No file uploaded",
      }, { status: 400 });
    }

    // Extract the userId from request cookies
    const { value } = req.cookies.get("userid");
    const userId = value;

    if (!userId) {
      return NextResponse.json({
        error: "No userId found in the request",
      }, { status: 400 });
    }

    // Read the content of the file as an array buffer (for binary files)
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary using promise-based API
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.v2.uploader.upload_stream(
        {
          resource_type: "auto", // Automatically detect the file type
          public_id: `profile_pictures/${userId}`, // Use userId as the custom name for the file
        },
        (error, result) => {
          if (error) {
            reject(error); // Reject the promise if there's an error
          } else {
            resolve(result); // Resolve with the result if successful
          }
        }
      ).end(buffer);
    });

    // Save the uploaded image URL in the database
    await uploadImage(userId, uploadResult.secure_url);

    return NextResponse.json({
      message: "File uploaded successfully to Cloudinary",
      url: uploadResult.secure_url, // URL of the uploaded image
    }, { status: 200 });

  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({
      error: error.message || "Failed to process file",
    }, { status: 500 });
  }
}
