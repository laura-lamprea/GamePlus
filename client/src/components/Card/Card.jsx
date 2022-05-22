import React from 'react';
import C from './Card.module.css';
import { deleteGame } from '../../redux/actions'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

//export default function Card(props) {   // y llamo props.name PERO ES MAS PRACTICO EL DESTRUCURINGDE ECMA6
export default function Card({ id, name, img, rating, genres, released, created_db }) {

    const dispatch = useDispatch()

    function starsByRating(rating) {
        let starsArr = []
        for (let i = 0; i < 5; i++) {
            starsArr.push(<span className={C.fao}>★</span>)
        }
        for (let i = 0; i < Math.floor(rating); i++) {
            starsArr[i] = <span className={C.fa}>★</span>
        }
        return starsArr
    }

    function deleteHDL(e) {
        console.log(e)
        e.preventDefault();
        dispatch(deleteGame(id))
        window.location.reload()
    }

    

    return (
        <div className={C.card}>

            <div className={C.cardHead}>
                {
                    created_db ? <button title="delete" className={C.delete} onClick={(e) => deleteHDL(e)}>x</button> : <button className={C.noDelete}></button>
                }

                <img className={C.imgGame} src={img} alt="Image Not Found" />
            </div>
            <div className={C.cardBody}>
                <h4>{name}</h4>
                <p className={C.p}>{genres}</p>
                <p className={C.p}>Release Date: {released}</p>
                <div className={C.rating}>
                    <h5>{rating}</h5>
                    <span>{starsByRating(rating)}</span>
                </div>
            </div>
        </div>
    )
};
