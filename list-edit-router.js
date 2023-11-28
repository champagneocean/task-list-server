const express = require('express');
const router = express.Router();
const app = express();


let listaTareas = [
  { indicador: 1, descripcion: 'Hacer la compra', completada: false },
  { indicador: 2, descripcion: 'Estudiar para el examen', completada: true },
];


router.use(express.json());

function validarMetodoHTTP(req, res, next) {
    const metodosPermitidos = ['GET', 'POST', 'PUT', 'DELETE']; 
  
    if (!metodosPermitidos.includes(req.method)) {
      return res.status(405).json({ error: 'Método HTTP no permitido' });
    }
  
    next();
  }
  app.use(validarMetodoHTTP);
  app.get('/', (req, res) => {
    res.send('Bienvenido al servidor de gestión de tareas.');
  });
  const port = 3000; 
app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});

function validarSolicitud(req, res, next) {
  const { descripcion } = req.body;

  if (req.method === 'POST' && !descripcion) {
    return res.status(400).json({ error: 'La descripción de la tarea es obligatoria para crear una nueva tarea' });
  }

  if (req.method === 'PUT' && (!descripcion || !('completada' in req.body))) {
    return res.status(400).json({ error: 'La descripción y el estado completado son obligatorios para actualizar una tarea' });
  }

  next(); 
}


router.post('*', validarSolicitud);
router.put('*', validarSolicitud);

router.post('/crear', (req, res) => {
  const { descripcion } = req.body;

  const nuevaTarea = {
    indicador: listaTareas.length + 1,
    descripcion: descripcion,
    completada: false,
  };

  listaTareas.push(nuevaTarea);
  res.json({ mensaje: 'Tarea creada exitosamente', tarea: nuevaTarea });
});

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

module.exports = router;