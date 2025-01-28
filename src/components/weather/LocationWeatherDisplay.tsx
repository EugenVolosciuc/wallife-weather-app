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
import { Card, CardContent } from "@/components/ui/card";
import { useWeatherBookmarks } from "@/lib/hooks/useWeatherBookmarks";
import { cn } from "@/lib/utils";
import { MeasurementSystem } from "@/types/misc";
import { useMeasurementSystem } from "@/lib/hooks/useMeasurementSystem";
import { celsiusToFahrenheit } from "@/lib/converters";

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

const displayTemperature = (temp: number, systemUnit: MeasurementSystem) =>
  systemUnit === "imperial"
    ? Math.round(celsiusToFahrenheit(temp)) + "°F"
    : Math.round(temp) + "°C";

const WeatherDisplay: FC<Props> = ({ weather }) => {
  const { bookmarks, addBookmark, removeBookmark } = useWeatherBookmarks();
  const { measurementSystem } = useMeasurementSystem();
  const WeatherIcon = getWeatherIcon(weather.weather[0].icon);

  const locationBookmarked = bookmarks.find(
    (bookmark) => bookmark.id === weather.id
  );

  return (
    <Card className="bg-background relative min-w-56 group">
      <button
        data-testid="bookmark-btn"
        className="absolute h-8 w-8 -top-3 -right-3 rounded-full bg-background shadow-md flex items-center justify-center group focus:opacity-100 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() =>
          locationBookmarked ? removeBookmark(weather.id) : addBookmark(weather)
        }
      >
        <Heart
          className={cn(
            "w-3/5 h-3/5 group-hover:text-red-500",
            locationBookmarked && "text-red-400"
          )}
        />
      </button>
      <CardContent className="text-sm !p-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-4xl">
              {displayTemperature(weather.main.temp, measurementSystem)}
            </p>
            <p className="text-xs text-muted-foreground">
              Feels like:{" "}
              {displayTemperature(weather.main.feels_like, measurementSystem)}
            </p>
          </div>
          <WeatherIcon className="w-12 h-12" />
        </div>
        <div className="mt-2">
          <p className="space-x-2">
            <span className="text-xs">
              H: {displayTemperature(weather.main.temp_max, measurementSystem)}
            </span>
            <span className="text-xs">
              L: {displayTemperature(weather.main.temp_min, measurementSystem)}
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
