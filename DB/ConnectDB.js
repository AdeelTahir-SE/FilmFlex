import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: "localhost",
  user: process.env.DB_User,
  password: process.env.DB_Password,
  database: process.env.DB_DATABASE,
});

const createTables = async () => {
  try {
    // User table
    await connection.execute(`
            CREATE TABLE IF NOT EXISTS User (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                hashedPassword VARCHAR(255) NOT NULL,
                profilePicUrl LONGBLOB
            );
        `);

    // Admin table
    await connection.execute(`
            CREATE TABLE IF NOT EXISTS Admin (
                adminId INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                hashedPassword VARCHAR(255) NOT NULL
            );
        `);

    // Movie table
    await connection.execute(`
            CREATE TABLE IF NOT EXISTS Movie (
                movieId INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                trailer VARCHAR(255),
                seatLayoutId INT NOT NULL,
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
                imageUrl LONGBLOB NOT NULL,
                FOREIGN KEY (movieId) REFERENCES Movie(movieId) ON DELETE CASCADE
            );
        `);

    // Reviews table
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

    //views
    await connection.execute(`
            CREATE VIEW MovieDetails AS
SELECT
    m.movieId,
    m.name AS title,
    m.description,
    mt.duration,
    mt.timings,
    mg.genre,
    mp.price,
    mi.imageUrl AS movieImage,
    dp.discountDay AS day
FROM
    Movie m
    NATURAL JOIN MovieGenres mg
    NATURAL JOIN MovieTimings mt
    NATURAL JOIN MoviePrices mp
    NATURAL JOIN MovieImage mi
    NATURAL JOIN DiscountPrices dp;
`);
    await connection.execute(`
    CREATE VIEW TrendingMovies AS
SELECT
name as title,description,imageurl FROM Movie NATURAL JOIN MovieImage NATURAL JOIN Reviews GROUP BY movieid ORDER BY SUM(rating) limit 7
`);
    console.log("Tables created successfully!");
  } catch (error) {
    console.error("Error creating tables:", error);
  } finally {
    await connection.end();
  }
};

createTables();
export default connection;
