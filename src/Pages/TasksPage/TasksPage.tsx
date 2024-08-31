import { SetStateAction, useEffect, useState } from "react";
import {
  completeTodoById,
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
  const [completed, setCompleted] = useState(false);
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
  }, [priority, completed]);

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

  const onComplete = async (id: number) => {
    const confirmed = confirm("Are you ready to mark this task as complete?");
    if(!confirmed){
      return;
    }
    const isCompleted = await completeTodoById(id).catch((e)=> {
      console.log(e);
      return false;
    });
    if (isCompleted){
      const updatedTasks = tasks.filter((task) => task.completed !== true);
      setTasks(updatedTasks);
      setCompleted(true);
    }
  }

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
       !task.completed && <TaskCard key={task.id} task={task} onDelete={onDelete} onComplete={onComplete}/>
      )).sort()}
       {tasks.map((task) => (
       task.completed && <TaskCard key={task.id} task={task} onDelete={onDelete} onComplete={onComplete}/>
      ))}
    </div>
  );
};

export default TasksPage;
