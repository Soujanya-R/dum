"use server";
import db from "@/lib/db";

export async function createBooking(customerId, flightId, seatId) {
  try {
    await db.query("START TRANSACTION");

    // Insert booking
    const [result] = await db.query(
      "INSERT INTO Booking (customerId, flightId, bookingDate) VALUES (?, ?, CURDATE())",
      [customerId, flightId]
    );
    const bookingId = result.insertId;

    // Update seat as booked
    await db.query("UPDATE Seat SET isAvailable = FALSE, bookingId = ? WHERE seatId = ?", [
      bookingId,
      seatId,
    ]);

    await db.query("COMMIT");
    return { success: true, bookingId };
  } catch (error) {
    await db.query("ROLLBACK");
    console.error("Error booking flight:", error);
    return { success: false, error: error.message };
  }
}
