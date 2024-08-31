
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import TasksPage from './Pages/TasksPage/TasksPage'
import CreateTaskPage from './Pages/CreateTaskPage/CreateTaskPage'
import EditTaskPage from './Pages/EditTaskPage/EditTaskPage'

function App() {


  return (
    <>
    <BrowserRouter>
    <h1>2du</h1>
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
