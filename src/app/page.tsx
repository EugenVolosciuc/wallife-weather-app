import BookmarkedLocationsContainer from "@/components/weather/BookmarkedLocationsContainer";
import LocationSearchContainer from "@/components/weather/Search";

export default function Home() {
  return (
    <div className="container mx-auto mt-4 flex flex-wrap gap-4">
      <LocationSearchContainer />
      <BookmarkedLocationsContainer />
    </div>
  );
}
