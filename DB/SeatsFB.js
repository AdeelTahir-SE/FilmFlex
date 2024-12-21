
//reserve seat
import { database } from "./ConnectFB";
import { ref, update } from 'firebase/database';

export async function reserveSeat(movieId,seatId,userId) {
  const seatRef = ref(database, `${movieId}/seats/${seatId}`);
  update(seatRef, { reserved: true,bought:false,user:userId })
    .then(() => {
      console.log('Seat reserved successfully');
    })
    .catch((error) => {
      console.error('Error reserving seat:', error);
    });
}



//cancel seat
export async function cancelReservation(movieId,seatId) {
    const seatRef = ref(database, `${movieId}/seats/${seatId}`);
    update(seatRef, { reserved: false, bought: false,user:null })
      .then(() => {
        console.log('Reservation canceled successfully');
      })
      .catch((error) => {
        console.error('Error canceling reservation:', error);
      });
  }
  

  
  //Buy Seat
  export async function buySeat(movieId,seatId,userId) {
    const seatRef = ref(database, `${movieId}/seats/${seatId}`);
    update(seatRef, { reserved: false, bought: true,user:userId })
      .then(() => {
        console.log('Seat bought successfully');
      })
      .catch((error) => {
        console.error('Error buying seat:', error);
      });
  }
  

  
