const initialState = {
    games: [],
    game: {},
    genres: [],
    gamescopy: [],
    platforms: []
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_GAMES':
            return {
                ...state,
                games: action.payload,  //en mi estado games que es un [], mandar todo lo de la accion GET_ALL..
                gamescopy: action.payload
            }
        case 'GET_GAME':
            //console.log('get id game', action.payload)
            return {
                ...state,
                game: action.payload
            }

        case 'GET_GAME_NAME':
            console.log('get name', action.payload)
            return {
                ...state,
                games: action.payload  //entre [] si no funciona
            }

        case 'CREATE_GAME': //COMO CONECTA ESTE REDUCER CON LA ACTION SI NO TIENE NADA QUE DIGA POST_POKEMON LA ACTION?
            return {
                ...state, //no sirve de nada pero lo necesito en el reduce
            }

        case 'GET_GENRES':
            return {
                ...state,
                genres: action.payload
            }

        case 'GET_PLATFORMS':
            return {
                ...state,
                platforms: action.payload
            }

        case 'ORDER_ALFA':
            const allGame = state.games
            const gamesOrderAlfa = action.payload === 'asc' ?
                allGame.sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0))
                : allGame.sort((a, b) => (a.name > b.name ? -1 : a.name < b.name ? 1 : 0))
            //https://www.kuworking.com/javascript-hook-para-ordenar-listas
            return {
                ...state,
                games: gamesOrderAlfa
            }
        case 'ORDER_RATING':
            const gamesAll = state.games
            const pokeOrderForce = action.payload === 'asc' ?
                gamesAll.sort((a, b) => (a.rating > b.rating ? 1 : a.rating < b.rating ? -1 : 0))
                : gamesAll.sort((a, b) => (a.rating > b.rating ? -1 : a.rating < b.rating ? 1 : 0))
            return {
                ...state,
                games: pokeOrderForce
            }

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