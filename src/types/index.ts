export type Todo = {
  id: string;
  title: string;
  isCompleted: boolean;
  deadline: string;
  category: string;
};

export enum SortOrder {
  CREATED_ASC = "createdAsc",
  CREATED_DESC = "createdDesc",
  DEADLINE_ASC = "deadlineAsc",
  DEADLINE_DESC = "deadlineDesc",
}
