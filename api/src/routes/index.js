const { Router } = require('express');
const Videogame = require('./Videogame')
const Gender = require('./Gender')

const router = Router();

router.use('/videogames', Videogame)
router.use('/genres', Gender)

module.exports = router;
