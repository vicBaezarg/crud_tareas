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
