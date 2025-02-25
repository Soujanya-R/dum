"use server";
import db from "@/lib/db";

export async function cancelBooking(bookingId) {
  try {
    // 1️⃣ Get flightId & seatNumber before deleting the booking
    const [booking] = await db.query("SELECT flightId FROM Booking WHERE bookingId = ?", [bookingId]);
    if (booking.length === 0) return { success: false, error: "Booking not found" };

    // 2️⃣ Free the seat by setting isAvailable = TRUE and removing bookingId
    await db.query("UPDATE Seat SET isAvailable = TRUE, bookingId = NULL WHERE bookingId = ?", [bookingId]);

    // 3️⃣ Delete the booking from the Booking table
    await db.query("DELETE FROM Booking WHERE bookingId = ?", [bookingId]);

    return { success: true, message: "Booking canceled successfully!" };
  } catch (error) {
    console.error("Error canceling booking:", error);
    return { success: false, error: "Cancellation failed." };
  }
}
