import React, { useEffect, useState } from "react";
import {
  getSingaporeWeatherForecast,
  DailyWeatherData,
} from "../utils/weather.js";
import "../styles/Weather.css";

const Weather: React.FC = () => {
  const [weatherData, setWeatherData] = useState<DailyWeatherData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const data = await getSingaporeWeatherForecast();
        setWeatherData(data);
        setLoading(false);
      } catch (error) {
        console.error("Weather fetch error:", error);
        // keep loading state true on error
      }
    };
    fetchWeather();
  }, []);

  const formatDisplayDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
    });
  };

  if (loading) {
    return null;
  }

  return (
    <div className="weather-container">
      {weatherData.map((day) => (
        <div key={day.date} className="weather-box">
          <div className="weather-day">{formatDisplayDate(day.date)}</div>
          <div>Condition:</div>
          <div>{day.weatherDescription}</div>
          <div>Temperature:</div>
          <div>
            {Math.round(day.minTemp)} - {Math.round(day.maxTemp)}°
          </div>
          <div>Precipitation:</div>
          <div>
            {day.precipitation > 0 ? `${day.precipitation}mm rain` : "No rain"}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Weather;
