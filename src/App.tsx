import { ChangeEvent, FormEvent, useState } from "react";
import "./App.css";
import RegisterForm from "./RegisterForm";
import { v4 as uuid } from "uuid";

function App() {
  type Todo = {
    id: string;
    title: string;
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
    };
    setTodos([newTodo, ...todos]);
    setText("");
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
        <ul className="todoList">
          {todos.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
