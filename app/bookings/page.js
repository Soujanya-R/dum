"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function BookingsPage() {
  const searchParams = useSearchParams();
  const flightId = searchParams.get("flightId"); // Fetch flightId from URL

  console.log("🔹 flightId:", flightId); // Add this to see if flightId is being fetched

  const [flight, setFlight] = useState(null);
  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlightDetails = async () => {
      if (!flightId) return;
  
      console.log("🔹 Fetching flight details for Flight ID:", flightId);
  
      try {
        const flightResponse = await fetch(`/api/getFlight?flightId=${flightId}`);
        const flightData = await flightResponse.json();
  
        console.log("✅ Flight API Response:", flightData);
  
        if (flightData.flight) {
          setFlight(flightData.flight);
        } else {
          console.error("❌ No flight found in response!");
          setFlight(null);  // Prevent infinite loading
        }
  
        setLoading(false); // Stop loading state
      } catch (error) {
        console.error("❌ Error fetching flight:", error);
        setLoading(false);
      }
    };
  
    fetchFlightDetails();
  }, [flightId]);
  
  if (loading) return <p>Loading flight details...</p>;
  if (!flight) return <p className="text-red-500">❌ Flight details not found.</p>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold">Confirm Your Booking</h2>
      <p><strong>Flight:</strong> {flight.flightNumber}</p>
      <p><strong>Departure:</strong> {new Date(flight.departureTime).toLocaleString()}</p>
      <p><strong>Arrival:</strong> {new Date(flight.arrivalTime).toLocaleString()}</p>

      {/* Seat Selection */}
      <h3 className="mt-4 text-lg font-semibold">Select a Seat</h3>
      <div className="grid grid-cols-5 gap-2 mt-2">
        {seats.map((seat) => (
          <button
            key={seat.seatId}
            className={`p-2 border rounded ${seat.isAvailable ? (selectedSeat === seat.seatId ? "bg-green-500 text-white" : "bg-gray-200") : "bg-red-500 text-white cursor-not-allowed"}`}
            disabled={!seat.isAvailable}
            onClick={() => setSelectedSeat(seat.seatId)}
          >
            {seat.seatNumber}
          </button>
        ))}
      </div>

      {/* Confirm Booking Button */}
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        disabled={!selectedSeat}
        onClick={async () => {
          const response = await fetch("/api/bookFlight", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ flightId, seatId: selectedSeat }),
          });

          const data = await response.json();
          console.log("✅ Booking Response:", data);

          if (data.success) {
            window.location.href = "/bookings"; // Redirect to bookings page
          } else {
            alert("❌ Booking failed: " + data.error);
          }
        }}
      >
        Confirm Booking
      </button>
    </div>
  );
}
