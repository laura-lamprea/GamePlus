const initialState = {
    games: [],
    game: {},
    genres: [],
    gamescopy: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_GAMES':
            // console.log(action.payload)
            return {
                ...state,
                games: action.payload,  //en mi estado games que es un [], mandar todo lo de la accion GET_ALL..
                gamescopy: action.payload
            }

        // case 'GET_POKEMON_NAME':
        //     console.log(action.payload)
        //     return {
        //         ...state,
        //         games: [action.payload]  //games es lo que estoy renderizando
        //     }
        // case 'GET_POKEMON':
        //     return {
        //         ...state,
        //         pokemon: action.payload
        //     }
        // case 'CREATE_POKEMON': //COMO CONECTA ESTE REDUCER CON LA ACTION SI NO TIENE NADA QUE DIGA POST_POKEMON LA ACTION?
        //     return {
        //         ...state, //no sirve de nada pero lo necesito en el reduce
        //     }
        case 'GET_GENRES':
            return {
                ...state,
                genres: action.payload
            }
        // case 'ORDER_ALFA':
        //     const allPoke = state.games
        //     const pokeOrderAlfa = action.payload === 'asc' ?
        //         allPoke.sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0))
        //         : allPoke.sort((a, b) => (a.name > b.name ? -1 : a.name < b.name ? 1 : 0))
        //     //https://www.kuworking.com/javascript-hook-para-ordenar-listas
        //     return {
        //         ...state,
        //         games: pokeOrderAlfa
        //     }
        // case 'ORDER_FORCE':
        //     const allPokes = state.games
        //     const pokeOrderForce = action.payload === 'asc' ?
        //         allPokes.sort((a, b) => (a.force > b.force ? 1 : a.force < b.force ? -1 : 0))
        //         : allPokes.sort((a, b) => (a.force > b.force ? -1 : a.force < b.force ? 1 : 0))
        //     return {
        //         ...state,
        //         games: pokeOrderForce
        //     }

        case 'FILTER_CREATED':
            const allGames = state.gamescopy
            const gameFilteredCreated = action.payload === "created" ? allGames.filter(e => e.created_db) : allGames.filter(e => !e.created_db)
            console.log(gameFilteredCreated)
            return {
                ...state,
                games: action.payload === 'all' ? state.gamescopy : gameFilteredCreated
            }

        case 'FILTER_BY_GENRE':
            const allGenres = state.gamescopy
            const filteredByGenre =
                action.payload === "all" ? allGenres : allGenres.filter((e) => e.genres?.includes(action.payload))
            //console.log(filteredByGenre); LOS CREADOS NO LOS FILTRA AUN
            return {
                ...state,
                games: filteredByGenre,
            }
        default:
            return { ...state }

    };
};

export default rootReducer;