// Comentario: Importa el cliente MongoClient de MongoDB para interactuar con la base de datos
const { MongoClient } = require('mongodb');

// Comentario: Define la URI de la base de datos MongoDB, el nombre de la base de datos y el nombre de la colección
const uri = 'mongodb://localhost:27017';
const dbName = 'usuarios';
const collectionName = 'usuarios';

// Comentario: Define un objeto usuariosController que contiene métodos para interactuar con la colección de usuarios en la base de datos
const usuariosController = {
  // Comentario: Método para registrar un nuevo usuario en la base de datos
  registrarUsuario: async (req, res) => {
    try {
      const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
      await client.connect();

      const db = client.db(dbName);
      const collection = db.collection(collectionName);

      const { nombre, correo, contraseña } = req.body;

      const usuarioExistente = await collection.findOne({ correo: correo });
      if (usuarioExistente) {
        return res.status(400).json({ mensaje: 'El correo ya está registrado' });
      }

      await collection.insertOne({ nombre, correo, contraseña });

      await client.close();

      res.json({ mensaje: 'Usuario registrado correctamente' });
    } catch (error) {
      console.error('Error al registrar:', error);
      res.status(500).json({ mensaje: 'Error al registrar, por favor inténtalo de nuevo' });
    }
  },

  // Puedes agregar más métodos de controlador aquí según sea necesario
};

module.exports = usuariosController;
