
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import TasksPage from './Pages/TasksPage/TasksPage'
import CreateTaskPage from './Pages/CreateTaskPage/CreateTaskPage'
import EditTaskPage from './Pages/EditTaskPage/EditTaskPage'


function App() {


  return (
    <>
    <BrowserRouter>
    <div className='topbox'>
    <h1 className="header">2DU</h1>
    </div>
    <p>Welcome to 2du. Click the "Create" button to create a new task.</p>
    <Routes>
      <Route path="/" element={<TasksPage/>}/>
      <Route path="/create" element={<CreateTaskPage/>}/>
      <Route path='/:id/edit' element={<EditTaskPage/>}/>
    </Routes>
    
</BrowserRouter>
    </>
  )
}

export default App
