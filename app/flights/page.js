"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function FlightsPage() {
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const date = searchParams.get("date");
  const router = useRouter();

  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);

  const convertDateFormat = (dateString) => {
    if (!dateString) return "";
    const parts = dateString.split("/");
    if (parts.length === 3) {
      return `${parts[2]}-${parts[0]}-${parts[1]}`;
    }
    return dateString;
  };

  useEffect(() => {
    const fetchFlights = async () => {
      if (!from || !to || !date) {
        console.error("❌ Missing required fields:", { from, to, date });
        return;
      }

      const formattedDate = convertDateFormat(date);
      console.log("🔹 Fetching flights for:", { from, to, formattedDate });

      setLoading(true);
      try {
        const response = await fetch(`/api/getFlights?from=${from}&to=${to}&date=${formattedDate}`);
        const data = await response.json();
        console.log("🔹 API Response:", data);
        setFlights(data.flights || []);
      } catch (error) {
        console.error("❌ Error fetching flights:", error);
      }
      setLoading(false);
    };

    fetchFlights();
  }, [from, to, date]);

  const handleSelectFlight = (flightId) => {
    console.log(`✈️ Flight ${flightId} selected!`);
    router.push(`/bookings?flightId=${flightId}`); // Make sure flightId is added in URL
  };
  

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold">Available Flights</h2>

      {loading ? (
        <p>Loading flights...</p>
      ) : flights.length > 0 ? (
        flights.map((flight) => (
          <div key={flight.flightId} className="border p-4 mb-2 rounded-md">
            <p className="text-gray-700 font-medium">✈️ {flight.flightNumber}</p>
            <p className="text-gray-600">
              {new Date(flight.departureTime).toLocaleString()} → {new Date(flight.arrivalTime).toLocaleString()}
            </p>
            <button
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => handleSelectFlight(flight.flightId)}
            >
              Select Flight
            </button>
          </div>
        ))
      ) : (
        <p>No flights found.</p>
      )}
    </div>
  );
}
