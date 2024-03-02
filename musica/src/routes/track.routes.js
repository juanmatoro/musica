const express = require('express');
//EL ROUTER ES EL OBJETO QUE GUARDA TODAS LAS RUTAS.
const trackRouter = express.Router();
//INSTANCIAMOS AL CONTROLADOR PARA USAR LAS FUNCIONES RELATIVAS A CADA RUTA
const { getTrack, getTracks, createTrack, updateTrack, deleteTrack } = require('../controller/track.controller');

const { isAuth } = require('../middlewares/auth.middleware');

// LAS RUTAS
//nombreDelRouter.get('endpoint', <nombreDeLaFuncion>);

//OBTENER UNA CANCIÓN
trackRouter.get('/:id', getTrack);

//OBTENER TODAS LAS CANCIONES
trackRouter.get('/', getTracks);

//CREAR UNA CANCIÓN
trackRouter.post('/', [isAuth], createTrack);

//UPDATE
trackRouter.patch('/:id', [isAuth], updateTrack);

//DELETE
trackRouter.delete('/:id', [isAuth], deleteTrack);


module.exports = trackRouter;