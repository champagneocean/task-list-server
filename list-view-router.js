const express = require('express');
const router = express.Router();

let listaTareas = [
  { indicador: 1, descripcion: 'Hacer la compra', completada: false },
  { indicador: 2, descripcion: 'Estudiar para el examen', completada: true },

];


function validarParametros(req, res, next) {
  const indicador = parseInt(req.params.indicador);

  if (isNaN(indicador) || indicador <= 0) {
    return res.status(400).send("Parámetro 'indicador' no válido");
  }

  next(); 
}

router.param('indicador', validarParametros);


router.get('/completas', (req, res) => {
  const tareasCompletas = listaTareas.filter(tarea => tarea.completada);
  res.json(tareasCompletas);
});

router.get('/incompletas', (req, res) => {
  const tareasIncompletas = listaTareas.filter(tarea => !tarea.completada);
  res.json(tareasIncompletas);
});

module.exports = router;