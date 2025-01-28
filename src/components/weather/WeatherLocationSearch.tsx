"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WeatherData } from "@/types/weather-api";
import WeatherDisplay from "./LocationWeatherDisplay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MeasurementSystem } from "@/types/misc";
import { useMeasurementSystem } from "@/lib/hooks/useMeasurementSystem";

const WeatherLocationSearch = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const { measurementSystem, setMeasurementSystem } = useMeasurementSystem();
  const [search, setSearch] = useState("");

  const handleSearch = async () => {
    if (!search) return;

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

  const handleUnitChange = (systemUnit: MeasurementSystem) => {
    setMeasurementSystem(systemUnit);
  };

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>
          <div className="flex justify-between items-center">
            <span>Weather search</span>
            <Tabs
              value={measurementSystem}
              onValueChange={(value) =>
                handleUnitChange(value as MeasurementSystem)
              }
            >
              <TabsList>
                <TabsTrigger value="imperial">Imperial</TabsTrigger>
                <TabsTrigger value="metric">Metric</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-16">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleSearch();
            }}
            className="flex flex-col md:flex-row w-full sm:w-auto max-w-64 sm:max-w-none gap-2 mb-4"
            noValidate
          >
            <Input
              data-testid="location-search-input"
              className="md:w-56"
              type="text"
              placeholder="Search for a city"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button data-testid="location-search-btn" type="submit">
              Search
            </Button>
          </form>
          {weatherData && <WeatherDisplay weather={weatherData} />}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherLocationSearch;
