const pool = require('../db');

const obtenerTareas = async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM tareas ORDER BY id');
        res.json(resultado.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener tareas' });
    }
};

const crearTarea = async (req, res) => {
    try {
        const { nombre_mio } = req.body;

        const resultado = await pool.query(
            'INSERT INTO tareas (nombre) VALUES ($1) RETURNING *',
            [nombre_mio]
        );

        res.status(201).json(resultado.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear tarea' });
    }
};

const eliminarTarea = async (req, res) => {
    try {
        const { id } = req.params;

        await pool.query('DELETE FROM tareas WHERE id = $1', [id]);

        res.json({ mensaje: 'Tarea eliminada' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar tarea' });
    }
};

module.exports = {
    obtenerTareas,
    crearTarea,
    eliminarTarea
};
