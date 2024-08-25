import { useEffect, useState } from "react";
import {
  editTodoById,
  getTodoById,
  TodoResponse,
} from "../../services/todo-services";
import { useNavigate, useParams } from "react-router-dom";
import TodoForm from "../../components/TodoForm/TodoForm";
import { TodoFormData } from "../../components/TodoForm/schema";

type FetchStatus = "IDLE" | "LOADING" | "SUCCESS" | "FAILURE";
const EditTaskPage = () => {
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>("IDLE");
  const [error, setError] = useState<Error | null>(null);
  const [task, setTask] = useState<TodoResponse | null>(null);
  const { id } = useParams() as { id: string };
  const idNum = parseInt(id);
  const navigate = useNavigate();

  useEffect(() => {
    setFetchStatus("LOADING");
    getTodoById(parseInt(id))
      .then((task) => {
        setFetchStatus("SUCCESS");
        setTask(task);
      })
      .catch((e: Error) => {
        setFetchStatus("FAILURE");
        setError(e);
      });
  }, []);

  const formSubmit = (data: TodoFormData) => {
    editTodoById(idNum, data)
      .then(() => navigate("/"))
      .catch(() => alert("failed to update task"));
  };
  return (
    <div>
      {fetchStatus === "LOADING" && <p>Loading</p>}
      {fetchStatus === "FAILURE" && (
        <p style={{ color: "red" }}>{error?.message}</p>
      )}
      {fetchStatus === "SUCCESS" && task && (
        <TodoForm onSubmit={formSubmit} formType="EDIT" defaultValues={task} />
      )}
    </div>
  );
};

export default EditTaskPage;
