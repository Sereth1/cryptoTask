"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const getIconPath = (symbol) => {
  // Adjust the path according to where your icons are stored
  return `/color/${symbol.toUpperCase()}.svg`;
};

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
        console.log("Fetched rates data:", data); // Log the data structure
        setRates(data.data.rates); // Adjust according to the structure of your API response
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

  if (error) {
    return <p className="text-red-500 text-lg font-semibold">Error: {error}</p>;
  }
  if (!rates) {
    return <p className="text-gray-500 text-lg">Loading...</p>;
  }

  // Check the structure of rates before mapping
  const renderRows = () => {
    return Object.entries(rates).map(([key, value], index) => (
      <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {index + 1}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center">
          <Image
            src={getIconPath(key)}
            alt={key}
            width={24}
            height={24}
            className="mr-2"
          />
          {key}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {value}
        </td>
      </tr>
    ));
  };

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Exchange Rates:
        </h1>
        <div className="mb-4">
          <select
            onChange={handleCurrencyChange}
            value={currency}
            className="form-select block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          >
            <option value="BTC">Bitcoin (BTC)</option>
            <option value="ETH">Ethereum (ETH)</option>
            <option value="LTC">Litecoin (LTC)</option>
            <option value="USD">USD (USD)</option>
            <option value="EUR">EUR (EUR)</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <div className="min-w-full shadow overflow-hidden sm:rounded-lg">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody>{renderRows()}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExchangeRates;
