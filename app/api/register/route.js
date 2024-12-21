import { NextResponse } from "next/server";
import { createUser } from "@/DB/User";

export async function POST(request) {
  try {
    const { name, email, password } = await request.json(); // Parse JSON body

    // Call your database function to create the user
    const userId = await createUser(name, email, password);

    // Create a response object and set the cookie
    const response = NextResponse.json(
      { message: "User Created Successfully" },
      { status: 200 }
    );

 response.cookies.set("userid", userId, {
  // Remove httpOnly to allow client-side access
  httpOnly: false,  // This makes the cookie accessible on the client-side
  secure: process.env.NODE_ENV === "production", // Ensure the cookie is only sent over HTTPS in production
  sameSite: "strict", // CSRF protection
  maxAge: 60 * 60 * 1000, // Expiry time of 1 hour in milliseconds
  path: "/", // Cookie available for the entire domain
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
