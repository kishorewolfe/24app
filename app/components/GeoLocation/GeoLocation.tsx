// components/GetLocation.tsx
"use client";

import React, { useState } from "react";

const GetLocation: React.FC = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
        setError(null);
      },
      (err) => {
        setError(`Error: ${err.message}`);
      }
    );
  };

  return (
    <div className="p-4">
      <button
        onClick={handleGetLocation}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Get Location
      </button>

      {location && (
        <div className="mt-4">
          <p>Latitude: {location.lat}</p>
          <p>Longitude: {location.lng}</p>
        </div>
      )}

      {error && (
        <p className="mt-4 text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default GetLocation;
