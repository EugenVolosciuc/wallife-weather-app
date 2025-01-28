"use client";

import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

import { WeatherData } from "@/types/weather-api";

const LOCAL_STORAGE_KEY = "weatherBookmarks";

const WeatherBookmarksContext = createContext<{
  bookmarks: WeatherData[];
  setBookmarks: Dispatch<SetStateAction<WeatherData[]>>;
}>({ bookmarks: [], setBookmarks: () => null });

export const WeatherBookmarksProvider: FC<PropsWithChildren<object>> = ({
  children,
}) => {
  const [bookmarks, setBookmarks] = useState<WeatherData[]>([]);

  return (
    <WeatherBookmarksContext.Provider value={{ bookmarks, setBookmarks }}>
      {children}
    </WeatherBookmarksContext.Provider>
  );
};

export const useWeatherBookmarks = () => {
  const { bookmarks, setBookmarks } = useContext(WeatherBookmarksContext);

  useEffect(() => {
    const storedBookmarks = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedBookmarks) {
      setBookmarks(JSON.parse(storedBookmarks));
    }
  }, [setBookmarks]);

  const addBookmark = (weatherData: WeatherData) => {
    if (bookmarks.some((bookmark) => bookmark.id === weatherData.id)) {
      console.warn(
        `Weather data with id ${weatherData.id} is already bookmarked.`
      );
      return;
    }

    const updatedBookmarks = [...bookmarks, weatherData];
    setBookmarks(updatedBookmarks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedBookmarks));
  };

  const removeBookmark = (id: WeatherData["id"]) => {
    const updatedBookmarks = bookmarks.filter((bookmark) => bookmark.id !== id);
    setBookmarks(updatedBookmarks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedBookmarks));
  };

  return { bookmarks, addBookmark, removeBookmark };
};
