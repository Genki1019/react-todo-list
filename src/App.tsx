import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import "./App.css";
import RegisterForm from "./RegisterForm";
import TodoList from "./TodoList";
import { v4 as uuid } from "uuid";

type Todo = {
  id: string;
  title: string;
  isCompleted: boolean;
};

const STORAGE_KEY = "todos";

function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;

      const storedTodos = localStorage.getItem(STORAGE_KEY);
      if (storedTodos) {
        try {
          setTodos(JSON.parse(storedTodos));
        } catch (error) {
          console.error("ローカルストレージのデータが不正です。", error);
        }
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text) return;

    const newTodo: Todo = {
      id: uuid(),
      title: text,
      isCompleted: false,
    };
    setTodos([newTodo, ...todos]);
    setText("");
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

  const handleEdit = (id: string, newTitle: string) => {
    setTodos((prevTodos) => {
      return prevTodos.map((prevTodo) =>
        prevTodo.id === id ? { ...prevTodo, title: newTitle } : prevTodo
      );
    });
  };

  const handleDelete = (id: string) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((prevTodo) => prevTodo.id !== id);
    });
  };

  return (
    <>
      <div className="container">
        <h1>Todoリスト</h1>
        <RegisterForm
          text={text}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
        <TodoList
          todos={todos}
          handleCheck={handleCheck}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>
    </>
  );
}

export default App;
