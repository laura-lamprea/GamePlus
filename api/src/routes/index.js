const { Router } = require('express');
const Videogame = require('./Videogame')
const Genres = require('./Genres')

const router = Router();

router.use('/videogames', Videogame)
router.use('/genres', Genres)

module.exports = router;
