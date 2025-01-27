import { FC } from "react";
import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudMoon,
  CloudRain,
  CloudSnow,
  CloudSun,
  HelpCircle,
  LucideIcon,
  Moon,
  Sun,
} from "lucide-react";

import type { WeatherData } from "../../types/weather-api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  weather: WeatherData;
};

export const getWeatherIcon = (icon: string): LucideIcon => {
  const iconMap: Record<string, LucideIcon> = {
    "01d": Sun,
    "01n": Moon,
    "02d": CloudSun,
    "02n": CloudMoon,
    "03d": Cloud,
    "03n": Cloud,
    "04d": Cloud,
    "04n": Cloud,
    "09d": CloudDrizzle,
    "09n": CloudDrizzle,
    "10d": CloudRain,
    "10n": CloudRain,
    "11d": CloudLightning,
    "11n": CloudLightning,
    "13d": CloudSnow,
    "13n": CloudSnow,
    "50d": CloudFog,
    "50n": CloudFog,
  };

  return iconMap[icon] || HelpCircle;
};

const WeatherDisplay: FC<Props> = ({ weather }) => {
  const WeatherIcon = getWeatherIcon(weather.weather[0].icon);
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{weather.name}</CardTitle>
          <WeatherIcon />
        </div>
      </CardHeader>
      <CardContent>
        <p>Temperature: {weather.main.temp}°C</p>
        <p>Feels like: {weather.main.feels_like}°C</p>
        <p>Humidity: {weather.main.humidity}%</p>
        <p>Weather: {weather.weather[0].description}</p>
      </CardContent>
    </Card>
  );
};
export default WeatherDisplay;
