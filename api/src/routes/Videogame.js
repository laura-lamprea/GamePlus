const { Router } = require('express');
const { getAllGames, getById, createGame, getPlatforms, deleteGame } = require('../controllers/Videogame.js')


const router = Router();

router.get('/', getAllGames)
router.get('/platforms', getPlatforms)
router.get('/:id', getById)
router.post('/', createGame) 
router.delete('/:id', deleteGame)


module.exports = router;
