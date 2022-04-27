import axios from 'axios';


export function getAllGames(page) {
    return async function (dispatch) {
        const json = await axios.get(`http://localhost:3001/videogames?page=${page}`)
        return dispatch({ type: 'GET_ALL_GAMES', payload: json.data })
    }
}
