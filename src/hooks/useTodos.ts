import { useState, useEffect } from "react";
import { Todo } from "../types";

const STORAGE_KEY = "todos";

const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const storedTodos = localStorage.getItem(STORAGE_KEY);
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    if (todos.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }
  }, [todos]);

  return [todos, setTodos] as const;
};

export default useTodos;
