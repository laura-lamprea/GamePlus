import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { useEffect } from 'react' //useState
import { useDispatch, useSelector } from 'react-redux'
import { getAllGames, getGenres, getGameName, filterGenre, filterCreated, orderAlfa, orderRating } from '../../redux/actions'
import Card from '../Card/Card'
import Navbar from '../Navbar/Navbar'
import H from './Home.module.css';
// import gif from "../gif1.gif";
import line from './line.png'

export default function HomePage() {
    const dispatch = useDispatch()
    const allGames = useSelector(state => state.games)
    const genres = useSelector(state => state.genres)
    const [page, setPage] = useState(1)
    const [order, setOrder] = useState('')
    const [name, setName] = useState('')


    useEffect(() => {
        dispatch(getAllGames(page))
        dispatch(getGenres())
    }, [dispatch])  //monstar y ejecutar cuando tenga esto [esto] o hacer un useeffect de getallgames siempre y cuando tenga otro estado por ejemplo genres si no esta, que no lo haga

    function handlePage(e) {
        e.preventDefault();
        setPage(e.target.textContent)
        dispatch(getAllGames(page))
        console.log('el textcontext', e.target.textContent)
        // console.dir(e.target)
        console.log('pagina', page)
    }
    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getGameName(name))
        setName('cambio')
    }
    const handleInputChange = (e) => {
        e.preventDefault();
        setName(e.target.value)
    };

    function handleClick(e) {
        e.preventDefault();

        dispatch(getAllGames(page))
        setName('cambio')
    }

    function orderAlfaHdl(e) {
        e.preventDefault();
        dispatch(orderAlfa(e.target.value));
        setOrder(e.target.value)
    }
    function orderRatingHdl(e) {
        e.preventDefault();
        dispatch(orderRating(e.target.value));
        setOrder(e.target.value)
    }
    function filterGenreHdl(e) {
        dispatch(filterGenre(e.target.value));
    }
    function filterCreatedHdl(e) {
        dispatch(filterCreated(e.target.value));
    }



    return (
        <div className={H.container}>
            <Navbar />
            <div className={H.container2}>
                <div className={H.searchBar}>
                    <button className={H.btnAll} onClick={(e) => { handleClick(e) }}>Load All Videoames</button>
                    <div>
                        {/* <input className={H.inputSearch} type="text" autocomplete="off"  placeholder=" Search game..." onChange={(e) => handleInputChange(e)} /> */}
                        <input required name="buscar" type="search" autocomplete="off" placeholder=" Search game..." onChange={(e) => handleInputChange(e)} />
                        <button className={H.btn} type="reset">x</button>
                        <button className={H.btn} type="submit" onClick={(e) => handleSubmit(e)}></button>
                        {/* <button className={H.btnSubmit}  type="submit" onClick={(e) => handleSubmit(e)}>GO!</button> */}

                    </div>
                </div>
                <div className={H.filters}>
                    <h3>Filters</h3>
                    <img src={line} className={H.line} align="center" />
                    <div>
                        <select onChange={(e) => orderAlfaHdl(e)}>
                            <option >Name</option>
                            <option value='asc'>A-Z</option>
                            <option value='des'>Z-A</option>
                        </select>
                        <select onChange={(e) => orderRatingHdl(e)}>
                            <option>Rating</option>
                            <option value='asc'>to the popular</option>
                            <option value='des'>to the unpopular</option>
                        </select>
                        <select onChange={(e) => filterCreatedHdl(e)}>
                            <option >Origin</option>
                            <option value='all'>All</option>
                            <option value='created'>Created</option>
                            <option value='api'>Existing</option>
                        </select>
                        <select name="genre" id="genre" onChange={(e) => filterGenreHdl(e)}>
                            <option >Genres</option>
                            <option value='all'>All</option>
                            {genres.map(g => (
                                <option value={g.name} >{g.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className={H.btngroup}>
                    <button type="button" onClick={(e) => handlePage(e)} >1</button>
                    <button type="button" onClick={(e) => handlePage(e)} >2</button>
                    <button type="button" onClick={(e) => handlePage(e)} >3</button>
                    <button type="button" onClick={(e) => handlePage(e)} >4</button>
                    <button type="button" onClick={(e) => handlePage(e)} >5</button>
                    <button type="button" onClick={(e) => handlePage(e)} >6</button>
                    <button type="button" onClick={(e) => handlePage(e)} >7</button>
                </div>
            </div>




            <nav className={H.cards}>
                {
                    allGames.length ? allGames.map(g => {  //SI EL ESTADO EXITE
                        return (
                            <Link to={`/details/${g.id}`} style={{ textDecoration: 'none' }} >
                                <Card name={g.name}
                                    img={g.image}
                                    genres={g.created_db ? g.genres.map(genre => ` ${genre.name} |`) : g.genres.map(genre => ` ${genre} |`)}
                                    rating={g.rating}
                                    released={g.released}
                                />
                             
                            </Link>
                        );
                    })
                        : <h2>LOADING ......</h2>
                    // <img className={H.gif} src={gif} height="250px" align="center" />
                }
            </nav>
        </div>
    )
}


//   <div>
//                 <ul className={H.ul}>
//                     <li className={H.li}><a className={H.a}>«</a></li>
//                     <li className={H.li}><a className={H.a} onClick={(e) => handlePage(e)}>1</a></li>
//                     <li className={H.li}><a className={H.a} onClick={(e) => handlePage(e)}>2</a></li>
//                     <li className={H.li}><a className={H.a} onClick={(e) => handlePage(e)}>3</a></li>
//                     <li className={H.li}><a className={H.a} onClick={(e) => handlePage(e)}>4</a></li>
//                     <li className={H.li}><a className={H.a}>»</a></li>
//                 </ul>
//             </div> 
