import dayjs from "dayjs";
import { TodoResponse } from "../../services/todo-services";
import { Link } from "react-router-dom";
import styles from "./TaskCard.module.scss";

interface TaskCardProps {
  task: TodoResponse;
  onDelete: (id: number) => Promise<unknown>;
  onComplete: (id: number) => Promise<unknown>;
  onArchive: (id: number) => Promise<unknown>;
  onDuplicate: (id: number) => Promise<unknown>;
  category?: string;
}

const TaskCard = ({ task, onDelete, onComplete, onArchive, onDuplicate, category }: TaskCardProps) => {
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
      <button className={styles.delete} onClick={() => onDelete(task.id)}>X</button>
        <div className={styles.head}>
        {task.category?.name ? <h3>{task.category?.name}</h3> : <h3>{category}</h3>}
        <h1>{task.task}</h1>
        <h5>Priority: {task.priority}</h5>
        
        <h6 className={styles.time}>Started at: {createdAt}</h6>
        </div>
      </div>
      <div className={styles.content}>
      <p>{task.description}</p>
      </div>
      <section className={styles.bottom}>
        <span className={styles.topButtons}>
      <Link to={`${task.id}/edit`}>
        <button className={styles.edit}>Edit</button>
      </Link>
      <button onClick={() => onArchive(task.id)} className={styles.edit}>Archive</button>
      <button onClick={() => onDuplicate(task.id)} className={styles.edit}>Duplicate</button>
      </span>
      {!task.completed ? (
        <button className={styles.complete} onClick={() => onComplete(task.id)}>Complete</button>
      ): <div className={styles.complete}><h6>Completed!</h6><h6>Completed at: {completedAt}</h6></div>}
      </section>
    </div>
  );
};

export default TaskCard;
