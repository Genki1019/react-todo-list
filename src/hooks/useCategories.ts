import { useState, useEffect } from "react";

const STORAGE_KEY = "category";

const useCategories = () => {
  const [categories, setCategories] = useState<string[]>(["Work", "Others"]);

  useEffect(() => {
    const storedCategories = localStorage.getItem(STORAGE_KEY);
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    }
  }, []);

  useEffect(() => {
    if (categories.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
    }
  }, [categories]);

  return [categories, setCategories] as const;
};

export default useCategories;
