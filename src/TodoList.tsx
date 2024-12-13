type Todo = {
  id: string;
  title: string;
  isCompleted: boolean;
};

type TodoListProps = {
  todos: Todo[];
  handleCheck: (id: string) => void;
  handleEdit: (id: string, newTitle: string) => void;
  handleDelete: (id: string) => void;
};

function TodoList({
  todos,
  handleCheck,
  handleEdit,
  handleDelete,
}: TodoListProps) {
  return (
    <ul className="todoList">
      {todos.map((todo) => (
        <li key={todo.id} className="todoContent">
          <input
            type="checkbox"
            className="checkbox"
            checked={todo.isCompleted}
            onChange={() => handleCheck(todo.id)}
          />
          <input
            type="text"
            className="todoTitle"
            value={todo.title}
            onChange={(e) => handleEdit(todo.id, e.target.value)}
            disabled={todo.isCompleted}
          />
          <button
            type="button"
            className="deleteButton"
            onClick={() => handleDelete(todo.id)}
          >
            <img src="/delete-btn.svg" alt="削除" />
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
