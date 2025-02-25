import { useEffect, useState } from "react";

export default function SeatSelection({ flightId }) {
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    async function fetchSeats() {
      try {
        const response = await fetch(`/api/getSeats?flightId=${flightId}`);
        const data = await response.json();
        console.log("Seats Data:", data); // Debugging
        setSeats(data);
      } catch (err) {
        console.error("Error fetching seats:", err);
      }
    }
    fetchSeats();
  }, [flightId]);

  return (
    <div>
      <h3>Select a Seat</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
        {seats.map((seat) => (
          <button
            key={seat.seatId}
            style={{
              padding: "10px",
              backgroundColor: seat.isAvailable ? "green" : "red",
              color: "white",
              border: "none",
              cursor: seat.isAvailable ? "pointer" : "not-allowed",
            }}
            disabled={!seat.isAvailable}
          >
            {seat.seatNumber}
          </button>
        ))}
      </div>
    </div>
  );
}
