'use client';

import React, { useState, useEffect } from 'react';
import WeatherCard from './WeatherCard';
import { fetchWeatherForCities, transformWeatherData } from '../api/weatherService';

const WeatherDashboard = () => {
  // City IDs from the previous cities.json file
  const cityIds = ['1248991','1850147','2644210','2988507','2147714','4930956','1796236', '3143244' ];

  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setLoading(true);
        const weatherData = await fetchWeatherForCities(cityIds);
        const transformedData = weatherData.map(transformWeatherData);
        setCities(transformedData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching weather data:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">Loading weather data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Global Weather Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cities.map((city) => (
          <WeatherCard key={city.CityCode} city={city} />
        ))}
      </div>
    </div>
  );
};

export default WeatherDashboard;