// src/api/weatherService.js
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || process.env.ApiKey;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Function to fetch current weather by city ID
export const fetchWeatherByCityId = async (cityId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?id=${cityId}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error(`Weather API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching weather data for city ID ${cityId}:`, error);
    throw error;
  }
};

// Function to fetch weather for multiple cities
export const fetchWeatherForCities = async (cityIds) => {
  try {
    const weatherPromises = cityIds.map(id => fetchWeatherByCityId(id));
    const weatherData = await Promise.allSettled(weatherPromises);
    
    // Filter out failed requests and extract values
    const successfulRequests = weatherData
      .filter(result => result.status === 'fulfilled')
      .map(result => result.value);
      
    return successfulRequests;
  } catch (error) {
    console.error('Error fetching weather for multiple cities:', error);
    throw error;
  }
};

// Function to transform API data to match our component structure
export const transformWeatherData = (apiData) => {
  return {
    CityCode: apiData.id.toString(),
    CityName: apiData.name,
    Temp: apiData.main.temp.toFixed(1),
    Status: apiData.weather[0].main,
    Description: apiData.weather[0].description,
    Humidity: apiData.main.humidity,
    Pressure: apiData.main.pressure,
    WindSpeed: apiData.wind.speed,
    Icon: apiData.weather[0].icon
  };
};