import React, { useState, useEffect } from "react";
import Icon from "../../../components/AppIcon";

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock weather data
  const mockWeatherData = {
    location: "Hyderabad",
    temperature: 32,
    condition: "Sunny",
    humidity: 65,
    windSpeed: 12,
    forecast: [
      { day: "Today", temp: 32, condition: "Sunny" },
      { day: "Tomorrow", temp: 30, condition: "PartlyCloudy" },
      { day: "Wed", temp: 29, condition: "Cloudy" }
    ]
  };

  useEffect(() => {
    // Simulate API call with timeout
    const fetchWeather = async () => {
      setLoading(true);
      try {
        // Simulate network request
        await new Promise(resolve => setTimeout(resolve, 1000));
        setWeather(mockWeatherData);
        setError(null);
      } catch (err) {
        setError("Failed to load weather data");
        console.error("Weather fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  // Map condition to icon name
  const getWeatherIcon = (condition) => {
    const iconMap = {
      Sunny: "Sun",
      Clear: "Sun",
      PartlyCloudy: "CloudSun",
      Cloudy: "Cloud",
      Overcast: "CloudFog",
      Rain: "CloudRain",
      Thunderstorm: "CloudLightning",
      Snow: "CloudSnow",
      Fog: "CloudFog",
      Mist: "CloudDrizzle"
    };
    
    return iconMap[condition] || "Cloud";
  };

  if (loading) {
    return (
      <div className="glassmorphism rounded-xl p-4 shadow-elevation-1 animate-pulse">
        <div className="h-24 bg-light-gray rounded-lg"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glassmorphism rounded-xl p-4 shadow-elevation-1">
        <div className="flex items-center justify-center text-error">
          <Icon name="AlertCircle" className="mr-2" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glassmorphism rounded-xl overflow-hidden shadow-elevation-1">
      <div className="bg-gradient-to-r from-sky to-info p-3">
        <div className="flex justify-between items-center">
          <h3 className="text-white font-heading font-medium">Weather Update</h3>
          <span className="text-white text-sm">{weather.location}</span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Icon 
              name={getWeatherIcon(weather.condition)} 
              size={48} 
              className="text-warning mr-3" 
            />
            <div>
              <div className="text-2xl font-heading font-bold">{weather.temperature}°C</div>
              <div className="text-dark-gray">{weather.condition}</div>
            </div>
          </div>
          
          <div className="flex flex-col text-right">
            <div className="flex items-center justify-end text-dark-gray">
              <Icon name="Droplets" size={16} className="mr-1" />
              <span>{weather.humidity}%</span>
            </div>
            <div className="flex items-center justify-end text-dark-gray mt-1">
              <Icon name="Wind" size={16} className="mr-1" />
              <span>{weather.windSpeed} km/h</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-3 border-t border-medium-gray border-opacity-20">
          <div className="flex justify-between">
            {weather.forecast.map((day, index) => (
              <div key={index} className="text-center">
                <div className="text-sm text-dark-gray">{day.day}</div>
                <Icon 
                  name={getWeatherIcon(day.condition)} 
                  size={24} 
                  className="mx-auto my-1 text-info" 
                />
                <div className="text-sm font-medium">{day.temp}°</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;