"use server";

import db from "@/lib/db";

export async function getSeats(req, res) {
  const { flightId } = req.query;

  try {
    const [rows] = await db.query(
      "SELECT seatId, seatNumber, isAvailable FROM Seat WHERE flightId = ?",
      [flightId]
    );

    console.log("✅ Fetched Seats from DB:", rows);

    res.json({ seats: rows });
  } catch (error) {
    console.error("❌ Error fetching seats:", error);
    res.status(500).json({ error: "Failed to fetch seats" });
  }
}

export default getSeats;
