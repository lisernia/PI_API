const { Router } = require('express');
//const {Videogame, Genre} = require('../db');
const videogames = require('./videogames.js')
const videogame = require('./videogame.js')
const genres = require('./genres')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.use('/', videogames);
router.use('/', videogame);
router.use('/', genres);


module.exports = router;
