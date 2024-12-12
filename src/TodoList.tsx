type Todo = {
  id: string;
  title: string;
  isCompleted: boolean;
};

type TodoListProps = {
  todos: Todo[];
  handleCheck: (id: string) => void;
};

function TodoList({ todos, handleCheck }: TodoListProps) {
  return (
    <ul className="todoList">
      {todos.map((todo) => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.isCompleted}
            onClick={() => handleCheck(todo.id)}
          />
          <input type="text" value={todo.title} disabled={todo.isCompleted} />
          <button type="button" className="deleteButton">
            <img src="./public/delete-btn.svg" alt="削除" />
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
