import { ChangeEvent, FormEvent, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";
import RegisterForm from "./RegisterForm";
import TodoList from "./TodoList";
import SortControls from "./SortControls";
import useTodos from "./hooks/useTodos";
import useSortTodos from "./hooks/useSortTodos";
import { SortOrder, Todo } from "./types";
import { v4 as uuid } from "uuid";

const formatDate = (date: Date): string => {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];
};

function App() {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useTodos();
  const [deadline, setDeadline] = useState<Date | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.CREATED_ASC);
  const sortedTodos = useSortTodos(todos, sortOrder);
  const [categories, setCategories] = useState<string[]>(["Study", "Work"]);
  const [selectedCategory, setSelectedCategory] = useState("Work");

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDeadlineChange = (date: Date | null) => {
    setDeadline(date);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim() || !deadline) return;

    const formattedDeadline = formatDate(deadline);

    const newTodo: Todo = {
      id: uuid(),
      title: title.trim(),
      isCompleted: false,
      deadline: formattedDeadline,
      category: selectedCategory,
    };
    setTodos([newTodo, ...todos]);
    setTitle("");
    setDeadline(null);
  };

  const toggleCompletion = (id: string) => {
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

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleCategoryAdd = () => {
    const newCategory = prompt("新しいカテゴリ名を入力してください");
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setSelectedCategory(newCategory);
    }
  };

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
        <div className="categoryTabsContainer">
          <div className="categoryTabs">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={selectedCategory === category ? "active" : ""}
              >
                {category}
              </button>
            ))}
            <button onClick={handleCategoryAdd} className="addCategoryButton">
              +
            </button>
          </div>
        </div>

        <SortControls
          sortOrder={sortOrder}
          handleSortOrderChange={setSortOrder}
        />
        <TodoList
          todos={sortedTodos}
          toggleCompletion={toggleCompletion}
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
