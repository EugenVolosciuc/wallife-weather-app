import BookmarkedLocationsContainer from "@/components/weather/BookmarkedLocationsContainer";
import LocationSearchContainer from "@/components/weather/WeatherLocationSearch";
import { MeasurementSystemProvider } from "@/lib/hooks/useMeasurementSystem";
import { WeatherBookmarksProvider } from "@/lib/hooks/useWeatherBookmarks";

export default function Home() {
  return (
    <div className="container mx-auto mt-4 flex flex-wrap gap-4 px-4 md:px-0">
      <MeasurementSystemProvider>
        <WeatherBookmarksProvider>
          <LocationSearchContainer />
          <BookmarkedLocationsContainer />
        </WeatherBookmarksProvider>
      </MeasurementSystemProvider>
    </div>
  );
}
