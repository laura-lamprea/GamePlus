const axios = require("axios");
require('dotenv').config();
const {
    KEY
} = process.env;
const {
    Videogame,
    Gender
} = require("../db");


// 3328      The Witcher 3: Wild Hunt

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

const getAllGames = async (req, res) => {
  const { page, name } = req.query;
  //const dataDb = await db();
  const dataApi = await apiGames();
  const allGames = dataApi//  [...dataDb, ...dataApi];
  if (name) {
    console.log(name.toLowerCase())
    // const gameByName = await dataApi.find(n => n.name.toLowerCase() == name.toLowerCase()); 
    const gameByName = await dataApi.filter(n => n.name.toLowerCase().includes(name.toLowerCase())); //filter porque find solo uno //== name.toLowerCase());

    //encodeURI(gameByName);
    console.log('Lo encontro!',gameByName)
    //return res.json(gameByName)
  }
  if (page) {
    if (page == 1) {
      const pages = allGames.slice(page - 1, page * 15);
      return res.json(pages);

      // The Witcher 3: Wild Hunt
      // The %20 Witcher%203:%20Wild%20Hunt
    } else {
      const pages = allGames.slice((page - 1) * 15, page * 15);
      return res.json(pages);
    }
  }

   //return res.status(200).send(dataApi);
};


const getById = async (req, res) => {
    const { id } = req.params;

    try {
        const game = await axios.get(`https://api.rawg.io/api/games/${id}?key=${KEY}`);
        const info = {
            name: game.data.name,
            image: game.data.background_image_additional, //mirar para la DB 
            genres: game.data.genres.map(g => g.name),
            description: game.data.description_raw,
            rating: game.data.rating,
            released: game.data.released,
        }
        //console.log(info)
        return res.status(200).send(info);
    } catch (error) {
        return error;
        //return res.status(404).send('Not found');
    }
};

// const dd = async (req, res) => {
//   const { id } = req.params;
//   //const dataDb = await db();
//   const dataApi = await api();
//   const allPokemons = [...dataDb, ...dataApi];
//   if (id) {
//     const pokeId = await allPokemons.filter((p) => p.id == id);
//     if (pokeId.length) {
//       return res.json(pokeId);
//     } else {
//       return res.status(404).send("problems with id");
//     }
//   }
// };


// const db = async (req, res) => {
//   const pokeDb = await Pokemon.findAll({
//     include: {
//       model: Type,
//       attributes: ["name"],
//       through: {
//         attribute: [],
//       },
//     },
//   });
//   return pokeDb;
// };

// const getAllPokemon = async (req, res) => {
//   const { page, name } = req.query;
//   const dataDb = await db();
//   const dataApi = await api();
//   // const allPoke = [...dataDb, ...dataApi];
//   // if (name) {
//   //   const pokeByName = allPoke.find((n) => n.name == name.toLowerCase());
//   //   return res.json(pokeByName);
//   // }
//   // if (page) {
//   //   if (page == 1) {
//   //     // const pages = allPoke.slice(page - 1, page * 12);
//   //     //console.log('del PAGE', pages);
//   //     const pages = allPoke.slice(page - 1, page * 2);
//   //     return res.json(pages);
//   //   } else {
//   //     // const pages = allPoke.slice((page - 1) * 12, page * 12);
//   //     const pages = allPoke.slice((page - 1) * 2, page * 2);
//   //     return res.json(pages);
//   //   }
//   // }

//   console.log('del API', dataApi);
//   return dataApi;


//   // console.log('del GETALL', allPoke);
//   // return allPoke;
// };




// const createPoke = async (req, res) => {
//   const {
//     name,
//     imgT,
//     lifeTime,
//     force,
//     defending,
//     speed,
//     height,
//     weight,
//     type,
//   } = req.body;
//   const newPokemon = await Pokemon.create({
//     name,
//     imgT,
//     lifeTime,
//     force,
//     defending,
//     speed,
//     height,
//     weight,
//   });
//   const typeDb = await Type.findAll({
//     where: {
//       name: type,
//     },
//   });
//   newPokemon.addType(typeDb);
//   // res.send('Successful create')
//   res.json({
//     data: newPokemon,
//   });
// };



// const deletePoke = async (req, res) => {
//   const { id } = req.params;
//   // const allPokemons = await db();
//   if (id) {
//     const pokeIdDelete = Pokemon.destroy({
//       where: {
//         id: id,
//       },
//     });
//     res.send("Successful delete");
//   } else {
//     return res.status(404).json({
//       error: "No ID",
//     });
//   }
// };

module.exports = {
    getAllGames,
    getById
};