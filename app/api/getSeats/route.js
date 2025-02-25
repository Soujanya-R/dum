import db from "@/lib/db";

export async function getSeats(flightId) {
  const [rows] = await db.query("SELECT * FROM seats WHERE flight_id = ?", [flightId]);
  return rows;
}
