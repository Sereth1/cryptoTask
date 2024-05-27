import React, { useEffect, useState } from "react";

const ExchangeRates = () => {
  const [rates, setRates] = useState(null);
  const [error, setError] = useState(null);
  const [currency, setCurrency] = useState("BTC");

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch(`/api/exchangeRates?currency=${currency}`);
        if (!res.ok) {
          throw new Error("Failed to fetch exchange rates");
        }
        const data = await res.json();
        setRates(data);
      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch exchange rates:", err);
      }
    };

    fetchRates();
  }, [currency]);

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const formatRates = (data) => {
    return Object.entries(data).map(([key, value]) => {
      if (typeof value === "object" && value !== null) {
        return (
          <div key={key} className="py-2">
            <strong>{key}:</strong>
            <div className="pl-4">{formatRates(value)}</div>
          </div>
        );
      } else {
        return (
          <div key={key} className="py-1">
            <strong>{key}:</strong> {value}
          </div>
        );
      }
    });
  };

  if (error) {
    return <p className="text-red-500 text-lg font-semibold">Error: {error}</p>;
  }
  if (!rates) {
    return <p className="text-gray-500 text-lg">Loading...</p>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Exchange Rates:</h1>
      <div className="mb-4">
        <select
          onChange={handleCurrencyChange}
          value={currency}
          className="form-select appearance-none
            block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding bg-no-repeat
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        >
          <option value="BTC">Bitcoin (BTC)</option>
          <option value="ETH">Ethereum (ETH)</option>
          <option value="LTC">Litecoin (LTC)</option>
        </select>
      </div>
      <div className="bg-gray-100 p-4 rounded shadow">{formatRates(rates)}</div>
    </div>
  );
};

export default ExchangeRates;
