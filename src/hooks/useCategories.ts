import { useState, useEffect } from "react";

const STORAGE_KEY = "category";

const defaultCategories = ["All", "Work", "Others"];

const useCategories = () => {
  const [categories, setCategories] = useState<string[]>(() => {
    const storedCategories = localStorage.getItem(STORAGE_KEY);
    return storedCategories ? JSON.parse(storedCategories) : defaultCategories;
  });

  useEffect(() => {
    if (categories.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
    }
  }, [categories]);

  return [categories, setCategories] as const;
};

export default useCategories;
