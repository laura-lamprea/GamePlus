const axios = require("axios");
require('dotenv').config();
const { KEY } = process.env;
const { Videogame, Genre } = require("../db");


// 3328  The Witcher 3: Wild Hunt

const apiGames = async (req, res) => {
    try {
        const datosApi = await axios.get(`https://api.rawg.io/api/games?key=${KEY}&page_size=100`); //100 y paginar 15  6.6667
        const gamesApi = datosApi.data.results.map(g => {
            return {
                id: g.id,
                name: g.name,
                image: g.background_image,
                rating: g.rating,
                genres: g.genres.map(g => g.name),
            };
        });
        //console.log(gamesApi);
        //return res.status(200).send(gamesApi);
        return gamesApi;
    } catch (error) {
        // console.error(error);
        return error;
        //return res.status(404).send('Not found');
    }
};

const dbGames = async () => {
  const gamesDb = await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ["name"],
      through: {
        attribute: [],
      },
    },
  });
  return gamesDb;
};

const getAllGames = async (req, res) => {
  const { page, name } = req.query;
  const dataDb = await dbGames();
  //console.log(dataDb)
  const dataApi = await apiGames();
  const allGames =  [...dataDb, ...dataApi]; 
  if (name) {
    //console.log(name.toLowerCase())
    const gameByName = await allGames.filter(n => n.name.toLowerCase().includes(name.toLowerCase())); //filter porque find solo uno //== name.toLowerCase());
    if(!gameByName.length){
        return res.status(400).send('Not found')
    }else{
        return res.json(gameByName)
    }
  }
  if (page) {
    if (page == 1) {
      const pages = allGames.slice(page - 1, page * 15);
      return res.json(pages);
    } else {
      const pages = allGames.slice((page - 1) * 15, page * 15);
      return res.json(pages);
    }
  }
   //return res.status(200).send(dataApi);
};


const getById = async (req, res) => {
    const { id } = req.params;
    //console.log(id.length) //36
    try {
      if(id.length != 36){
        const game = await axios.get(`https://api.rawg.io/api/games/${id}?key=${KEY}`);
        const info = {
            name: game.data.name,
            image: game.data.background_image_additional, 
            genres: game.data.genres.map(g => g.name),
            description: game.data.description_raw,
            rating: game.data.rating,
            released: game.data.released,
        }
        return res.status(200).send(info);
      }if(id.length == 36){
        const dataDb = await dbGames();
        const gameId = await dataDb.find(g => g.id == id);
        return res.status(200).send(gameId);
      }
       
    } catch (error) {
        return error;
        //return res.status(404).send('Not found');
    }
};

const createGame = async (req, res) => {
  const {name, image, description, released, rating, platforms, genres} = req.body;
  const newGame = await Videogame.create({name, image, description, released, rating, platforms});

  // console.log('newGame', newGame)
  const genderDb = await Genre.findAll({where: {name: genres}});

  console.log('genderDb', genderDb)

  newGame.addGenre(genderDb);

  res.json({data: newGame, msg:'Successful create'});
};

const deleteGame = async (req, res) => {
  const { id } = req.params;
  if (id) {
    const gameIdDelete = Videogame.destroy({
      where: {
        id: id,
      },
    });
    res.send("Successful delete");
  } else {
    return res.status(404).json({
      error: "No ID",
    });
  }
};

module.exports = {
    getAllGames,
    getById,
    createGame
};