import { useState, useEffect } from "react";
import funcUrls from "../../backend/func2url.json";

export interface WeatherPoint {
  sun: number;
  water: number | null;
}

const urls: Record<string, string> = funcUrls;

export function useWeather() {
  const [weather, setWeather] = useState<Record<string, WeatherPoint>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = urls["get-weather"];
    if (!url) {
      setLoading(false);
      return;
    }
    fetch(url)
      .then((res) => res.json())
      .then((data) => setWeather(data.weather || {}))
      .catch(() => setWeather({}))
      .finally(() => setLoading(false));
  }, []);

  return { weather, loading };
}
