import { SetStateAction, useEffect, useState } from "react";
import {
  deleteTodoById,
  getAllTodos,
  getTodosByPriority,
  TodoResponse,
} from "../../services/todo-services";
import TaskCard from "../../components/TaskCard/TaskCard";
import { Link } from "react-router-dom";

const TasksPage = () => {
  const [tasks, setTasks] = useState<TodoResponse[]>([]);
  const [priority, setPriority] = useState<string>("All");
  useEffect(() => {
    if (priority !== "All") {
      getTodosByPriority(priority)
        .then((data) => setTasks(data))
        .catch((e) => console.log(e));
    } else {
      getAllTodos()
        .then((data) => setTasks(data))
        .catch((e) => console.log(e));
      
    }
    console.log("Is this looping?")
  }, [priority]);

  const onPriorityChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setPriority(e.target.value);
  };

  const onDelete = async (id: number) => {
    const confirmed = confirm("Are you certain?");
    if (!confirmed) {
      return;
    }
    const isDeleted = await deleteTodoById(id).catch((e) => {
      console.log(e);
      return false;
    });
    if (isDeleted) {
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
    }
  };
 console.log(tasks);
  return (
    <div>
      <h1>TasksPage</h1>
      <Link to="/create"><button>Create</button></Link>
      
      <div>
        <label htmlFor="sorting">Sort by priority</label>
        <select id="sorting" onChange={onPriorityChange}>
          <option id="All">All</option>
          <option id="High">High</option>
          <option id="Medium">Medium</option>
          <option id="Low">Low</option>
        </select>
      </div>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default TasksPage;
