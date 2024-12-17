import { NextResponse } from "next/server";
import { LoginUser } from "@/DB/User";
export async function POST(request) {
  try {
    const {  email, password } = await request.json(); // Parse JSON body

    // Call your database function to create the user
    const userId = await LoginUser( email, password);

    // Create a response object and set the cookie
    const response = NextResponse.json(
      { message: "User Login Successful" },
      { status: 200 }
    );

    // Set the cookie for the user ID
    response.cookies.set("userid", userId, {
      httpOnly: true, // Add more cookie options like secure, path, etc.
      sameSite: "strict", // Adjust as per your requirements
      maxAge: 60 * 60,  // Set the cookie expiry time to 1 hour (60 seconds * 60 minutes)

    });


    return response;
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Error creating user" },
      { status: 500 }
    );
  }
}
