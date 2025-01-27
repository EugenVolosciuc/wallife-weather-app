"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { WeatherData } from "@/types/weather-api";
import WeatherDisplay from "./LocationWeatherDisplay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const WeatherSearch = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [search, setSearch] = useState("");

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/weather?location=${search}`);
      const data = await response.json();

      if (!data.id) {
        return toast.error("Could not find the searched location");
      }

      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Weather search</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-16">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleSearch();
            }}
            className="flex gap-2 mb-4"
            noValidate
          >
            <Input
              className="w-56"
              type="text"
              placeholder="Search for a city"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button type="submit">Search</Button>
          </form>
          {weatherData && <WeatherDisplay weather={weatherData} canBookmark />}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherSearch;
