export const getSeatLayoutForMovie = async (movieId) => {
    try {
      // Query to get the seat layout ID for the movie
      const [movieResult] = await connection.execute(`
        SELECT seatLayoutId FROM Movie WHERE movieId = ?
      `, [movieId]);
  
      if (movieResult.length === 0) {
        throw new Error('Movie not found');
      }
  
      const seatLayoutId = movieResult[0].seatLayoutId;
  
      // Query to get seat layout details from the SeatLayout table
      const [seatLayoutResult] = await connection.execute(`
        SELECT seatLayoutId, type, seatNo FROM SeatLayout WHERE seatLayoutId = ?
      `, [seatLayoutId]);
  
      if (seatLayoutResult.length === 0) {
        throw new Error('Seat layout not found');
      }
  
      // Return the seat layout data in a structured format
      return seatLayoutResult.map(seat => ({
        seatNo: seat.seatNo,
        type: seat.type
      }));
    } catch (error) {
      console.error('Error fetching seat layout:', error);
      throw error;  // Re-throw the error to be handled by the API route
    }
  };

