const express = require('express');
const fs = require('fs').promises;
const app = express();
const PORT = 3000;

app.use(express.json()); // Para parsear application/json
app.use(express.static('public')); // Servir archivos estáticos desde 'public'

// Función para leer datos de un archivo JSON
async function leerDatos(archivo) {
    try {
        const datos = await fs.readFile(`./data/${archivo}.json`, 'utf8');
        return JSON.parse(datos);
    } catch (error) {
        console.error(`Error al leer el archivo ${archivo}:`, error);
        return [];
    }
}

// Función para escribir datos en un archivo JSON
async function escribirDatos(archivo, datos) {
    try {
        const datosString = JSON.stringify(datos, null, 2);
        await fs.writeFile(`./data/${archivo}.json`, datosString, 'utf8');
    } catch (error) {
        console.error(`Error al escribir en el archivo ${archivo}:`, error);
    }
}

// Endpoint para obtener los ingredientes
app.get('/alumnos', async (req, res) => {
  const alumnos = await leerDatos('alumnos');
  res.json(alumnos);
});


// Endpoint para agregar una venta
app.post('/alumno', async (req, res) => {
  const nuevaAlumno = req.body; // Asegúrate de validar y limpiar esta entrada
  const alumnos = await leerDatos('alumno');
  ventas.push(nuevaAlumnno);
  await escribirDatos('alumno', alumno);
  res.status(201).send('Alumnno agregado');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}/`);
});
