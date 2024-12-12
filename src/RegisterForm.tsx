import { ChangeEvent, FormEvent } from "react";

type RegisterFormProps = {
  text: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

function RegisterForm({ text, handleChange, handleSubmit }: RegisterFormProps) {
  return (
    <>
      <form onSubmit={handleSubmit} className="registerForm">
        <input
          className="registerTextbox"
          type="text"
          value={text}
          onChange={(e) => handleChange(e)}
          placeholder="Todoを入力してください"
        />
        <button type="submit" className="registerButton">
          追加
        </button>
      </form>
    </>
  );
}

export default RegisterForm;
