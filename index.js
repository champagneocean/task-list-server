const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
app.use(bodyParser.json());

let tasks = [
  { id: 1, description: 'Hacer compras', completed: false },
  { id: 2, description: 'Estudiar para el examen', completed: true },
];

app.get('/tasks', (req, res) => {
  res.status(200).json(tasks);
});

app.get('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);

  if (task) {
    res.status(200).json(task);
  } else {
    res.status(404).json({ error: 'Tarea no encontrada' });
  }
});

app.post('/tasks', (req, res) => {
  const newTask = req.body;
  newTask.id = tasks.length + 1;
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(t => t.id === taskId);

  if (taskIndex !== -1) {
    tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
    res.status(200).json(tasks[taskIndex]);
  } else {
    res.status(404).json({ error: 'Tarea no encontrada' });
  }
});

app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter(t => t.id !== taskId);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});