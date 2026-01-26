const db = require("./db/database");

const express = require("express");
const app = express();

/* let tasks = [
  { id: 1, title: "Aprender Express", completed: false },
  { id: 2, title: "Hacer CRUD", completed: false }
]; */

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
  const { title, completed } = req.body;

  if (!title) {
    return res.status(400).json({ message: "El título es obligatorio" });
  }

  const result = db
    .prepare(
      "INSERT INTO tasks (title, completed) VALUES (?, ?)"
    )
    .run(title, completed ? 1 : 0);

  const newTask = {
    id: result.lastInsertRowid,
    title,
    completed: Boolean(completed)
  };

  res.status(201).json(newTask);
});


app.put("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const { title, completed } = req.body;

  const task = db.prepare(
    "SELECT * FROM tasks WHERE id = ?"
  ).get(id);

  if (!task) {
    return res.status(404).json({ message: "Tarea no encontrada" });
  }

  const newTitle = title !== undefined ? title : task.title;

  let newCompleted = task.completed;
  if (completed !== undefined) {
    newCompleted = completed ? 1 : 0;
  }

  db.prepare(`
    UPDATE tasks
    SET title = ?, completed = ?
    WHERE id = ?
  `).run(newTitle, newCompleted, id);

  res.status(200).json({
    id,
    title: newTitle,
    completed: Boolean(newCompleted)
  });
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
