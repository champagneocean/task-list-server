const express = require('express');
const router = express.Router();

// Lista de tareas (supongamos que está definida en otro archivo o en la misma aplicación)
let listaTareas = [
  { indicador: 1, descripcion: 'Hacer la compra', completada: false },
  { indicador: 2, descripcion: 'Estudiar para el examen', completada: true },
  // Otras tareas...
];

// Middleware para parsear el cuerpo de las solicitudes como JSON
router.use(express.json());

// Ruta para crear una tarea (POST /crear)
router.post('/crear', (req, res) => {
  const { descripcion } = req.body;

  if (!descripcion) {
    return res.status(400).json({ error: 'La descripción de la tarea es obligatoria' });
  }

  const nuevaTarea = {
    indicador: listaTareas.length + 1,
    descripcion: descripcion,
    completada: false,
  };

  listaTareas.push(nuevaTarea);
  res.json({ mensaje: 'Tarea creada exitosamente', tarea: nuevaTarea });
});

// Ruta para eliminar una tarea (DELETE /eliminar/:indicador)
router.delete('/eliminar/:indicador', (req, res) => {
  const indicador = parseInt(req.params.indicador);

  const tareaIndex = listaTareas.findIndex(tarea => tarea.indicador === indicador);

  if (tareaIndex !== -1) {
    listaTareas.splice(tareaIndex, 1);
    res.json({ mensaje: `Tarea con indicador ${indicador} eliminada` });
  } else {
    res.status(404).json({ error: `No se encontró la tarea con indicador ${indicador}` });
  }
});

// Ruta para actualizar una tarea (PUT /actualizar/:indicador)
router.put('/actualizar/:indicador', (req, res) => {
  const indicador = parseInt(req.params.indicador);
  const { descripcion, completada } = req.body;

  const tarea = listaTareas.find(tarea => tarea.indicador === indicador);

  if (tarea) {
    tarea.descripcion = descripcion || tarea.descripcion;
    tarea.completada = completada !== undefined ? completada : tarea.completada;

    res.json({ mensaje: `Tarea con indicador ${indicador} actualizada`, tarea: tarea });
  } else {
    res.status(404).json({ error: `No se encontró la tarea con indicador ${indicador}` });
  }
});

// Exporta el router para su uso en otras partes de la aplicación
module.exports = router;