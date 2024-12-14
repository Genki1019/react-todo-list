import DatePicker from "react-datepicker";

type Todo = {
  id: string;
  title: string;
  isCompleted: boolean;
  deadline: string;
};

type TodoCardProps = {
  todo: Todo;
  handleCheck: (id: string) => void;
  handleTitleEdit: (id: string, newTitle: string) => void;
  handleDeadlineEdit: (id: string, newDeadline: string) => void;
  handleDelete: (id: string) => void;
};

const DANGER_FONT_COLOR = "#f93840";
const DANGER_BACKGROUND_COLOR = "#feeff1";
const WARNING_FONT_COLOR = "#c98d00";
const WARNING_BACKGROUND_COLOR = "#fcfae1";

function TodoCard({
  todo,
  handleCheck,
  handleTitleEdit,
  handleDeadlineEdit,
  handleDelete,
}: TodoCardProps) {
  const getDiffInDays = (deadline: string): number => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    return Math.ceil(
      (deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
  };

  const diffInDays = getDiffInDays(todo.deadline);

  const getFontColor = (diffInDays: number): string => {
    if (diffInDays <= 1) return DANGER_FONT_COLOR;
    if (diffInDays <= 3) return WARNING_FONT_COLOR;
    return "";
  };

  const getBackgroundColor = (diffInDays: number): string => {
    if (diffInDays <= 1) return DANGER_BACKGROUND_COLOR;
    if (diffInDays <= 3) return WARNING_BACKGROUND_COLOR;
    return "";
  };

  const backgroundColor = getBackgroundColor(diffInDays);
  const fontColor = getFontColor(diffInDays);

  return (
    <div className="todoCard" style={{ backgroundColor }}>
      <div className="todoHeader">
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
          onChange={(e) => handleTitleEdit(todo.id, e.target.value)}
          disabled={todo.isCompleted}
          style={{ color: fontColor }}
        />
      </div>

      <div className="todoFooter" style={{ color: fontColor }}>
        <DatePicker
          selected={new Date(todo.deadline)}
          onChange={(date: Date | null) => {
            if (date) {
              handleDeadlineEdit(todo.id, date.toISOString().split("T")[0]);
            }
          }}
          dateFormat="yyyy/MM/dd"
          className="todoDeadline"
          disabled={todo.isCompleted}
        />
        <button
          type="button"
          className="deleteButton"
          onClick={() => handleDelete(todo.id)}
        >
          <img src="/delete-btn.svg" alt="削除" />
        </button>
      </div>
    </div>
  );
}

export default TodoCard;
