import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return Response.json({ success: false, error: "User not authenticated." });
    }

    const { bookingId } = await req.json();
    console.log("🔹 Canceling Booking ID:", bookingId);

    // Check if booking exists
    const [booking] = await db.query("SELECT flightId FROM Booking WHERE bookingId = ?", [bookingId]);
    if (booking.length === 0) return Response.json({ success: false, error: "Booking not found." });

    // Free the seat
    await db.query("UPDATE Seat SET isAvailable = TRUE, bookingId = NULL WHERE bookingId = ?", [bookingId]);

    // Delete the booking
    await db.query("DELETE FROM Booking WHERE bookingId = ?", [bookingId]);

    return Response.json({ success: true, message: "Booking canceled successfully!" });
  } catch (error) {
    console.error("❌ Error canceling booking:", error);
    return Response.json({ success: false, error: "Cancellation failed." });
  }
}
