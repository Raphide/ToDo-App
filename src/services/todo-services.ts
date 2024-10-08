import { CategoryFormData } from "../components/CategoryForm/schema";
import { TodoFormData } from "../components/TodoForm/schema";

const baseURL = import.meta.env.VITE_APP_API_BASE_URL;

export interface TodoResponse {
  id: number;
  createdAt: string;
  updatedAt: string;
  task: string;
  description: string;
  category: Category;
  categoryId: string;
  priority: string;
  completed: boolean;
  completedAt: string;
  isArchived: boolean;
}

export interface Category {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  todos: Array<TodoResponse>;
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
    if (response.status === 404) {
      throw new Error(await response.text());
    }
    throw new Error("Something went wrong");
  }
  return (await response.json()) as TodoResponse;
};

export const getTodosByPriority = async (priority: string) => {
  const response = await fetch(baseURL + `/todos/priority=${priority}`);
  if (!response.ok) {
    if (response.status === 404) {
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

export const duplicateTodo = async (id: number) => {
  const response = await fetch(baseURL + `/todos/duplicate/${id}`, {
    method: "POST",
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
  if (!response.ok) {
    throw new Error("Something went wrong");
  }
  return (await response.json()) as TodoResponse;
};

export const completeTodoById = async (id: number) => {
  const response = await fetch(baseURL + `/todos/complete/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Something went wrong");
  }
  return (await response.json()) as TodoResponse;
};

export const archiveTodoById = async (id: number) => {
  const response = await fetch(baseURL + `/todos/archive/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Something went wrong");
  }
  return (await response.json()) as TodoResponse;
};

export const getAllCategories = async () => {
  const response = await fetch(baseURL + "/categories");
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }
  return (await response.json()) as Category[];
};

export const createCategory = async (data: CategoryFormData) => {
  const response = await fetch(baseURL + "/categories", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    if (response.status === 500) {
      throw new Error(await response.text());
    }
    if (response.status === 400) {
      throw new Error(await response.text());
    }
    throw new Error("Failed to post");
  }
  return (await response.json()) as Category;
};

export const getCategoryById = async (id: number) => {
  const response = await fetch(baseURL + `/categories/${id}`);
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(await response.text());
    }
    throw new Error("Something went wrong");
  }
  return (await response.json()) as Category;
};
