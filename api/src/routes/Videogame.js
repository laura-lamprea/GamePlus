const { Router } = require('express');
const { getAllGames, getById, createGame } = require('../controllers/Videogame.js')


const router = Router();

router.get('/', getAllGames)
router.get('/:id', getById)
router.post('/', createGame) 
// router.delete('/:id', deletePoke)


module.exports = router;
