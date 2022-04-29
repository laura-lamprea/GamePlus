import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getGame } from '../../redux/actions';
import D from './Details.module.css';
// import gif from "../gif1.gif";

export default function DetailPage() {

    const dispatch = useDispatch();
    const game = useSelector(state => state.game)

    const id = useParams();
    //console.log(id.id)

    useEffect(() => {
        dispatch(getGame(id.id))
    }, [dispatch])

    return (
        <div>
            <div>
                <Link to='/home'><button className={D.btnBack}>Back</button></Link>
            </div>
            <div className={D.container}>
                {
                    game ?
                        <div>
                            <div className={D.container2}>
                                <h1>{game.name}</h1>
                            </div>
                            <div className={D.container5}>
                                {
                                  game.platforms?.map(g =><a className={D.type}>{g}</a>)  
                                }
                            </div>
                            <img src={game.image} height="300px" alt=" " />
                            <h2>{game.rating}</h2>
                            <h2>{game.released}</h2>
                            <h7>{game.description}</h7>

                            <div className={D.container5}>
                                {
                                  game.genres?
                                   game.created_db ? 
                                   game.genres.map(g =><a className={D.type}>{g.name}</a>) : 
                                   game.genres.map(g =><a className={D.type}>{g}</a>) :
                                    <a>LOADING</a>
                                }
                            </div>
                           

                     
                        </div> : 
                        <a>LOADINGGGG</a>
                }
            </div>
        </div>
    )
};
