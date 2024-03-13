const express = require('express');
const usuariosController = require('./usuariosController');

const router = express.Router();

router.post('/registro', usuariosController.registrarUsuario);

// Puedes definir más rutas y asignarlas a otros métodos del controlador según sea necesario

module.exports = router;
