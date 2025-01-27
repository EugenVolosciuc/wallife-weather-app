import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BookmarkedLocationsContainer = () => {
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Bookmarked locations</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
    </Card>
  );
};

export default BookmarkedLocationsContainer;
