# Wallife Weather App

> This is a simple weather app created as part of the Wallife collaboration process.

## Features

- Check the current weather in a city
- Bookmark your favourite cities
- Toggle temperature between Celsius and Fahrenheit

## Improvement potential

- Update the weather data for bookmarked cities
  - Currently, the bookmarked weather data is not updated as time passes and weather conditions change
- API call caching
  - This could be achieved by using a library such as react-query, which would cache the data for a specified period of time, or implement an in-memory caching mechanism manually

## Technologies

- React
- NextJS (App Router)
- Tailwind CSS
- shadcn/ui for fast prototyping
- Cypress for end-to-end testing

## Local development

- Add a `.env` file with all required values
  - [OPEN_WEATHER_API_KEY](https://openweathermap.org/)
- Install dependencies - `pnpm i`
- Run application - `pnpm dev`

## Tests

Make sure you have the application running locally before running the Cypress tests.
You can either run the tests one-by-one from the Cypress interface, opening it with the `pnpm cypress:open` command, or run them all in headless mode with `pnpm cypress:run`.
