import { ChangeEvent, FormEvent } from "react";
import DatePicker from "react-datepicker";

type RegisterFormProps = {
  title: string;
  deadline: Date | null;
  handleTitleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleDeadlineChange: (date: Date | null) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

function RegisterForm({
  title,
  deadline,
  handleTitleChange,
  handleDeadlineChange,
  handleSubmit,
}: RegisterFormProps) {
  return (
    <>
      <form onSubmit={handleSubmit} className="registerForm">
        <label htmlFor="title" className="label">
          タイトル
        </label>
        <input
          id="title"
          className="registerTextbox"
          type="text"
          value={title}
          onChange={(e) => handleTitleChange(e)}
          placeholder="Todoを入力してください"
        />
        <label htmlFor="deadline" className="label">
          期限日
        </label>
        <DatePicker
          id="deadline"
          selected={deadline}
          onChange={handleDeadlineChange}
          dateFormat="yyyy/MM/dd"
          className="registerTextbox"
          wrapperClassName="custom-datepicker-wrapper"
          placeholderText="期限を選択してください"
        />
        <button type="submit" className="registerButton">
          追加
        </button>
      </form>
    </>
  );
}

export default RegisterForm;
