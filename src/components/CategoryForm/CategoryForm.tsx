import { useForm } from "react-hook-form";
import { CategoryFormData, schema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./CategoryForm.module.scss"

interface CategoryFormProps {
  onSubmit: (data: CategoryFormData) => unknown;

}

const CategoryForm = ({ onSubmit }: CategoryFormProps) => {
  const {
    reset,
    register,
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
  } = useForm<CategoryFormData>({ resolver: zodResolver(schema) });

  isSubmitSuccessful && reset();

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{display:"flex", flexDirection:"column"}} className={styles.input}>
          <label>Add a new Category</label>
          <input id="name" type="text" {...register("name")} />
          {errors?.name && <small>{errors.name.message}</small>}

          
        </div>
        <div>
          <button>Add</button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
