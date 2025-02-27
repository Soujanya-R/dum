import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BookingList from "@/components/BookingList";

export default async function BookingsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <p className="text-red-500">❌ Please <a href="/login">Login</a> to view bookings.</p>;
  }

  // Fetch bookings for the logged-in user
  const [bookings] = await db.query("SELECT * FROM Booking WHERE customerId = ?", [session.user.id]);

  console.log("🔹 Booking Data from DB:", bookings); // Debugging

  const enrichedBookings = await Promise.all(
    bookings.map(async (booking) => {
      const [flights] = await db.query("SELECT * FROM Flight WHERE flightId = ?", [booking.flightId]);

      return { 
        ...booking, 
        flight: flights.length > 0 ? flights[0] : null // ✅ Ensures `flight` exists
      };
    })
  );

  return <BookingList bookings={enrichedBookings} />;
}
