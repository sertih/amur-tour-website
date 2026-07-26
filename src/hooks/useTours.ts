import { useState, useEffect } from "react";
import funcUrls from "../../backend/func2url.json";

export interface Tour {
  id: number;
  title: string;
  type: string;
  duration: number;
  price: number;
  difficulty: string;
  img: string;
  description: string;
  tag: string;
}

export function useTours() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(funcUrls["get-tours"])
      .then((res) => res.json())
      .then((data) => setTours(data.tours || []))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return { tours, loading, error };
}
