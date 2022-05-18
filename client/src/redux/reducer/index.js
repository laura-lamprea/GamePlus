const initialState = {
    games: [],
    game: {},
    genres: [],
    gamescopy: [],
    platforms: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_GAMES':
            return {
                ...state,
                games: action.payload,
                gamescopy: action.payload
            }
        case 'GET_GAME':
            return {
                ...state,
                game: action.payload
            }

        case 'GET_GAME_NAME':
            console.log(action.payload.err)
            // .length? filteredByGenreAll : [{Error: 'No videogames found'}]
            return {
                ...state,
                games: action.payload.err ? [{ Error: 'No videogames found' }] : action.payload
            }

        case 'CREATE_GAME':
            return {
                ...state,
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

        case 'DELETE_GAME':
            console.log(action.payload)
            return {
                ...state,
                game: action.payload
            }

        case 'ORDER_ALFA':
            const allGame = state.games
            const gamesOrderAlfa = action.payload === 'asc' ?
                allGame.sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0))
                : allGame.sort((a, b) => (a.name > b.name ? -1 : a.name < b.name ? 1 : 0))
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
            const gameFilteredCreated = action.payload === "created" ? allGames.filter(e => e.created_db) :
                allGames.filter(e => !e.created_db)
            return {
                ...state,
                games: action.payload === 'all' ? state.gamescopy
                    : gameFilteredCreated.length ? gameFilteredCreated : [{ Error: 'No videogames found' }]
            }
        case 'FILTER_BY_GENRE':
            const allGenres = state.gamescopy
            let filteredByGenreAll = []
            if (action.payload === "all") {
                filteredByGenreAll = allGenres
            } else {
                let filteredGenreApi = allGenres.filter((e) => e.genres?.includes(action.payload))
                filteredByGenreAll = [...filteredGenreApi]
            }
            return {
                ...state,
                games: filteredByGenreAll.length ? filteredByGenreAll : [{ Error: 'No videogames found' }]
            }
        case 'CLEAN_DETAILS':
            return {
                ...state,
                game: {}
            }

        default:
            return { ...state }

    };
};

export default rootReducer;