import { useState, useEffect } from "react";
import { Todo } from "../types";
import { TODO_STORAGE_KEY } from "../constants/constants";

const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const storedTodos = localStorage.getItem(TODO_STORAGE_KEY);
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    if (todos.length) {
      localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
    }
  }, [todos]);

  return [todos, setTodos] as const;
};

export default useTodos;
