import DatePicker from "react-datepicker";
import { Todo } from "../types";
import {
  DANGER_BACKGROUND_COLOR,
  DANGER_FONT_COLOR,
  WARNING_BACKGROUND_COLOR,
  WARNING_FONT_COLOR,
} from "../constants/constants";

type TodoCardProps = {
  todo: Todo;
  toggleCompletion: (id: string) => void;
  handleTitleEdit: (id: string, newTitle: string) => void;
  handleDeadlineEdit: (id: string, newDeadline: string) => void;
  handleDelete: (id: string) => void;
};

function TodoCard({
  todo,
  toggleCompletion,
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
          onChange={() => toggleCompletion(todo.id)}
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
