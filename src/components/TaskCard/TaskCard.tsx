import dayjs from "dayjs";
import { TodoResponse } from "../../services/todo-services";
import { Link } from "react-router-dom";
import styles from "./TaskCard.module.scss";

interface TaskCardProps {
  task: TodoResponse;
  onDelete: (id: number) => Promise<unknown>;
  onComplete: (id: number) => Promise<unknown>;
}

const TaskCard = ({ task, onDelete, onComplete }: TaskCardProps) => {
  const createdAt = dayjs(task.createdAt)
    .locale("au")
    .format("HH:mm:ss DD-MM-YYYY");

  const completedAt = dayjs(task.completedAt)
    .locale("au")
    .format("HH:mm:ss DD-MM-YYYY");

  const priorityStyle = (priority: string) => {
    if (priority === "Low") {
      return `${styles.top_low}`;
    } else if (priority === "Medium") {
      return `${styles.top_medium}`;
    } else if (priority === "High") {
      return `${styles.top_high}`;
    }
  };

  return (
    <div className={styles.card}>
      <div className={priorityStyle(task.priority)}>
        <h2>{task.task}</h2>
        <h3>{task.category.name}</h3>
        <h5>Priority: {task.priority}</h5>
        <h6>Started at: {createdAt}</h6>
      </div>
      {task.completed && <h6>Completed!</h6>}
      {task.completed && <h6>Completed at: {completedAt}</h6>}
      <p>{task.description}</p>
      <Link to={`${task.id}/edit`}>
        <button>Edit</button>
      </Link>
      {!task.completed && (
        <button onClick={() => onComplete(task.id)}>Complete</button>
      )}
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
};

export default TaskCard;
