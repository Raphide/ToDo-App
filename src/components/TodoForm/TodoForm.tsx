
import { schema, TodoFormData } from "./schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type FormType = "CREATE" | "EDIT";

interface TodoFormProps {
  formType?: FormType;
  onSubmit: (data: TodoFormData) => unknown;
  defaultValues?: TodoFormData;
}

const TodoForm = ({
  formType = "CREATE",
  defaultValues = { task: "", category: "", priority: "Low", description: "" },
  onSubmit,
}: TodoFormProps) => {
  const {
    reset,
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = useForm<TodoFormData>({ resolver: zodResolver(schema), defaultValues });

  isSubmitSuccessful && reset();
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="task">Task</label>
          <input id="task" type="text" {...register("task")}/>
          {errors?.task && <small>{errors.task.message}</small>}
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <input id="category" type="text" {...register("category")}/>
          {errors?.category && <small>{errors.category.message}</small>}
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
          <textarea id="description" rows={4} cols={50} {...register("description")}/>
          {errors?.description && <small>{errors.description.message}</small>}
        </div>
        <button>{formType === "CREATE" ? "Create" : "Edit"} Task</button>
      </form>
    </div>
  );
};

export default TodoForm;
