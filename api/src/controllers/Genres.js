const axios = require('axios');
require('dotenv').config();
const { KEY } = process.env;
const { Genre } = require('../db')

const getAllGenres = async (req, res) => {
    try {
        const dataApi = await axios.get(`https://api.rawg.io/api/genres?key=${KEY}`);
        // const genderArr = await dataApi.data.results.map(p => p.name)
        const genrerArr = await dataApi.data.results.map(p => p.name) //[p.name, p.image_background])
        //console.log(genderArr)
        genrerArr.forEach(genre => {
            Genre.findOrCreate({
                where: { 
                    name: genre
                    // backgroundImage: genre[1]
                 }
            })
        })
        const allGenres = await Genre.findAll();
        return res.json(allGenres);
    } catch (error) {
        //console.error(e);
        return res.status(404).send('Not found Types');
    }
};

module.exports = {
    getAllGenres
}