import { ChangeEvent, FormEvent, useState } from "react";
import { nanoid } from "nanoid";
import "./App.css";

function App() {
  type Todo = {
    inputValue: string;
    id: string;
    isCompleted: boolean;
  };

  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const newTodo: Todo = {
      inputValue: inputValue,
      id: nanoid(),
      isCompleted: false,
    };
    setTodos([newTodo, ...todos]);
    setInputValue("");
  };

  const handleEdit = (id: string, inputValue: string) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, inputValue } : todo
    );
    setTodos(newTodos);
  };

  const handleCheck = (id: string) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setTodos(newTodos);
  };

  const handleDelete = (id: string) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <div>
        <h2>Todoリスト</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            className="inputText"
            placeholder="新しいタスクを入力"
          />
          <input type="submit" value="追加" className="submitButton" />
        </form>
        <ul className="todoList">
          {todos.map((todo) => (
            <li key={todo.id}>
              <input
                type="text"
                value={todo.inputValue}
                onChange={(e) => handleEdit(todo.id, e.target.value)}
                className="inputText"
                disabled={todo.isCompleted}
              />
              <label>
                <input
                  type="checkbox"
                  onChange={() => handleCheck(todo.id)}
                  checked={todo.isCompleted}
                />
                完了
              </label>
              <button onClick={() => handleDelete(todo.id)}>削除</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
