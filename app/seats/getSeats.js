"use server";

import db from "@/lib/db";

export async function getSeats(flightId) {
  try {
    const [rows] = await db.query(
      "SELECT seatId, seatNumber, isAvailable FROM Seat WHERE flightId = ?",
      [flightId]
    );
    return rows;
  } catch (error) {
    console.error("Error fetching seats:", error);
    return [];
  }
}
