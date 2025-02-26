import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return Response.json({ error: "User not authenticated" }, { status: 401 });
    }

    console.log("🔹 Fetching bookings for User ID:", session.user.id);

    const [bookings] = await db.query(
      `SELECT b.bookingId, b.flightId, b.bookingDate, 
              f.flightNumber, f.departureTime, f.arrivalTime,
              s.seatNumber
       FROM Booking b
       JOIN Flight f ON b.flightId = f.flightId
       LEFT JOIN Seat s ON s.bookingId = b.bookingId
       WHERE b.customerId = ?`,
      [session.user.id]
    );

    console.log("✅ Bookings Found:", bookings);

    return Response.json({ bookings });
  } catch (error) {
    console.error("❌ Error fetching bookings:", error);
    return Response.json({ error: "Internal Server Error", bookings: [] }, { status: 500 });
  }
}
