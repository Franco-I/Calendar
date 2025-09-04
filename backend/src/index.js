import express from 'express';
import cors from 'cors';
import pool from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import activityRoutes from './routes/activityRoutes.js';


const app = express();

app.use(cors());
app.use(express.json());

// Rutas


//ruta de prueba de conexión a la base de datos
app.get('/ping', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT 1 + 1 AS result');
        res.json({ message: 'Conexión OK', result: rows[0].result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});





//ruta de usuarios
app.use('/users', userRoutes);



//ruta de actividades
app.use('/activities', activityRoutes);




// ruta de prueba para verificar que el servidor está funcionando
app.get("/", (req, res) => {
  res.json({ message: "Servidor funcionando" });
});



// Configuración del servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
