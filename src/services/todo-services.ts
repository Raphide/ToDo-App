import { TodoFormData } from "../components/TodoForm/schema";

const baseURL = import.meta.env.VITE_APP_API_BASE_URL;

// "id": 3,
// "createdAt": "2024-08-24T06:31:49.840+00:00",
// "task": "Test3",
// "description": "Creating this beautiful API",
// "category": "art",
// "priority": 2,
// "completed": false,
// "completedAt": null,
// "updatedAt": "2024-08-24T06:31:49.840+00:00"

export interface TodoResponse {
  id: number;
  createdAt: string;
  task: string;
  description: string;
  category: string;
  priority: string;
  completed: boolean;
  completedAt: string;
  updatedAt: string;
}

export const getAllTodos = async () => {
  const response = await fetch(baseURL + "/todos");
  if (!response.ok) {
    throw new Error("failed to fetch tasks");
  }
  return (await response.json()) as TodoResponse[];
};

export const getTodoById = async (id: number) => {
    const response = await fetch(baseURL + `/todos/${id}`);
    if (!response.ok) {
        if(response.status === 404){
            throw new Error(await response.text());
        }
        throw new Error("Something went wrong");
      }
      return (await response.json()) as TodoResponse;
}

export const getTodosByPriority = async (priority: string) => {
  const response = await fetch(baseURL + `/todos/priority=${priority}`);
  if (!response.ok) {
    if(response.status === 404){
        throw new Error(await response.text());
    }
    throw new Error("Something went wrong");
  }
  return (await response.json()) as TodoResponse[];
};

export const deleteTodoById = async (id: number) => {
  const response = await fetch(baseURL + `/todos/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete");
  }
  return true;
};

export const createTodo = async (data: TodoFormData) => {
  const response = await fetch(baseURL + "/todos", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to post");
  }
  return (await response.json()) as TodoResponse;
};

export const editTodoById = async (id: number, data: TodoFormData) => {
    const response = await fetch(baseURL + `/todos/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if(!response.ok){
        throw new Error("Something went wrong");
      }
      return (await response.json()) as TodoResponse;

}
