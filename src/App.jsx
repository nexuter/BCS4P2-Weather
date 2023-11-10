import { useEffect, useState } from "react";
import axios from "axios";
import {
  WiDaySunny,
  WiDayCloudy,
  WiCloud,
  WiCloudy,
  WiDust,
  WiSnowflakeCold,
  WiThunderstorm,
  WiRain,
  WiRainMix,
} from "react-icons/wi";

const weatherIcons = {
  "01": {
    textColor: "text-red-500",
    icon: <WiDaySunny size={120} />,
  },

  "02": {
    textColor: "text-red-300",
    icon: <WiDayCloudy size={120} />,
  },

  "03": {
    textColor: "text-gray-300",
    icon: <WiCloud size={120} />,
  },

  "04": {
    textColor: "text-gray-500",
    icon: <WiCloudy size={120} />,
  },

  "09": {
    textColor: "text-blue-500",
    icon: <WiRainMix size={120} />,
  },

  10: {
    textColor: "text-blue-300",
    icon: <WiRain size={120} />,
  },

  11: {
    textColor: "text-yellow-500",
    icon: <WiThunderstorm size={120} />,
  },

  13: {
    textColor: "text-white",
    icon: <WiSnowflakeCold size={120} />,
  },

  50: {
    textColor: "text-white",
    icon: <WiDust size={120} />,
  },
};

function App() {
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();
  const [weatherData, setWeatherData] = useState();

  function getGeolocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);
    });
  }

  async function getWeather() {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getGeolocation();
  }, []);

  useEffect(() => {
    if (!lat || !lon) return;
    getWeather();
  }, [lat, lon]);

  return (
    <div className="bg-pink-100 min-h-screen flex justify-center items-center">
      {weatherData ? (
        <div className="flex flex-col items-center">
          <div className="text-2xl">{weatherData.name}</div>
          <div
            className={` ${
              weatherIcons[weatherData.weather[0].icon.substring(0, 2)]
                .textColor
            } `}
          >
            {weatherIcons[weatherData.weather[0].icon.substring(0, 2)].icon}
          </div>
          <div>
            {parseInt(weatherData.main.temp, 10)}℃ (H:{" "}
            {parseInt(weatherData.main.temp_max, 10)}℃, L:{" "}
            {parseInt(weatherData.main.temp_min, 10)}℃)
          </div>
          <div>Feels like {parseInt(weatherData.main.feels_like, 10)}℃</div>
          <div>Humidity {parseInt(weatherData.main.humidity, 10)}%</div>
          <div>Wind {parseInt(weatherData.wind.speed, 10)}m/s</div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default App;
