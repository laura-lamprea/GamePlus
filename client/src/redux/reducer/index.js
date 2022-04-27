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
                games: action.payload,  //en mi estado pokemons que es un [], mandar todo lo de la accion GET_ALL..
                gamescopy: action.payload
            }
       

        default:
            return { ...state }

    };
};

export default rootReducer;