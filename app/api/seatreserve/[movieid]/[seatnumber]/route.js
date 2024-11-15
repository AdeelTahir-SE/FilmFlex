import { NextResponse } from "next/server";
import Stripe from "stripe";
export async function PATCH(request,{params}){
    const movie_id=params.movieid;
    const seat_id=params.seatnumber;
    const response=await movies.findunique(movie_id).put({
        where:{
            seatid=seat_id;
            Set(request.seat_STATUS);
        }
    })

}