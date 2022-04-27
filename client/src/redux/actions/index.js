import axios from 'axios';


export function getAllGames(page) {
    return async function (dispatch) {
        const json = await axios.get(`http://localhost:3001/videogames?page=${page}`)
        return dispatch({ type: 'GET_ALL_GAMES', payload: json.data })
    }
}

export function getGenres() {
    return async function (dispatch) {
        const response = await axios.get('http://localhost:3001/genres');
        return dispatch({ type: 'GET_GENRES', payload: response.data })
    }
}

// export function getPokemonName(name) {
//     return async function (dispatch) {
//         const json = await axios.get(`http://localhost:3001/games?name=${name}`)
//         //console.log(json)
//         return dispatch({ type: 'GET_POKEMON_NAME', payload: json.data })
//     }
// }

// export function getPokemon(id) {
//     return async function (dispatch) {
//         const json = await axios.get(`http://localhost:3001/games/${id}`)
//         return dispatch({ type: 'GET_POKEMON', payload: json.data })
//     }
// }


// export function createPokemon(payload) {
//     return async function (dispatch) {
//         const response = await axios.post('http://localhost:3001/games', payload);
//         return response;
//     }
// }



// //LA ACCION ES DESPACHAR UN TIPO, DEJAR AQUI LA MENOR CANTIDAD DE LOGICA Y HACER MEJOR EN REDUCE O COMPONENTE
export function filterGenre(payload) {
    return {
        type: 'FILTER_BY_GENRE',
        payload
    }
}

export function filterCreated(payload) {
    return {
        type: 'FILTER_CREATED',
        payload
    }
}

export function orderAlfa(payload) {
    return {
        type: 'ORDER_ALFA',
        payload
    }
}

export function orderRating(payload) {
    return {
        type: 'ORDER_RATING',
        payload
    }
}




