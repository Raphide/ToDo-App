import dayjs from "dayjs";
import { TodoResponse } from "../../services/todo-services";
import { Link } from "react-router-dom";
import styles from "./TaskCard.module.scss";

interface TaskCardProps {
  task: TodoResponse;
  onDelete: (id: number) => Promise<unknown>;
}

const TaskCard = ({ task, onDelete }: TaskCardProps) => {
  const createdAt = dayjs(task.createdAt)
    .locale("au")
    .format("HH:mm:ss DD-MM-YYYY");

  return (
    <div className={styles.card}>
      <div className={styles.top}>
      <h2>{task.task}</h2>
      <h3>{task.category.name}</h3>
      <h5>Priority: {task.priority}</h5>
      <h6>Started at: {createdAt}</h6>
      </div>
      <p>{task.description}</p>
      <Link to={`${task.id}/edit`}>
        <button>Edit</button>
      </Link>
      <button>Complete</button>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
};

export default TaskCard;
