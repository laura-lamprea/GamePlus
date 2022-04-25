const { Router } = require('express');
const { getAllGames, getById } = require('../controllers/Videogame.js')


const router = Router();

router.get('/', getAllGames)
router.get('/:id', getById)
// router.post('/', createPoke) 
// router.delete('/:id', deletePoke)


module.exports = router;
