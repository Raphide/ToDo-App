import React, { SetStateAction, useEffect, useState } from "react";
import {
  Category,
  completeTodoById,
  deleteTodoById,
  getAllCategories,
  getAllTodos,
  getCategoryById,
  getTodosByPriority,
  TodoResponse,
} from "../../services/todo-services";
import TaskCard from "../../components/TaskCard/TaskCard";
import styles from "./TaskArchivePage.module.scss";
import { Link } from "react-router-dom";
import pencil from "../../assets/pencil.svg";

const TaskArchivePage = () => {
  const [tasks, setTasks] = useState<TodoResponse[]>([]);
  const [categoryId, setCategoryId] = useState<string>("0");
  const [category, setCategory] = useState<Category>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [priority, setPriority] = useState<string>("All");
  const [completed, setCompleted] = useState(false);
  const [count, setCount] = useState<number>(0);
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
    console.log("Is this looping?");
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
    console.log("Is this looping?");
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
    if (!confirmed) {
      return;
    }
    const isCompleted = await completeTodoById(id).catch((e) => {
      console.log(e);
      return false;
    });
    if (isCompleted) {
      const updatedTasks = tasks.filter((task) => task.completed !== true);
      setTasks(updatedTasks);
      setCompleted(true);
      setCount(count + 1);
    }
  };

  const tracker = count === 0 ? "no" : count;

  const categoryName = category?.name;

  console.log(tasks);
  return (
    <div className={styles.page}>
      <p>
        Welcome to 2du. On the left are your currently active 2dus. Click the
        "Create" button to create a new task.
      </p>
      <p>So far you have completed {tracker} 2dus!</p>
      <Link to="/create">
        <button className={styles.iconButton}>
          <img src={pencil} />
          Create
        </button>
      </Link>
      <div>
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
      </div>
      <h2>Task Archive</h2>
      <div className={styles.cardSpan}>
      {categoryId === "0" ? (
          <>
            
              {tasks.map(
                (task) =>
                  task.completed &&
                  task.priority === "High" && (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onDelete={onDelete}
                      onComplete={onComplete}
                    />
                  )
              )}
              {tasks.map(
                (task) =>
                  task.completed &&
                  task.priority === "Medium" && (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onDelete={onDelete}
                      onComplete={onComplete}
                    />
                  )
              )}
              {tasks.map(
                (task) =>
                  task.completed &&
                  task.priority === "Low" && (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onDelete={onDelete}
                      onComplete={onComplete}
                    />
                  )
              )}
            
          </>
        ) : (
          <>
            {category &&
              category.todos.map(
                (task) =>
                  task.completed && (
                    <TaskCard
                      key={task.id}
                      task={task}
                      category={categoryName}
                      onDelete={onDelete}
                      onComplete={onComplete}
                    />
                  )
              )}
          </>
        )}
      </div>
    </div>
  );
};

export default TaskArchivePage;
