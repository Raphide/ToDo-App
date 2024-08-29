
import { schema, TodoFormData } from "./schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Category, createCategory, getAllCategories, TodoResponse } from "../../services/todo-services";
import CategoryForm from "../CategoryForm/CategoryForm";
import { CategoryFormData } from "../CategoryForm/schema";
import { Link } from "react-router-dom";

type FormType = "CREATE" | "EDIT";

interface TodoFormProps {
  formType?: FormType;
  onSubmit: (data: TodoFormData) => unknown;
  defaultValues?: TodoFormData;
}

const TodoForm = ({
  formType = "CREATE",
  defaultValues = { task: "", categoryId: "", priority: "Low", description: "" },
  onSubmit,
}: TodoFormProps) => {
  const [categories, setCategories] = useState<Category[]>([]);

  const {
    reset,
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = useForm<TodoFormData>({ resolver: zodResolver(schema), defaultValues });

  const newCategory = async (data: CategoryFormData) => {
    createCategory(data).then().catch((e) => console.log(e));
  }

  useEffect(()=>{
getAllCategories()
.then((data) => setCategories(data))
.catch((e)=> console.log(e))
  },[newCategory])

  isSubmitSuccessful && reset();
  return (
    <div>
        <CategoryForm onSubmit={newCategory} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="task">Task</label>
          <input id="task" type="text" {...register("task")}/>
          {errors?.task && <small>{errors.task.message}</small>}
        </div>
        <div>
          <label htmlFor="categoryId">Category</label>
          {/* <input id="category" type="text" {...register("category")}/> */}
          <select id="categoryId" {...register("categoryId")}>
            {categories.map((category) => (
<option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
          {errors?.categoryId && <small>{errors.categoryId.message}</small>}
        </div>
      
        <div>
          <label htmlFor="priority">Priority</label>
          <select id="priority" {...register("priority")}>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
          {errors?.priority && <small>{errors.priority.message}</small>}
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea id="description" rows={4} cols={40} {...register("description")}/>
          {errors?.description && <small>{errors.description.message}</small>}
        </div>
        <button>{formType === "CREATE" ? "Create" : "Edit"} Task</button>
      </form>
      <Link to="/"><button>Cancel</button></Link>
    </div>
  );
};

export default TodoForm;
