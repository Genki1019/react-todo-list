import TodoCard from "./TodoCard";
import { Todo } from "./types";

type TodoListProps = {
  todos: Todo[];
  toggleCompletion: (id: string) => void;
  handleTitleEdit: (id: string, newTitle: string) => void;
  handleDeadlineEdit: (id: string, newDeadline: string) => void;
  handleDelete: (id: string) => void;
};

function TodoList({
  todos,
  toggleCompletion,
  handleTitleEdit,
  handleDeadlineEdit,
  handleDelete,
}: TodoListProps) {
  return (
    <div className="todoList">
      {todos.map((todo) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          toggleCompletion={toggleCompletion}
          handleTitleEdit={handleTitleEdit}
          handleDeadlineEdit={handleDeadlineEdit}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
}

export default TodoList;
