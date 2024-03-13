// Comentario: Este archivo define las rutas y configuraciones del servidor backend utilizando Express.js.
// Importa los módulos necesarios como express, bodyParser, cors, MongoClient y bcrypt para el manejo de solicitudes, conexiones a la base de datos MongoDB y encriptación de contraseñas.

const express = require('express');
const bodyParser = require('body-parser'); // Importa bodyParser para analizar el cuerpo de las solicitudes en formato JSON
const cors = require('cors'); // Importa cors para permitir solicitudes desde otros dominios
const { MongoClient } = require('mongodb'); // Importa MongoClient para interactuar con la base de datos MongoDB
const bcrypt = require('bcrypt'); // Importa bcrypt para encriptar contraseñas

const app = express(); // Crea una instancia de la aplicación Express
const PORT = process.env.PORT || 3000; // Establece el puerto del servidor, utilizando el puerto 3000 por defecto

app.use(bodyParser.json()); // Utiliza el middleware bodyParser para analizar el cuerpo de las solicitudes en formato JSON
app.use(cors()); // Utiliza el middleware cors para permitir solicitudes desde otros dominios

const uri = 'mongodb://localhost:27017/usuarios'; // URI de conexión a la base de datos MongoDB
const dbName = 'usuarios'; // Nombre de la base de datos
const collectionName = 'usuarios'; // Nombre de la colección de usuarios

// Ruta para el registro de usuarios
app.post('/registro', async (req, res) => {
  try {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true }); // Crea una instancia del cliente de MongoDB
    await client.connect(); // Conecta al servidor de MongoDB

    const db = client.db(dbName); // Selecciona la base de datos
    const collection = db.collection(collectionName); // Selecciona la colección de usuarios

    const { nombre, correo, contraseña } = req.body; // Extrae los datos del cuerpo de la solicitud

    const usuarioExistente = await collection.findOne({ correo: correo }); // Busca si el correo ya está registrado
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado' }); // Devuelve un error si el usuario ya existe
    }

    // Encripta la contraseña antes de almacenarla
    const hashContraseña = await bcrypt.hash(contraseña, 10);

    await collection.insertOne({ nombre, correo, contraseña: hashContraseña }); // Inserta el nuevo usuario en la base de datos

    await client.close(); // Cierra la conexión con la base de datos

    res.json({ mensaje: 'Usuario registrado correctamente' }); // Envía una respuesta de éxito
  } catch (error) {
    console.error('Error al registrar:', error); // Maneja cualquier error que ocurra durante el registro
    res.status(500).json({ mensaje: 'Error al registrar, por favor inténtalo de nuevo' }); // Envía un mensaje de error al cliente
  }
});

// Ruta para el inicio de sesión de usuarios
app.post('/inicio_sesion', async (req, res) => {
  try {
    const { correo, contraseña } = req.body;

    // Busca el usuario por correo electrónico en la base de datos
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true }); // Crea una instancia del cliente de MongoDB
    await client.connect(); // Conecta al servidor de MongoDB
    const db = client.db(dbName); // Selecciona la base de datos
    const collection = db.collection(collectionName); // Selecciona la colección de usuarios
    const usuario = await collection.findOne({ correo: correo });
    await client.close(); // Cierra la conexión con la base de datos

    if (!usuario) {
      // Si el usuario no existe, envía un mensaje de error
      return res.status(401).json({ mensaje: 'Credenciales incorrectas, acceso denegado' });
    }

    // Verifica si la contraseña proporcionada coincide con el hash almacenado
    const contraseñaCorrecta = await bcrypt.compare(contraseña, usuario.contraseña);

    if (!contraseñaCorrecta) {
      // Si la contraseña no coincide, envía un mensaje de error
      return res.status(401).json({ mensaje: 'Credenciales incorrectas, acceso denegado' });
    }

    // Si las credenciales son correctas, envía un mensaje de éxito y cualquier otro dato que desees devolver
    res.status(200).json({ mensaje: 'Inicio de sesión exitoso', usuario: usuario });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ mensaje: 'Error al iniciar sesión, por favor inténtalo de nuevo' });
  }
});

// Definir otras rutas y operaciones de la base de datos según sea necesario

app.listen(PORT, () => {
  console.log(`Servidor backend en funcionamiento en el puerto ${PORT}`); // Inicia el servidor y escucha en el puerto especificado
});
