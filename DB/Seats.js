import connection from "./ConnectDB";
export const getSeatLayoutForMovie = async (movieId) => {
    try {
      // Query to get seat layout details for the specified movie
      const [seatLayoutResult] = await connection.execute(`
        SELECT 
          sl.seatLayoutId, 
          sl.seatNo, 
          sl.seatType, 
          sl.userId,  -- Include userId to check if a seat is reserved
          u.name AS reservedBy  -- Get the name of the user who reserved the seat, if any
        FROM 
          MovieSeatsLayout AS sl
        LEFT JOIN 
          User AS u ON sl.userId = u.id  -- Join User table to get user details if seat is reserved
        WHERE 
          sl.movieId = ? 
        ORDER BY 
          sl.seatNo;
      `, [movieId]);
  
      if (seatLayoutResult.length === 0) {
        throw new Error('Seat layout not found for the specified movie');
      }
  
      // Return the seat layout data in a structured format, including reservation status
      return seatLayoutResult.map(seat => ({
        seatNo: seat.seatNo,
        seatType: seat.seatType,  // Normal, Premium, Reserved
        reserved: seat.userId ? true : false,  // True if seat is reserved
        reservedBy: seat.reservedBy || null  // Name of the user who reserved the seat, or null if not reserved
      }));
    } catch (error) {
      console.error('Error fetching seat layout:', error);
      throw error;  // Re-throw the error to be handled by the API route
    }
  };
  

  export async function reserveSeat(movieId, seatId, userId) {
    try {
      // Query to reserve the specified seat for the user
      const [result] = await connection.execute(`
        UPDATE 
          MovieSeatsLayout 
        SET 
          userId = ? ,seatType="Reserved"
        WHERE 
          movieId = ? AND seatLayoutId = ? AND userId IS NULL;
      `, [userId, movieId, seatId]);
  
      if (result.affectedRows === 0) {
        throw new Error('Failed to reserve the seat. The seat may already be reserved.');
      }
  
      return { message: 'Seat reserved successfully.' };
    } catch (error) {
      console.error('Error reserving seat:', error);
      throw error;
    }
  }