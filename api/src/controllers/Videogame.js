const axios = require("axios");
require('dotenv').config();
const { KEY } = process.env;
const { Videogame, Genre } = require("../db");


const apiGames = async (req, res) => {
  try {
    let arrGames = [];
    for (let i = 1; i < 6; i++) {
      const gamesByPage = await axios(`https://api.rawg.io/api/games?key=${KEY}&page=${i}`);
      const { results } = gamesByPage.data;
      arrGames = arrGames.concat(results);
    }

    const gamesApi = arrGames.map(g => {
      return {
        id: g.id,
        name: g.name,
        image: g.background_image,
        rating: g.rating,
        genres: g.genres.map(g => g.name),
        released: g.released,
        platforms: g.platforms.map(p => p.platform.name), //solo se usa para traer los platforms
      };
    });

    //console.log(gamesApi);
    return gamesApi
    //return res.status(200).send(gamesApi);
  } catch (error) {
    return error; //return res.status(404).send('Not found'); // console.error(error);
  }
};

const getPlatforms = async (req, res) => {
  return res.send([
    "Xbox One",
    "Xbox Series S/X",
    "Xbox 360",
    "PlayStation 3",
    "PlayStation 4",
    "PlayStation 5",
    "PC",
    "Nintendo Switch",
    "Linux",
    "macOS",
    "Android",
    "iOS",
    "Xbox",
    "PS Vita",
    "Web",
    "Wii U",
    "Nintendo 3DS",
    "PlayStation 2",
    "Dreamcast"
  ])
  // PROCESO DE COMO SAQUE LOS PLATFORMS
  // const dataApi = await apiGames();
  // let arrPlatforms = [];
  // const platformsArr = dataApi.map(p => p.platforms);

  // for (let i = 0; i < platformsArr.length; i++) {
  //   for (let j = 0; j < platformsArr[i].length; j++) {
  //     arrPlatforms.push( platformsArr[i][j])
  //   }
  // }
  // return res.send([...new Set(arrPlatforms)]);

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
  // const { page, name } = req.query;
  const { name } = req.query;
  const dataDb = await dbGames();
  const dataApi = await apiGames();
  const allGames = [...dataDb, ...dataApi];
  if (name) {
    const gameByName = await allGames.filter(n => n.name.toLowerCase().includes(name.toLowerCase())); 
    if (!gameByName.length) {
      return res.json({err : 'NOT able to store data in database'})
      // return res.status(400).json({err : 'NOT able to store data in database'})//.status(400).send('Not found')   
    } else {
      return res.json(gameByName)
    }
  }
  // if (page) {
  //   if (page == 1) {
  //     const pages = allGames.slice(page - 1, page * 15);
  //     return res.json(pages);
  //   } else {
  //     const pages = allGames.slice((page - 1) * 15, page * 15);
  //     return res.json(pages);
  //   }
  // }
  return res.status(200).send(allGames);
};

const getById = async (req, res) => {
  const { id } = req.params;
  //console.log(id.length) //36
  try {
    if (id.length != 36) {
      const game = await axios.get(`https://api.rawg.io/api/games/${id}?key=${KEY}`);
      //console.log(game)
      const info = {
        id: game.data.id,
        name: game.data.name,
        image: game.data.background_image_additional,
        genres: game.data.genres.map(g => g.name),
        platforms: game.data.platforms.map(p => p.platform.name),
        description: game.data.description_raw,
        rating: game.data.rating,
        released: game.data.released,
      }
      return res.status(200).send(info);
    } if (id.length == 36) {
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
  const { name, image, description, released, rating, platforms, genres } = req.body;
  const newGame = await Videogame.create({ name, image, description, released, rating, platforms });
  // console.log('newGame', newGame)
  const genderDb = await Genre.findAll({ where: { name: genres } });
  //console.log('genderDb', genderDb)
  newGame.addGenre(genderDb);
  res.json({ data: newGame, msg: 'Successful create' });
};



module.exports = {
  getAllGames,
  getById,
  createGame,
  getPlatforms
};

