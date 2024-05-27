import axios from "axios";

export default async function handler(req, res) {
  const baseURL = "https://api.coinbase.com/v2/exchange-rates";
  const currency = req.query.currency || "EUR";

  console.log("API route hit");
  try {
    const response = await axios.get(`${baseURL}?currency=${currency}`);
    console.log("Response received:", response.data);
    res.status(200).json(response.data);
  } catch (error) {
    if (error.response) {
      console.error("API responded with an error:", error.response.data);
      res
        .status(error.response.status)
        .json({ message: error.response.data.error || "Error fetching data" });
    } else if (error.request) {
      console.error("No response received:", error.request);
      res.status(500).json({ message: "No response from the server" });
    } else {
      console.error("Error setting up the API request:", error.message);
      res.status(500).json({ message: "Error setting up the API request" });
    }
  }
}
