const { Router } = require('express');
const { getAllGender } = require('../controllers/Gender.js')


const router = Router();

router.get('/', getAllGender)

module.exports = router;
