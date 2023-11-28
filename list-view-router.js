const express = require('express');
const router = express.Router();

const listaTareas = [
  { indicador: 1, descripcion: 'Hacer la compra', completada: true },
  { indicador: 2, descripcion: 'Estudiar para el examen', completada: false },
];

router.get('/completas', (req, res) => {
  const tareasCompletas = listaTareas.filter(tarea => tarea.completada);
  res.json(tareasCompletas);
});

router.get('/incompletas', (req, res) => {
  const tareasIncompletas = listaTareas.filter(tarea => !tarea.completada);
  res.json(tareasIncompletas);
});

module.exports = router;