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

import type { WeatherDataWithUnits } from "../../types/weather-api";
import { Card, CardContent } from "@/components/ui/card";
import { useWeatherBookmarks } from "@/lib/hooks/useWeatherBookmarks";
import { cn } from "@/lib/utils";
import { Units } from "@/types/misc";

type Props = {
  weather: WeatherDataWithUnits;
  units?: Units;
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
  const { bookmarks, addBookmark, removeBookmark } = useWeatherBookmarks();
  const WeatherIcon = getWeatherIcon(weather.weather[0].icon);

  const locationBookmarked = bookmarks.find(
    (bookmark) => bookmark.id === weather.id
  );

  const unitSymbol = weather.units === "metric" ? "°C" : "°F";

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
              {Math.round(weather.main.temp)}
              {unitSymbol}
            </p>
            <p className="text-xs text-muted-foreground">
              Feels like: {Math.round(weather.main.feels_like)}
              {unitSymbol}
            </p>
          </div>
          <WeatherIcon className="w-12 h-12" />
        </div>
        <div className="mt-2">
          <p className="space-x-2">
            <span className="text-xs">
              H: {Math.round(weather.main.temp_max)}
              {unitSymbol}
            </span>
            <span className="text-xs">
              L: {Math.round(weather.main.temp_min)}
              {unitSymbol}
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
