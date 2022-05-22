import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { useEffect } from 'react' //useState
import { useDispatch, useSelector } from 'react-redux'
import { getAllGames, getGenres, getGameName, filterGenre, filterCreated, orderAlfa, orderRating } from '../../redux/actions'
import Card from '../Card/Card'
import Navbar from '../Navbar/Navbar'
import H from './Home.module.css';
import gif from "../../components/gif.gif";
import line from './line.png'
import notFound from './404.png'

import Pagination from "../Pagination/Pagination"


export default function HomePage() {
    const dispatch = useDispatch()
    const allGames = useSelector(state => state.games)
    const genres = useSelector(state => state.genres)

    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(15)
    const indexLast = currentPage * perPage
    const indexFirst = indexLast - perPage
    const currentVg = allGames.slice(indexFirst, indexLast)

    const page = (numPage) => {
        setCurrentPage(numPage)
    }

    const [order, setOrder] = useState('')
    const [name, setName] = useState('')

    useEffect(() => {
        // dispatch(getAllGames(page))
        dispatch(getAllGames())
        dispatch(getGenres())
    }, [dispatch])


    const [searching, setSearching] = useState(false);
    // const [page, setPage] = useState(1)
    // function handlePage(e) {
    //     e.preventDefault();
    //     setPage(e.target.textContent)
    //     dispatch(getAllGames(page))
    //     //dispatch(cleanPage())
    //     console.log('el textcontext', e.target.textContent) //2
    //     // console.dir(e.target)
    //     console.log('FINAL pagina', page) //1
    // }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getGameName(name))
        setSearching(true)
        setName('')
    }
    const handleInputChange = (e) => {
        e.preventDefault();
        setName(e.target.value)
    };
    function handleClick(e) {
        e.preventDefault();
        //dispatch(cleanPage())
        // dispatch(getAllGames(page))
        //dispatch(getAllGames())
        window.location.reload()
        document.getElementById("nameSelect").getElementsByTagName('option')[0].selected = 'selected'
        document.getElementById("ratingSelect").getElementsByTagName('option')[0].selected = 'selected'
        document.getElementById("originSelect").getElementsByTagName('option')[0].selected = 'selected'
        document.getElementById("genre").getElementsByTagName('option')[0].selected = 'selected'
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
                    <button className={H.btnAll} onClick={(e) => { handleClick(e) }}>Reload VideoGames</button>
                    <div className={H.filters} >
                        <select id="nameSelect" onChange={(e) => orderAlfaHdl(e)}>
                            <option >Name</option>
                            <option value='asc'>A-Z</option>
                            <option value='des'>Z-A</option>
                        </select>
                        <select id="ratingSelect" onChange={(e) => orderRatingHdl(e)}>
                            <option>Rating</option>
                            <option value='asc'>to the most popular</option>
                            <option value='des'>to the least popular</option>
                        </select>
                        <select id="originSelect" onChange={(e) => filterCreatedHdl(e)}>
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
                    <div>
                        <input className={H.inputSearch} value={name} type="search" required name="buscar" autoComplete="off" placeholder=" Search game..." onChange={(e) => handleInputChange(e)} />
                        <button className={H.btn} type="submit" onClick={(e) => handleSubmit(e)}></button>
                    </div>
                </div>



            </div>
            <div className={H.toplayer}></div>
            <div className={H.pagination}>
                <h3>VideoGames</h3>
                {/* <img src={line} className={H.line2} alt="Not found" /> */}
                <Pagination
                    perPage={perPage}
                    allGames={allGames.length}
                    page={page}
                />
            </div>

            <nav className={H.cards} >

                {
                    currentVg.length ?
                        currentVg.map(g => {
                            return (
                                g.Error ? <img className={H.error} src={notFound} alt="Not found" /> :
                                    <Link to={`/details/${g.id}`} style={{ textDecoration: 'none' }} key={parseInt(g.id)} >
                                        <Card name={g.name}
                                            id={g.id}
                                            img={g.image}
                                            genres={g.created_db ? g.genres.map(genre => ` ${genre.name} |`) : g.genres.map(genre => ` ${genre} |`)}
                                            rating={g.rating}
                                            released={g.released}
                                            created_db={g.created_db ? true : false}
                                            key={g.id}
                                        />
                                    </Link>
                            );
                        })
                        : <img className={H.loading} src={gif} alt="Not found" />

                }



            </nav>
        </div>
    )
}


