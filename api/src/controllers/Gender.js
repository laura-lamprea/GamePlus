const axios = require('axios');
require('dotenv').config();
const { KEY } = process.env;
const { Gender } = require('../db')

const getAllGender = async (req, res) => {
    try {
        const dataApi = await axios.get(`https://api.rawg.io/api/genres?key=${KEY}`);
        // const genderArr = await dataApi.data.results.map(p => p.name)
        const genderArr = await dataApi.data.results.map(p => [p.name, p.image_background])
        //console.log(genderArr)
        genderArr.forEach(gender => {
            Gender.findOrCreate({
                where: { 
                    name: gender[0],
                    backgroundImage: gender[1]
                 }
            })
        })
        const allGender = await Gender.findAll();
        return res.json(allGender);
    } catch (error) {
        //console.error(e);
        return res.status(404).send('Not found Types');
    }
};

module.exports = {
    getAllGender
}