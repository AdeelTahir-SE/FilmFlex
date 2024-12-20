import { NextResponse } from "next/server";
import { getUserById ,updateAttribute} from "@/DB/User";

export async function GET(req){
const {value}=req.cookies.get("userid");
const userid=value;
if(!userid){
return NextResponse.redirect("/login");
}
const user=await getUserById(userid);
return NextResponse.json({user},{status:200});
}

export async function PUT(req) {
  try {
    const { value: userId } = req.cookies.get("userid") || {};
    if (!userId) {
      return NextResponse.redirect("/login");
    }

    const { attribute, info } = await req.json();

    if (!attribute || !info) {
      return NextResponse.json(
        { message: "Missing attribute or info in the request body." },
        { status: 400 }
      );
    }

    const validAttributes = ["name", "password"]; // Add more attributes as needed
    if (!validAttributes.includes(attribute)) {
      return NextResponse.json(
        { message: "Invalid attribute specified for update." },
        { status: 400 }
      );
    }

    await updateAttribute(userId, attribute, info);

    return NextResponse.json(
      { message: "Attribute updated successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating attribute:", error);
    return NextResponse.json(
      { message: "An error occurred while updating the attribute." },
      { status: 500 }
    );
  }
}
