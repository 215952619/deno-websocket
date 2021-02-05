import { fetchData, persistData } from "./db.ts";
import { Todo } from "../models/todo.ts";
import { createId } from "./util.ts";

type TodoData = Pick<Todo, "userId" | "title" | "completed">;

export const getTodos = async (): Promise<Todo[]> => {
  const todos = await fetchData();

  return todos.sort((a, b) => a.title.localeCompare(b.title));
};

export const getTodo = async (todoId: String): Promise<Todo | undefined> => {
  const todos = await fetchData();

  return todos.find(({ id }) => id === todoId);
};

export const createTodo = async (todoData: TodoData): Promise<string> => {
  const todos = await fetchData();

  const newTodo: Todo = {
    id: createId(),
    ...todoData,
  };

  await persistData([...todos, newTodo]);

  return newTodo.id;
};

export const updateTodo = async (
  todoId: string,
  todoData: TodoData,
): Promise<void> => {
  const todo = await getTodo(todoId);

  if (!todo) {
    throw new Error("Todo not found");
  }

  const updateTodo = {
    ...todo,
    ...todoData,
  };

  const todos = await fetchData();

  const filterTodos = todos.filter(({ id }) => id !== todoId);

  persistData([...filterTodos, updateTodo]);
};

export const deleteTodo = async (todoId: string): Promise<void> => {
  const todos = await fetchData();

  const filterTodos = todos.filter(({ id }) => id !== todoId);

  persistData(filterTodos);
};
