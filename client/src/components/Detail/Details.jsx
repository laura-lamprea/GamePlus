import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getGame, cleanDetails } from '../../redux/actions';
import D from './Details.module.css';
import gif from "../../components/gif.gif";

export default function DetailPage() {

    const dispatch = useDispatch();
    const game = useSelector(state => state.game)
   
    const { id } = useParams(); 

 

    useEffect(() => {
        dispatch(cleanDetails()) 
        dispatch(getGame(id))
       
        // if(id !== game.id){
        //     dispatch(getGame(id))
        // }
       
    }, [dispatch])

    // function handleCleanParams(e) {
    //     e.preventDefault();
    //     console.log('entro')
    //     onClick={(e) => { handleCleanParams(e) }}
    // }

    function starsByRating(rating) {
        let starsArr = []
        for (let i = 0; i < 5; i++) {
            starsArr.push(<span className={D.fao}>★</span>)
        }
        for (let i = 0; i < Math.floor(rating); i++) {
            starsArr[i] = <span className={D.fa}>★</span>
        }
        return starsArr
    }
    
    console.log('estado', game.id, 'params', id )
    if(id !== game.id){
        console.log('id difrente al estado')
    }
    // else{
    //    console.log('entro al else')
    // }

    return (
        <div className={D.container} >
            { game.id? 
             
                <>
                    <div className={D.containerLeft}>
                        <Link to='/home'>
                            <button className={D.btnBack}>&laquo; Back</button>
                        </Link>
                        <h1>{game.name}</h1>
                        <img src={game.image} className={D.imgGameId} alt="Wait... " />
                        <h6>{game.description}</h6>
                    </div>
                    <div className={D.containerRight}>
                        <div className={D.containerInfo}>
                            <p className={D.letterInfo}>{game.rating}</p>
                            <span className={D.spanInfo}>{starsByRating(game.rating)}</span>
                            <p className={D.titleInfo}>Release Date</p>
                            <p className={D.info}>{game.released}</p>
                            <p className={D.titleInfo}>Genres</p>
                            {game.genres ? game.created_db ?
                                game.genres.map(g => <p className={D.info}>{g.name}</p>) :
                                game.genres.map(g => <p className={D.info}>{g}</p>) :
                                <a> </a>
                                // <img className={D.gif} src={gif} height="500px" align="center" />
                            }
                            <p className={D.titleInfo}>Platforms</p>
                            {game.platforms?.map(g => <a className={D.item} >{g}</a>)}
                        </div>

                    </div>
                </> :
                <img className={D.gif} src={gif}  alt="Not found" />
            }
        </div>
    )
};

