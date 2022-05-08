import axios from 'axios';


export function getAllGames(page) {
    return async function (dispatch) {
        const json = await axios.get(`http://localhost:3001/videogames?page=${page}`)
        return dispatch({ type: 'GET_ALL_GAMES', payload: json.data })
    }
}

export function getGame(id) {
    return async function (dispatch) {
        const json = await axios.get(`http://localhost:3001/videogames/${id}`)
        return dispatch({ type: 'GET_GAME', payload: json.data })
    }
}

export function getGameName(name) {
    return async function (dispatch) {
        const json = await axios.get(`http://localhost:3001/videogames?name=${name}`)
        return dispatch({ type: 'GET_GAME_NAME', payload: json.data })
    }
}

export function createGame(payload) {
    return async function (dispatch) {
        const response = await axios.post('http://localhost:3001/videogames', payload);
        return response;
    }
}

export function getGenres() {
    return async function (dispatch) {
        const response = await axios.get('http://localhost:3001/genres');
        return dispatch({ type: 'GET_GENRES', payload: response.data })
    }
}

export function getPlatforms() {
    return async function (dispatch) {
        const response = await axios.get('http://localhost:3001/videogames/platforms');
        return dispatch({ type: 'GET_PLATFORMS', payload: response.data })
    }
}


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

export function cleanDetails(payload) {
    return {
        type: 'CLEAN_DETAILS',
        payload
    }
}





