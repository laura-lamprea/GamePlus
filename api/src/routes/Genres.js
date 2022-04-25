const { Router } = require('express');
const { getAllGenres } = require('../controllers/Genres.js')


const router = Router();

router.get('/', getAllGenres)

module.exports = router;
