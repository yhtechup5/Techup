interface WeatherForecast {
  latitude: number;
  longitude: number;
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
    precipitation_sum: number[];
  };
}

const weatherDescriptions: { [key: number]: string } = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  71: "Slight snow fall",
  73: "Moderate snow fall",
  75: "Heavy snow fall",
  80: "Slight rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
  95: "Thunderstorm",
  96: "Thunderstorm with slight hail",
  99: "Thunderstorm with heavy hail",
};

export interface DailyWeatherData {
  date: string;
  maxTemp: number;
  minTemp: number;
  precipitation: number;
  weatherDescription: string;
}

export async function getSingaporeWeatherForecast(): Promise<
  DailyWeatherData[]
> {
  const latitude = 1.3521;
  const longitude = 103.8198;

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_sum&timezone=Asia%2FSingapore&forecast_days=3`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }
  const weatherData: WeatherForecast = await response.json();

  return weatherData.daily.time.map(
    (date, index) => {
      const maxTemp = weatherData.daily.temperature_2m_max[index];
      const minTemp = weatherData.daily.temperature_2m_min[index];
      const weatherCode = weatherData.daily.weather_code[index];
      const precipitation = weatherData.daily.precipitation_sum[index];
      const weatherDescription =
        weatherDescriptions[weatherCode] || "Unknown weather condition";
      return {
        date,
        maxTemp,
        minTemp,
        precipitation,
        weatherDescription,
      };
    },
  );
}
