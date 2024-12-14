import { ChangeEvent, FormEvent, useState } from "react";
import "./App.css";
import RegisterForm from "./RegisterForm";
import { v4 as uuid } from "uuid";
import TodoList from "./TodoList";

function App() {
  type Todo = {
    id: string;
    title: string;
    isCompleted: boolean;
  };

  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

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
