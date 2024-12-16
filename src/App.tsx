import { ChangeEvent, FormEvent, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";
import RegisterForm from "./RegisterForm";
import TodoList from "./TodoList";
import SortControls from "./SortControls";
import useTodos from "./hooks/useTodos";
import useSortTodos from "./hooks/useSortTodos";
import useCategories from "./hooks/useCategories";
import { SortOrder, Todo } from "./types";
import { v4 as uuid } from "uuid";
import CategoryTabs from "./CategoryTabs";
import { DEFAULT_CATEGORIES } from "./types/constants";
import BulkDeleteButton from "./BulkDeleteButton";
import { formatDate } from "./utils/formatDate";

function App() {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useTodos();
  const [deadline, setDeadline] = useState<Date | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.CREATED_ASC);
  const sortedTodos = useSortTodos(todos, sortOrder);
  const [categories, setCategories] = useCategories();
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const filteredTodos = sortedTodos.filter(
    (todo) =>
      activeCategory === DEFAULT_CATEGORIES[0] ||
      todo.category === activeCategory
  );

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
      category: activeCategory,
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
    filteredTodos.filter((todo) => todo.isCompleted).length >= 2;

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const handleCategoryAdd = () => {
    const newCategory = prompt("新しいカテゴリ名を入力してください");
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setActiveCategory(newCategory);
    }
  };

  const handleCategoryDelete = (categoryToDelete: string) => {
    setCategories((prevCategories) =>
      prevCategories.filter((category) => category !== categoryToDelete)
    );
    if (activeCategory === categoryToDelete && categories.length > 1) {
      setActiveCategory(categories[0]);
    }
  };

  const handleCategoryReorder = (sourceIndex: number, targetIndex: number) => {
    const updatedCategories = [...categories];
    const [movedCategory] = updatedCategories.splice(sourceIndex, 1);
    updatedCategories.splice(targetIndex, 0, movedCategory);
    setCategories(updatedCategories);
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

        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          handleCategoryChange={handleCategoryChange}
          handleCategoryAdd={handleCategoryAdd}
          handleCategoryDelete={handleCategoryDelete}
          handleCategoryReorder={handleCategoryReorder}
        />

        <SortControls
          sortOrder={sortOrder}
          handleSortOrderChange={setSortOrder}
        />

        <TodoList
          todos={filteredTodos}
          toggleCompletion={toggleCompletion}
          handleTitleEdit={handleTitleEdit}
          handleDeadlineEdit={handleDeadlineEdit}
          handleDelete={handleDelete}
        />

        <BulkDeleteButton
          hasCompletedTodos={hasCompletedTodos}
          handleBulkDelete={handleBulkDelete}
        />
      </div>
    </>
  );
}

export default App;
