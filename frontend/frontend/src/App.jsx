import './App.css'
import { useState } from 'react'

function App() {
  const cargarTareas = () => {
    setTasks([
    { id:1, title: "Aprender React"},
    { id:2, title: "Conectar backend"},
    { id:3, title: "Dominar el mundo"}
    ])
  }
  const [tasks, setTasks] = useState([])
  return (
    <>
      <h1>Mi gestor de tareas.</h1>
      <p>Acá voy mostrar mis tareas</p>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
      <buton onClick={cargarTareas}>
        Cargar Tareas
      </buton>
    </>
  )
}

export default App
