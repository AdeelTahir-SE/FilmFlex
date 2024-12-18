import { NextResponse } from "next/server";
export async function GET(request){
    const {value} = request.cookies.get("userid");
    const userId = value;
    if (!userId) {
        return NextResponse.json(
            { message: "Unauthorized" },
            { status: 401 }
        );
    }
    const discount=await getMoviesDiscount();
    return NextResponse.json(
        { message: "Movies Discount",discount: discount },
        { status: 200 }
    );
}