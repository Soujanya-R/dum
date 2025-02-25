import db from "@/lib/db";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const date = searchParams.get("date");

    if (!from || !to || !date) {
      return Response.json({ error: "Missing parameters", flights: [] });
    }

    console.log("🔹 Searching for Flights:", { from, to, date });

    const query = `
      SELECT * FROM Flight 
      WHERE DATE(departureTime) = ? 
      AND fromLocation = ? 
      AND toLocation = ?
    `;
    
    const [flights] = await db.query(query, [date, from, to]);

    console.log("✅ Flights Found:", flights);

    return Response.json({ flights });
  } catch (error) {
    console.error("❌ Error fetching flights:", error);
    return Response.json({ error: "Internal Server Error", flights: [] });
  }
}
