import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: "localhost",
  user: process.env.DB_User,
  password: process.env.DB_Password,
  database: process.env.DB_DATABASE,
});

const createTables = async () => {
  try {
    await connection.execute(`CREATE DATABASE IF NOT EXISTS FilmFlex`);
    await connection.execute(`
            CREATE TABLE IF NOT EXISTS User (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                profilePicUrl VARCHAR(255)
            );
        `);

    // Admin table
    await connection.execute(`
            CREATE TABLE IF NOT EXISTS Admin (
                adminId INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL
            );
        `);

    // Movie table
    await connection.execute(`
            CREATE TABLE IF NOT EXISTS Movie (
                movieId INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                trailer VARCHAR(255),
                movieRatings DECIMAL(3, 2)
            );
        `);

    // MovieGenres table
    await connection.execute(`
            CREATE TABLE IF NOT EXISTS MovieGenres (
                movieGenreId INT AUTO_INCREMENT PRIMARY KEY,
                movieId INT NOT NULL,
                genre VARCHAR(255) NOT NULL,
                FOREIGN KEY (movieId) REFERENCES Movie(movieId) ON DELETE CASCADE
            );
        `);

    // MovieTimings table
    await connection.execute(`
            CREATE TABLE IF NOT EXISTS MovieTimings (
                timingId INT AUTO_INCREMENT PRIMARY KEY,
                movieId INT NOT NULL,
                duration INT NOT NULL,
                timings TIME NOT NULL,
                day ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday') NOT NULL,
                FOREIGN KEY (movieId) REFERENCES Movie(movieId) ON DELETE CASCADE
            );
        `);

    // MoviePrices table
    await connection.execute(`
            CREATE TABLE IF NOT EXISTS MoviePrices (
                priceId INT AUTO_INCREMENT PRIMARY KEY,
                movieId INT NOT NULL,
                price DECIMAL(10, 2) NOT NULL,
                FOREIGN KEY (movieId) REFERENCES Movie(movieId) ON DELETE CASCADE
            );
        `);

    // MovieImage table
    await connection.execute(`
            CREATE TABLE IF NOT EXISTS MovieImage (
                imageId INT AUTO_INCREMENT PRIMARY KEY,
                movieId INT NOT NULL,
                imageUrl VARCHAR(255) NOT NULL,
                FOREIGN KEY (movieId) REFERENCES Movie(movieId) ON DELETE CASCADE
            );
        `);

    await connection.execute(`
            CREATE TABLE IF NOT EXISTS Reviews (
                reviewId INT AUTO_INCREMENT PRIMARY KEY,
                movieId INT NOT NULL,
                userId INT NOT NULL,
                rating DECIMAL(2, 1) CHECK (rating >= 0 AND rating <= 5),
                \`desc\` TEXT NOT NULL,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (movieId) REFERENCES Movie(movieId) ON DELETE CASCADE,
                FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE
            );
        `);

    // SeatLayout table
    await connection.execute(`
            CREATE TABLE IF NOT EXISTS SeatLayout (
                seatLayoutId INT AUTO_INCREMENT PRIMARY KEY,
                type ENUM('Normal', 'Premium', 'Reserved') NOT NULL,
                seatNo INT NOT NULL
            );
        `);

    // Reservation table
    await connection.execute(`
            CREATE TABLE IF NOT EXISTS Reservation (
                reservationId INT AUTO_INCREMENT PRIMARY KEY,
                userId INT NOT NULL,
                movieId INT NOT NULL,
                seatId INT NOT NULL,
                FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE,
                FOREIGN KEY (movieId) REFERENCES Movie(movieId) ON DELETE CASCADE
            );
        `);

    // UserNotifications table
    await connection.execute(`
            CREATE TABLE IF NOT EXISTS UserNotifications (
                notificationId INT AUTO_INCREMENT PRIMARY KEY,
                userId INT NOT NULL,
                message TEXT NOT NULL,
                title VARCHAR(255) NOT NULL,
                time DATETIME DEFAULT CURRENT_TIMESTAMP,
                image VARCHAR(255),
                FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE
            );
        `);

    // Transactions table
    await connection.execute(`
            CREATE TABLE IF NOT EXISTS Transactions (
                transactionId INT AUTO_INCREMENT PRIMARY KEY,
                movieId INT NOT NULL,
                seatNo INT NOT NULL,
                method ENUM('JazzCash', 'Easypaisa') NOT NULL,
                FOREIGN KEY (movieId) REFERENCES Movie(movieId) ON DELETE CASCADE
            );
        `);

    // Offers table
    await connection.execute(`
            CREATE TABLE IF NOT EXISTS Offers (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                discount VARCHAR(50) NOT NULL,
                icon TEXT NOT NULL
            );
        `);

    // DiscountPrices table
    await connection.execute(`
            CREATE TABLE IF NOT EXISTS DiscountPrices (
                discountId INT AUTO_INCREMENT PRIMARY KEY,
                movieId INT NOT NULL,
                discountPercentage DECIMAL(5, 2) CHECK (discountPercentage >= 0 AND discountPercentage <= 100),
                discountDay ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday') NOT NULL,
                discountTime TIME NOT NULL,
                FOREIGN KEY (movieId) REFERENCES Movie(movieId) ON DELETE CASCADE
            );
        `);

    await connection.execute(`
          
CREATE OR REPLACE VIEW TrendingMovies AS
SELECT 
    m.MovieId AS movieId,
    m.name AS movieName,
    m.description,
    m.trailer,
    m.movieRatings,
    COUNT(r.reservationId) AS reservationCount, -- Count of reservations for the movie
    AVG(rev.rating) AS averageRating, -- Average rating from reviews
    GROUP_CONCAT(DISTINCT mg.genre) AS genres, -- Concatenate movie genres
    ANY_VALUE(mi.imageUrl) AS movieImage -- Get any image URL for the movie
FROM 
    Movie AS m
JOIN 
    Reservation AS r ON m.MovieId = r.movieId
LEFT JOIN 
    Reviews AS rev ON m.MovieId = rev.movieId
LEFT JOIN 
    MovieGenres AS mg ON m.MovieId = mg.movieId
LEFT JOIN 
    MovieImage AS mi ON m.MovieId = mi.movieId -- Join with MovieImage table to get the image URL
GROUP BY 
    m.MovieId
ORDER BY 
    reservationCount DESC, averageRating DESC
LIMIT 7;

        `);
    await connection.execute(`
       
CREATE OR REPLACE VIEW UserReviews AS
SELECT 
    u.id AS userId,
    u.name AS userName,
    u.profilePicUrl AS userAvatar, 
    r.rating AS userRating,
    r.desc AS userComment,
    r.timestamp AS reviewDate
FROM 
    Reviews r
JOIN 
    User u ON r.userId = u.id
ORDER BY 
    r.timestamp DESC LIMIT 3;


        `);

    await connection.execute(`
            CREATE OR REPLACE VIEW MovieSales AS
SELECT 
    m.MovieId AS movieId,
    m.name AS movieName,
    mp.price AS originalPrice,
    dp.discountPercentage,
    dp.discountDay,
    dp.discountTime,
    (mp.price - (mp.price * dp.discountPercentage / 100)) AS salePrice,
    mi.imageUrl AS movieImage -- Added Movie Image URL
FROM 
    MoviePrices AS mp
JOIN 
    DiscountPrices AS dp ON mp.movieId = dp.movieId
JOIN 
    Movie AS m ON mp.movieId = m.MovieId
LEFT JOIN 
    MovieImage AS mi ON m.MovieId = mi.movieId; -- Join with MovieImage table to get the image URL


`);

    await connection.execute(`
    
CREATE OR REPLACE VIEW MovieDetailsWithReviews AS
SELECT 
    m.MovieId AS movieId,
    m.name AS movieName,
    m.description AS movieDescription,
    m.trailer AS movieTrailer,
    AVG(rev.rating) AS averageRating, -- Average rating from reviews
    COUNT(rev.reviewId) AS totalReviews, -- Total number of reviews
    GROUP_CONCAT(DISTINCT rev.desc ORDER BY rev.timestamp DESC) AS latestReviews, -- Concatenate reviews
    GROUP_CONCAT(DISTINCT rev.userId ORDER BY rev.timestamp DESC) AS reviewAuthors, -- Concatenate reviewer names
    ANY_VALUE(mi.imageUrl) AS movieImage -- Get any image URL for the movie
FROM 
    Movie AS m
LEFT JOIN 
    Reviews AS rev ON m.MovieId = rev.movieId -- Join with Reviews table to get reviews
LEFT JOIN 
    MovieImage AS mi ON m.MovieId = mi.movieId -- Join with MovieImage to get movie image
GROUP BY 
    m.MovieId;


    `);

    await connection.execute(`
    CREATE OR REPLACE VIEW MovieOffers AS
SELECT 
    o.id AS offerId,
    o.title AS offerTitle,
    o.description AS offerDescription,
    o.discount AS offerDiscount,
    o.icon AS offerIcon
FROM 
    Offers AS o;
    `);

    await connection.execute(`
    CREATE TABLE IF NOT EXISTS MovieSeatsLayout (
    seatLayoutId INT AUTO_INCREMENT PRIMARY KEY,
    seatType ENUM('Normal', 'Premium', 'Reserved') NOT NULL,
    seatNo INT NOT NULL,
    movieId INT NOT NULL,
    userId INT DEFAULT NULL, -- NULL indicates the seat is unreserved
    FOREIGN KEY (movieId) REFERENCES Movie(movieId) ON DELETE CASCADE,
    FOREIGN KEY (userId) REFERENCES User(id) ON DELETE SET NULL
);

        `)

    console.log("Tables created successfully!");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
};

createTables();
export default connection;
