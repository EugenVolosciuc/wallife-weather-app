import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const location = searchParams.get("location")?.toLowerCase() || "";
  const units = searchParams.get("metric") || "metric";

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&appid=${process.env.OPEN_WEATHER_API_KEY}`
  );

  const data = await response.json();

  return NextResponse.json(data);
}
