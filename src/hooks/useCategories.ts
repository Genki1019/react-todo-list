import { useState, useEffect } from "react";
import {
  CATEGORY_STORAGE_KEY,
  DEFAULT_CATEGORIES,
} from "../constants/constants";

const useCategories = () => {
  const [categories, setCategories] = useState<string[]>(() => {
    const storedCategories = localStorage.getItem(CATEGORY_STORAGE_KEY);
    return storedCategories ? JSON.parse(storedCategories) : DEFAULT_CATEGORIES;
  });

  useEffect(() => {
    if (categories.length) {
      localStorage.setItem(CATEGORY_STORAGE_KEY, JSON.stringify(categories));
    }
  }, [categories]);

  return [categories, setCategories] as const;
};

export default useCategories;
