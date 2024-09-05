import { SetStateAction, useEffect, useState } from "react";
import {
  archiveTodoById,
  Category,
  completeTodoById,
  deleteTodoById,
  duplicateTodo,
  getAllCategories,
  getAllTodos,
  getCategoryById,
  getTodosByPriority,
  TodoResponse,
} from "../../services/todo-services";
import TaskCard from "../../components/TaskCard/TaskCard";
import { Link } from "react-router-dom";
import pencil from "../../assets/pencil.svg";
import styles from "./TaskPage.module.scss";

const TasksPage = () => {
  const [tasks, setTasks] = useState<TodoResponse[]>([]);
  const [categoryId, setCategoryId] = useState<string>("0");
  const [category, setCategory] = useState<Category>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [priority, setPriority] = useState<string>("All");
  const [completed, setCompleted] = useState(false);
  const [isArchived, setIsArchived] = useState<boolean>(false);

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
  }, [priority, completed]);

  useEffect(() => {
    if (categoryId !== "0") {
      getCategoryById(parseInt(categoryId))
        .then((data) => setCategory(data))
        .catch((e) => console.log(e));
    } else {
      getAllCategories()
        .then((data) => setCategories(data))
        .catch((e) => console.log(e));
    }
  }, [categoryId]);

  const onPriorityChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setPriority(e.target.value);
  };

  const onCategoryChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setCategoryId(e.target.value);
  };

  const onDelete = async (id: number) => {
    const confirmed = confirm("Are you certain? This will delete the task forever. Consider archiving instead to save it for later");
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

  const onArchive = async (id: number) => {
    const isArchived = await archiveTodoById(id).catch((e)=> {
      console.log(e);
      return false
    });
    if(isArchived){
      const updatedTasks = tasks.filter((task) => task.isArchived !== true);
      setTasks(updatedTasks);
      setCompleted(!completed);
    }
  }

  const onDuplicate = async (id: number) => {
    const isDuplicated = await duplicateTodo(id).catch((e) => {
      console.log(e);
      return false;
    });
    if(isDuplicated){
      setCompleted(!completed);
    }
  }

  const onComplete = async (id: number) => {
    const confirmed = confirm("Are you ready to mark this task as complete?");
    if (!confirmed) {
      return;
    }
    const isCompleted = await completeTodoById(id).catch((e) => {
      console.log(e);
      return false;
    });
    if (isCompleted) {
      const updatedTasks = tasks.filter((task) => task.isArchived !== true);
      setTasks(updatedTasks);
      setCompleted(!completed);
    }
  };

  const handleClick = () => {
    setIsArchived(!isArchived);
  };

  const categoryName = category?.name;

  return (
    <div className={styles.page}>
      <Link to="/create">
        <button className={styles.iconButton}>
          <img src={pencil} />
          Create
        </button>
      </Link>
      <div className={styles.sort}>
        <label htmlFor="sorting">Sort by priority</label>
        <select id="sorting" onChange={onPriorityChange}>
          <option id="All">All</option>
          <option id="High">High</option>
          <option id="Medium">Medium</option>
          <option id="Low">Low</option>
        </select>
        <label htmlFor="categoryId">Sort by category</label>
        <select id="categoryId" onChange={onCategoryChange}>
          <option value={"0"}>All</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id} id={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <button onClick={handleClick}>
          {isArchived ? "Active 2dus" : "Archived 2dus"}
        </button>
      </div>
      <span className={styles.cardSpan}>
        {categoryId === "0" ? (
          <>
            {tasks.map(
              (task) =>
                task.isArchived === isArchived &&
                task.priority === "High" && (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onDelete={onDelete}
                    onComplete={onComplete}
                    onArchive={onArchive}
                    onDuplicate={onDuplicate}
                  />
                )
            )}
            {tasks.map(
              (task) =>
                task.isArchived === isArchived &&
                task.priority === "Medium" && (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onDelete={onDelete}
                    onComplete={onComplete}
                    onArchive={onArchive}
                    onDuplicate={onDuplicate}
                  />
                )
            )}
            {tasks.map(
              (task) =>
                task.isArchived === isArchived &&
                task.priority === "Low" && (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onDelete={onDelete}
                    onComplete={onComplete}
                    onArchive={onArchive}
                    onDuplicate={onDuplicate}
                  />
                )
            )}
          </>
        ) : (
          <>
            {category &&
              category.todos.map(
                (task) =>
                  task.isArchived === isArchived && (
                    <TaskCard
                      key={task.id}
                      task={task}
                      category={categoryName}
                      onDelete={onDelete}
                      onComplete={onComplete}
                      onArchive={onArchive}
                      onDuplicate={onDuplicate}
                    />
                  )
              )}
          </>
        )}
      </span>
    </div>
  );
};

export default TasksPage;
