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

import { WeatherDataWithUnits } from "@/types/weather-api";

const LOCAL_STORAGE_KEY = "weatherBookmarks";

const WeatherBookmarksContext = createContext<{
  bookmarks: WeatherDataWithUnits[];
  setBookmarks: Dispatch<SetStateAction<WeatherDataWithUnits[]>>;
}>({ bookmarks: [], setBookmarks: () => null });

export const WeatherBookmarksProvider: FC<PropsWithChildren<object>> = ({
  children,
}) => {
  const [bookmarks, setBookmarks] = useState<WeatherDataWithUnits[]>([]);

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

  const addBookmark = (weatherData: WeatherDataWithUnits) => {
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

  const removeBookmark = (id: WeatherDataWithUnits["id"]) => {
    const updatedBookmarks = bookmarks.filter((bookmark) => bookmark.id !== id);
    setBookmarks(updatedBookmarks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedBookmarks));
  };

  return { bookmarks, addBookmark, removeBookmark };
};
