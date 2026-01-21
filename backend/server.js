const db = require("./db/database");

const express = require("express");
const app = express();

let tasks = [
  { id: 1, title: "Aprender Express", completed: false },
  { id: 2, title: "Hacer CRUD", completed: false }
];

app.use(express.json());

app.get("/", (req, res) => {
    res.send("¡API funcionando!");
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

app.get("/tasks", (req, res) => {
  const rows = db.prepare("SELECT * FROM tasks").all();

  const tasks = rows.map(task => ({
    id: task.id,
    title: task.title,
    completed: Boolean(task.completed)
  }));

  res.json(tasks);
});

  

app.post("/tasks", (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    completed: req.body.completed
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const task = tasks.find(task => task.id === id);

  if (!task) {
    return res.status(404).json({ message: "Tarea no encontrada" });
  }

  if (req.body.title !== undefined) {
    task.title = req.body.title;
  }

  if (req.body.completed !== undefined) {
    task.completed = req.body.completed;
  }

  res.json(task);
});

app.delete("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const taskIndex = tasks.findIndex(task => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ message: "Tarea no encontrada" });
  }

  tasks.splice(taskIndex, 1);

  res.status(204).send();
});
