"use client";
import { useState } from "react";

export default function BookingForm({ flightId }) {
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [message, setMessage] = useState("");

  const handleBooking = async () => {
    if (!selectedSeat) {
      setMessage("❌ Please select a seat.");
      return;
    }

    console.log("🔹 Booking Flight ID:", flightId);
    console.log("🔹 Selected Seat:", selectedSeat);

    const response = await fetch("/api/bookFlight", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ flightId, seatNumber: selectedSeat }),
    });

    const data = await response.json();
    console.log("🔹 Booking Response:", data);

    setMessage(data.success ? "✅ Booking successful!" : `❌ ${data.error}`);
  };

  return (
    <div className="p-4 border">
      <p><strong>Flight ID:</strong> {flightId}</p>
      <p><strong>Selected Seat:</strong> {selectedSeat || "None"}</p>
      <button onClick={handleBooking} className="px-4 py-2 bg-blue-500 text-white rounded">
        Confirm Booking
      </button>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}
