type Todo = {
  id: string;
  title: string;
  isCompleted: boolean;
  deadline: string;
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
  const getDiffInDays = (deadline: string): number => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    return Math.ceil(
      (deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
  };

  const getFontColor = (diffInDays: number): string => {
    if (diffInDays <= 1) return "#f93840";
    if (diffInDays <= 3) return "#c98d00";
    return "";
  };

  const getBackgroundColor = (diffInDays: number): string => {
    if (diffInDays <= 1) return "#feeff1";
    if (diffInDays <= 3) return "#fcfae1";
    return "";
  };

  return (
    <ul className="todoList">
      {todos.map((todo) => {
        const diffInDays = getDiffInDays(todo.deadline);
        const fontColor = getFontColor(diffInDays);
        const backgroundColor = getBackgroundColor(diffInDays);

        return (
          <li key={todo.id} className="todoContent">
            <input
              type="checkbox"
              className="checkbox"
              checked={todo.isCompleted}
              onChange={() => handleCheck(todo.id)}
              style={{
                backgroundColor: backgroundColor,
              }}
            />
            <input
              type="text"
              className="todoTitle"
              value={todo.title}
              onChange={(e) => handleEdit(todo.id, e.target.value)}
              disabled={todo.isCompleted}
              style={{
                color: fontColor,
                backgroundColor: backgroundColor,
              }}
            />
            <button
              type="button"
              className="deleteButton"
              onClick={() => handleDelete(todo.id)}
            >
              <img src="/delete-btn.svg" alt="削除" />
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default TodoList;
