// Cargar variables de entorno del archivo .env
require('dotenv').config();

const express = require('express');
const { Pool } = require('pg');

const app = express();

// 🔒 Desactivar la cabecera que revela que usamos Express
app.disable('x-powered-by');

const PORT = process.env.PORT || 3000;

// Configurar middleware para entender datos JSON en las peticiones
app.use(express.json());

// Configurar la conexión a PostgreSQL usando las variables de entorno
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Ruta de prueba para verificar que el servidor Express funciona
app.get('/', (req, res) => {
  res.json({ mensaje: '¡El backend de tu sistema de inventario está funcionando con éxito!' });
});

// Ruta de prueba para verificar la conexión real con el contenedor de Podman
app.get('/test-db', async (req, res) => {
  try {
    // Hace una consulta simple de tiempo a PostgreSQL
    const result = await pool.query('SELECT NOW()');
    res.json({
      estado: 'Conectado con éxito a PostgreSQL en Podman',
      fecha_servidor_db: result.rows[0].now
    });
  } catch (error) {
    console.error('Error de conexión a la DB:', error);
    res.status(500).json({ 
      estado: 'Error al conectar con la base de datos', 
      error: error.message 
    });
  }
});

// Encender el servidor en tu Fedora 44
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
  console.log(`📊 Prueba la base de datos en http://localhost:${PORT}/test-db`);
});
