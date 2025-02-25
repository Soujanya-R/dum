"use client";

import { useState, forwardRef } from "react";
import { useRouter } from "next/navigation";

const SearchFlights = forwardRef((props, ref) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const router = useRouter();

  const handleSearch = async () => {
    if (!from || !to || !date) {
      alert("❌ Please fill in all fields.");
      return;
    }

    // Navigate to flights page with search data
    router.push(`/flights?from=${from}&to=${to}&date=${date}`);
  };

  return (
    <section ref={ref} className="py-12 bg-gray-100">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Find Your Perfect Flight</h2>
        <form className="grid md:grid-cols-3 gap-4 bg-white shadow-lg p-6 rounded-lg">
          <select
            className="border p-2 rounded w-full"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          >
            <option value="">Select Departure Airport</option>
            <option value="BLR">Bangalore (BLR)</option>
            <option value="BOM">Mumbai (BOM)</option>
            <option value="DEL">Delhi (DEL)</option>
            <option value="HYD">Hyderabad (HYD)</option>
            <option value="MAA">Chennai (MAA)</option>
          </select>

          <select
            className="border p-2 rounded w-full mt-2"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          >
            <option value="">Select Destination Airport</option>
            <option value="BLR">Bangalore (BLR)</option>
            <option value="BOM">Mumbai (BOM)</option>
            <option value="DEL">Delhi (DEL)</option>
            <option value="HYD">Hyderabad (HYD)</option>
            <option value="MAA">Chennai (MAA)</option>
          </select>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="p-3 border rounded-md"
          />
          <button
            type="button"
            onClick={handleSearch}
            className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md col-span-full"
          >
            Search Flights
          </button>
        </form>
      </div>
    </section>
  );
});

// ✅ Fix: Set display name for debugging purposes
SearchFlights.displayName = "SearchFlights";

export default SearchFlights;
