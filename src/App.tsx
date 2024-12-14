import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";
import RegisterForm from "./RegisterForm";
import TodoList from "./TodoList";
import { v4 as uuid } from "uuid";

type Todo = {
  id: string;
  title: string;
  isCompleted: boolean;
  deadline: string;
};

const STORAGE_KEY = "todos";

function App() {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [deadline, setDeadline] = useState<Date | null>(null);
  const isFirstRun = useRef(true);

  const loadTodosFromLocalStorage = (): Todo[] => {
    try {
      const storedTodos = localStorage.getItem(STORAGE_KEY);
      return storedTodos ? JSON.parse(storedTodos) : [];
    } catch (error) {
      console.error("Failed to parse local storage data:", error);
      return [];
    }
  };

  const saveTodosToLocalStorage = (todos: Todo[]): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  };

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      setTodos(loadTodosFromLocalStorage());
    }
  }, []);

  useEffect(() => {
    saveTodosToLocalStorage(todos);
  }, [todos]);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDeadlineChange = (date: Date | null) => {
    setDeadline(date);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (!deadline) return;
    const localDate = new Date(
      deadline.getFullYear(),
      deadline.getMonth(),
      deadline.getDate()
    )
      .toISOString()
      .split("T")[0];

    const newTodo: Todo = {
      id: uuid(),
      title: title.trim(),
      isCompleted: false,
      deadline: localDate,
    };
    setTodos([newTodo, ...todos]);
    setTitle("");
    setDeadline(null);
  };

  const handleCheck = (id: string) => {
    setTodos((prevTodos) => {
      return prevTodos.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, isCompleted: !prevTodo.isCompleted }
          : prevTodo
      );
    });
  };

  const handleTitleEdit = (id: string, newTitle: string) => {
    setTodos((prevTodos) => {
      return prevTodos.map((prevTodo) =>
        prevTodo.id === id ? { ...prevTodo, title: newTitle.trim() } : prevTodo
      );
    });
  };

  const handleDeadlineEdit = (id: string, newDeadline: string) => {
    setTodos((prevTodos) => {
      return prevTodos.map((prevTodo) =>
        prevTodo.id === id ? { ...prevTodo, deadline: newDeadline } : prevTodo
      );
    });
  };

  const handleDelete = (id: string) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((prevTodo) => prevTodo.id !== id);
    });
  };

  const handleBulkDelete = () => {
    setTodos((prevTodos) => {
      return prevTodos.filter((prevTodo) => prevTodo.isCompleted === false);
    });
  };

  const hasCompletedTodos =
    todos.filter((todo) => todo.isCompleted).length >= 2;

  return (
    <>
      <div className="container">
        <h1>Todoリスト</h1>
        <RegisterForm
          title={title}
          deadline={deadline}
          handleTitleChange={handleTitleChange}
          handleDeadlineChange={handleDeadlineChange}
          handleSubmit={handleSubmit}
        />
        <TodoList
          todos={todos}
          handleCheck={handleCheck}
          handleTitleEdit={handleTitleEdit}
          handleDeadlineEdit={handleDeadlineEdit}
          handleDelete={handleDelete}
        />
        {hasCompletedTodos && (
          <button className="bulkDeleteButton" onClick={handleBulkDelete}>
            完了済みのタスクを一括削除
          </button>
        )}
      </div>
    </>
  );
}

export default App;
