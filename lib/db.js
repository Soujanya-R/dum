import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "localhost", 
  user: "root",  // Make sure this is correct
  password: "0000", // Ensure this matches your MySQL password
  database: "flight_booking",
});

export default db;
