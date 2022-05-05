import React from 'react';
import C from './Card.module.css';
// import ball from "./ball.png";


//export default function Card(props) {   // y llamo props.name PERO ES MAS PRACTICO EL DESTRUCURINGDE ECMA6
export default function Card({ name, img, rating, genres, released }) {
    function starsByRating(rating) {
        let starsArr = []
        for (let i = 0; i < 5; i++) {
            starsArr.push(<span className={C.fao}>★</span>)
        }
        for (let i = 0; i < Math.floor(rating); i++) {
            starsArr[i]=<span className={C.fa}>★</span>
        }
        return starsArr
    }


    return (
        <div className={C.card}>
            {/* className={C.card} */}
            <div className={C.cardHead}>
                <img className={C.imgGame} src={img} alt="Image Not Found" />
                {/* width="200px" height="150" */}
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
