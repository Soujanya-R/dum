import { useEffect, useState } from "react";

const BookingPage = ({ flightId }) => {
  const [flight, setFlight] = useState(null);
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    // Fetch flight details
    fetch(`/api/flights/${flightId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Flight API Response:", data);
        setFlight(data.flight);
      })
      .catch((err) => console.error("❌ Flight API Error:", err));

    // Fetch seat details
    fetch(`/api/seats/${flightId}`)
      .then((res) => res.json())
      .then((seatData) => {
        console.log("✅ Seat API Raw Response:", seatData);

        // Ensure the data is properly structured and update state
        setSeats(
          seatData.seats.map((seat) => {
            console.log("🔹 Processing seat:", seat);
            return {
              ...seat,
              isAvailable: seat.isAvailable === 1, // Convert to Boolean
            };
          })
        );
      })
      .catch((err) => console.error("❌ Seat API Error:", err));
  }, [flightId]);

  return (
    <div>
      <h2>Confirm Your Booking</h2>
      {flight ? (
        <div>
          <p>Flight: {flight.flightNumber}</p>
          <p>Departure: {new Date(flight.departureTime).toLocaleString()}</p>
          <p>Arrival: {new Date(flight.arrivalTime).toLocaleString()}</p>
          <h3>Select a Seat</h3>

          <div>
            {seats.length > 0 ? (
              seats.map((seat, index) => (
                <button
                  key={index}
                  disabled={!seat.isAvailable}
                  style={{
                    margin: "5px",
                    padding: "10px",
                    backgroundColor: seat.isAvailable ? "green" : "red",
                    color: "white",
                    cursor: seat.isAvailable ? "pointer" : "not-allowed",
                  }}
                >
                  {seat.seatNumber}
                </button>
              ))
            ) : (
              <p>Loading seats...</p>
            )}
          </div>
        </div>
      ) : (
        <p>Loading flight details...</p>
      )}

      <button>Confirm Booking</button>
    </div>
  );
};

export default BookingPage;
