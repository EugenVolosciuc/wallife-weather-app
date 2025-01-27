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
  Heart,
  HelpCircle,
  LucideIcon,
  Moon,
  Sun,
} from "lucide-react";

import type { WeatherData } from "../../types/weather-api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  weather: WeatherData;
  canBookmark?: boolean;
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

const WeatherDisplay: FC<Props> = ({ weather, canBookmark }) => {
  const WeatherIcon = getWeatherIcon(weather.weather[0].icon);

  return (
    <Card className="bg-background relative min-w-56">
      {canBookmark && (
        <div className="absolute h-8 w-8 -top-3 -right-3 rounded-full bg-background shadow-md flex items-center justify-center group cursor-pointer">
          <Heart className="w-3/5 h-3/5 group-hover:text-red-500" />
        </div>
      )}
      {/* <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{weather.name}</CardTitle>
          <WeatherIcon />
        </div>
      </CardHeader> */}
      <CardContent className="text-sm !p-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-4xl">{Math.round(weather.main.temp)}°C</p>
            <p className="text-xs text-muted-foreground">
              Feels like: {Math.round(weather.main.feels_like)}°C
            </p>
          </div>
          <WeatherIcon className="w-12 h-12" />
        </div>
        <div className="mt-2">
          <p className="space-x-2">
            <span className="text-xs">
              H: {Math.round(weather.main.temp_max)}°C
            </span>
            <span className="text-xs">
              L: {Math.round(weather.main.temp_min)}°C
            </span>
          </p>
        </div>
        <div className="flex justify-between">
          <p className="font-medium">
            {weather.name}, {weather.sys.country}
          </p>
          <p className="capitalize">{weather.weather[0].description}</p>
        </div>
      </CardContent>
    </Card>
  );
};
export default WeatherDisplay;
