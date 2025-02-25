import mysql from "mysql2/promise";

// ✅ Create a database connection pool
const db = mysql.createPool({
  host: "localhost",     // Change if using a remote database
  user: "your_user",     // Replace with your database username
  password: "0000", // Replace with your database password
  database: "flight_booking", // Replace with your actual database name
});

// ✅ Function to fetch available seats for a given flight
export async function getSeats(flightId) {
  try {
    const [rows] = await db.query("SELECT * FROM seats WHERE flight_id = ?", [flightId]);
    return rows;
  } catch (error) {
    console.error("Error fetching seats:", error);
    throw error;
  }
}

export default db; // ✅ Exporting db connection if needed elsewhere
