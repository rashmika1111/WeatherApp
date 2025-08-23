import React from 'react';

const WeatherCard = ({ city }) => {
  // Function to get weather icon based on status
  const getWeatherIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'clear':
        return '☀️';
      case 'clouds':
        return '☁️';
      case 'rain':
        return '🌧️';
      case 'mist':
        return '🌫️';
      case 'snow':
        return '❄️';
      case 'thunderstorm':
        return '⛈️';
      default:
        return '🌡️';
    }
  };

  // Function to get background color based on temperature
  const getTempColor = (temp) => {
    const tempFloat = parseFloat(temp);
    if (tempFloat > 30) return 'bg-red-100';
    if (tempFloat > 20) return 'bg-yellow-100';
    if (tempFloat > 10) return 'bg-blue-100';
    return 'bg-indigo-100';
  };

  // Function to get weather description with capitalization
  const formatWeatherDescription = (description) => {
    return description.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className={`p-4 rounded-lg shadow-md ${getTempColor(city.Temp)} transition-transform duration-200 hover:scale-105`}>
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold text-gray-800">{city.CityName}</h3>
        <span className="text-2xl">
          {city.Icon ? (
            <img 
              src={`https://openweathermap.org/img/wn/${city.Icon}@2x.png`} 
              alt={city.Status}
              className="w-10 h-10"
            />
          ) : (
            getWeatherIcon(city.Status)
          )}
        </span>
      </div>
      <div className="mt-4">
        <p className="text-3xl font-bold text-gray-900">{city.Temp}°C</p>
        <p className="text-gray-600 mt-1 capitalize">
          {formatWeatherDescription(city.Description || city.Status)}
        </p>
      </div>
      {city.Humidity && (
        <div className="mt-3 text-sm text-gray-500">
          <p>Humidity: {city.Humidity}%</p>
          <p>Pressure: {city.Pressure} hPa</p>
          <p>Wind: {city.WindSpeed} m/s</p>
        </div>
      )}
      <div className="mt-2 text-xs text-gray-400">
        <p>City ID: {city.CityCode}</p>
      </div>
    </div>
  );
};

export default WeatherCard;