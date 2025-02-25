require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const AMADEUS_CLIENT_ID = process.env.AMADEUS_CLIENT_ID;
const AMADEUS_CLIENT_SECRET = process.env.AMADEUS_CLIENT_SECRET;

// Function to get Amadeus API Token
async function getAmadeusToken() {
  const response = await axios.post("https://test.api.amadeus.com/v1/security/oauth2/token", {
    grant_type: "client_credentials",
    client_id: AMADEUS_CLIENT_ID,
    client_secret: AMADEUS_CLIENT_SECRET,
  });
  return response.data.access_token;
}

// ✅ Fetch Available Flights
app.post("/search-flights", async (req, res) => {
  const { from, to, date } = req.body;

  try {
    const token = await getAmadeusToken();
    const response = await axios.get("https://test.api.amadeus.com/v2/shopping/flight-offers", {
      params: { originLocationCode: from, destinationLocationCode: to, departureDate: date, adults: 1 },
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response.data);
    res.json({ flights: response.data.data });
  } catch (error) {
    console.error("Error fetching flights:", error);
    res.status(500).json({ message: "Failed to fetch flights." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
