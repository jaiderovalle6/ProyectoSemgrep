const express = require('express');

const router = express.Router();

const {
    obtenerTareas,
    crearTarea,
    eliminarTarea
} = require('../controllers/tareaController');

router.get('/', obtenerTareas);
router.post('/new', crearTarea);
router.delete('/:id', eliminarTarea);

module.exports = router;