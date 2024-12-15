import { useState, useEffect } from "react";

const STORAGE_KEY = "category";

const DEFAULT_CATEGORIES = ["All", "Work", "Others"];

const useCategories = () => {
  const [categories, setCategories] = useState<string[]>(() => {
    const storedCategories = localStorage.getItem(STORAGE_KEY);
    return storedCategories ? JSON.parse(storedCategories) : DEFAULT_CATEGORIES;
  });

  useEffect(() => {
    if (categories.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
    }
  }, [categories]);

  return [categories, setCategories] as const;
};

export default useCategories;
