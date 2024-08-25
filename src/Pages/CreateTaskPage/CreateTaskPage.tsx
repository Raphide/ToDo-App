
import { useNavigate } from 'react-router-dom';
import TodoForm from '../../components/TodoForm/TodoForm'
import { TodoFormData } from '../../components/TodoForm/schema';
import { createTodo } from '../../services/todo-services';

const CreateTaskPage = () => {
  const navigate = useNavigate()

  const onSubmit = async (data: TodoFormData) => {
    createTodo(data).then(()=> navigate('/')).catch((e)=> console.log(e));
  }
  return (
    <div>
        <h1>Enter A Task</h1>
        <TodoForm onSubmit={onSubmit}/>
        </div>
  )
}

export default CreateTaskPage