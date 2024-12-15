import { SortOrder, Todo } from "../types";

const useSortTodos = (todos: Todo[], sortOrder: SortOrder): Todo[] => {
  return [...todos].sort((a, b) => {
    if (a.isCompleted !== b.isCompleted) {
      return a.isCompleted ? 1 : -1;
    }

    switch (sortOrder) {
      case SortOrder.CREATED_ASC:
        return 0;
      case SortOrder.CREATED_DESC:
        return todos.indexOf(b) - todos.indexOf(a);
      case SortOrder.DEADLINE_ASC:
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      case SortOrder.DEADLINE_DESC:
        return new Date(b.deadline).getTime() - new Date(a.deadline).getTime();
      default:
        return 0;
    }
  });
};

export default useSortTodos;
