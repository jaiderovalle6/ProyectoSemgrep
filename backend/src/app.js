const express = require('express');
const cors = require('cors');
const pool = require('./db');
const tareaRoutes = require('./routes/tareaRoutes');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173'
}));
app.use(express.json());
app.use('/api/tareas', tareaRoutes);

app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente');
});

app.get('/db', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT NOW()');
        res.json(resultado.rows);
    } catch (error) {
        console.error('Error de PostgreSQL:', error)
        res.status(500).json({ error: 'Error al conectar con la base de datos' });
    }
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto http://localhost:${PORT}`);
});