"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWeatherBookmarks } from "@/lib/hooks/useWeatherBookmarks";
import LocationWeatherDisplay from "./LocationWeatherDisplay";

const BookmarkedLocationsContainer = () => {
  const { bookmarks } = useWeatherBookmarks();

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Bookmarked locations</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-4">
        {bookmarks.map((weatherBookmark) => (
          <LocationWeatherDisplay
            key={"bookmark-" + weatherBookmark.id}
            weather={weatherBookmark}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default BookmarkedLocationsContainer;
