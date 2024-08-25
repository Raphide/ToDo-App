import dayjs from 'dayjs';
import { TodoResponse } from "../../services/todo-services";
import { Link } from "react-router-dom";

interface TaskCardProps {
  task: TodoResponse;
  onDelete: (id: number) => Promise<unknown>;
}



const TaskCard = ({ task, onDelete }: TaskCardProps) => {
  
  const createdAt = dayjs(task.createdAt).locale('au').format('DD-MM-YYYY HH:mm:ss')
  
  return (
    <div>
      <h2>{task.task}</h2>
      <h3>{task.category}</h3>
      <h5>Priority: {task.priority}</h5>
      <h6>{createdAt}</h6>
      <p>{task.description}</p>
      <Link to={`${task.id}/edit`} >
        <button>Edit</button>
      </Link>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
};

export default TaskCard;
