const { Router } = require('express');
const { getAllGames, getById, createGame, getPlatforms } = require('../controllers/Videogame.js')


const router = Router();

router.get('/', getAllGames)
router.get('/platforms', getPlatforms)
router.get('/:id', getById)
router.post('/', createGame) 



module.exports = router;
