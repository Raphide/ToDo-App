import { schema, TodoFormData } from "./schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import {
  Category,
  createCategory,
  getAllCategories,
  TodoResponse,
} from "../../services/todo-services";
import CategoryForm from "../CategoryForm/CategoryForm";
import { CategoryFormData } from "../CategoryForm/schema";
import { Link } from "react-router-dom";
import styles from './TodoForm.module.scss'

type FormType = "CREATE" | "EDIT";

interface TodoFormProps {
  formType?: FormType;
  onSubmit: (data: TodoFormData) => unknown;
  defaultValues?: TodoFormData;
}

const TodoForm = ({
  formType = "CREATE",
  defaultValues = {
    task: "",
    categoryId: "Please select a category",
    priority: "Please select a priority",
    description: "",
  },
  onSubmit,
}: TodoFormProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [updateCategories, setUpdateCategories] = useState<string | null>(null);

  const {
    reset,
    register,
    watch,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = useForm<TodoFormData>({ resolver: zodResolver(schema), defaultValues });

  const watchCategory = watch("categoryId");

  const newCategory = async (data: CategoryFormData) => {
    setUpdateCategories(data.name);
    createCategory(data)
      .then()
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getAllCategories()
      .then((data) => setCategories(data))
      .catch((e) => console.log(e));
  }, [updateCategories, watchCategory]);

  isSubmitSuccessful && reset();
  return (
    <div className={styles.formcard}>
      <CategoryForm onSubmit={newCategory} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.input}>
          <label htmlFor="task">Task</label>
          <input id="task" type="text" {...register("task")} />
          {errors?.task && <small>{errors.task.message}</small>}
        </div>
        <div className={styles.input}>
          <label htmlFor="categoryId">Category</label>
          <select id="categoryId" {...register("categoryId")}>
            <option disabled>Please select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors?.categoryId && <small>{errors.categoryId.message}</small>}
        </div>

        <div className={styles.input}>
          <label htmlFor="priority">Priority</label>
          <select id="priority" {...register("priority")}>
          <option disabled>Please select a priority</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
          {errors?.priority && <small>{errors.priority.message}</small>}
        </div>
        <div className={styles.input}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            rows={4}
            cols={40}
            {...register("description")}
          />
          {errors?.description && <small>{errors.description.message}</small>}
        </div>
        <button>{formType === "CREATE" ? "Create" : "Edit"} Task</button>
      </form>
      <Link to="/">
        <button>Cancel</button>
      </Link>
    </div>
  );
};

export default TodoForm;
