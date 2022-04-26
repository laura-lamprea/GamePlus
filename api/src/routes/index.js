const { Router } = require('express');
const Videogame = require('./Videogame.js')
const Genres = require('./Genres.js')

const router = Router();

router.use('/videogames', Videogame)
router.use('/genres', Genres)

module.exports = router;
