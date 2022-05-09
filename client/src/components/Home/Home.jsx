import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { useEffect } from 'react' //useState
import { useDispatch, useSelector } from 'react-redux'
// import { reset, destroy } from 'redux-form'
import { getAllGames, getGenres, getGameName, filterGenre, filterCreated, orderAlfa, orderRating, cleanPage } from '../../redux/actions'
import Card from '../Card/Card'
import Navbar from '../Navbar/Navbar'
import H from './Home.module.css';
import gif from "../../components/gif.gif";
import line from './line.png'

export default function HomePage() {
    const dispatch = useDispatch()
    const allGames = useSelector(state => state.games)
    const genres = useSelector(state => state.genres)
    const [page, setPage] = useState(1)
    const [order, setOrder] = useState('')
    const [name, setName] = useState('')

    // const selectInputRef = useRef();

    // const [searching, setSearching] = useState(true);

    useEffect(() => {
        dispatch(getAllGames(page))
        dispatch(getGenres())
    }, [dispatch])  //monstar y ejecutar cuando tenga esto [esto] o hacer un useeffect de getallgames siempre y cuando tenga otro estado por ejemplo genres si no esta, que no lo haga

    function handlePage(e) {
        e.preventDefault();
        // console.log('el textcontext', e.target.textContent)
        setPage(e.target.textContent)

        // if(e.target.textContent == page){
        //     // setPage(e.target.textContent)
        //     console.log('entro al if')
        // }
        // else{
        //     dispatch(getAllGames(page))
        // }
        
        dispatch(getAllGames(page))
        dispatch(cleanPage())
        console.log('el textcontext', e.target.textContent) //2
        // console.dir(e.target)
        console.log('FINAL pagina', page) //1
    }
 
    function handleSubmit(e) {
        e.preventDefault();
        dispatch(cleanPage())
        dispatch(getGameName(name))
        setName('')
    }
    const handleInputChange = (e) => {
        e.preventDefault();
        setName(e.target.value)
    };
    function handleClick(e) {
        e.preventDefault();
        dispatch(cleanPage())
        dispatch(getAllGames(page))

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

    // onClick={() => setCount(count + 1)}

    return (
        <div className={H.container}>
            <Navbar />
            <div className={H.container2}>
                <div className={H.searchBar}>
                    <button className={H.btnAll} onClick={(e) => { handleClick(e) }}>Load All Videoames</button>
                    <div>
                        <input className={H.inputSearch} value={name} type="search" required name="buscar" autoComplete="off" placeholder=" Search game..." onChange={(e) => handleInputChange(e)} />
                        <button className={H.btn} type="submit" onClick={(e) => handleSubmit(e)}></button>
                    </div>
                </div>
                <div className={H.filters}>
                    <h3>Filters</h3>
                    <img src={line} className={H.line} align="center" />
                    <div>
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
                        <select  name="genre" id="genre" onChange={(e) => filterGenreHdl(e)}>
                            <option >Genres</option>
                            <option value='all'>All</option>
                            {genres.map(g => (
                                <option value={g.name} >{g.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

            </div>
            <div className={H.toplayer}></div>
            <div className={H.pagination}>
                <h3>VideoGames</h3>
                <img src={line} className={H.line} align="center" />
                <div className={H.btngroup}>  
                    <button className={H.btnPg} onClick={(e) => handlePage(e)} >1</button>
                    <button className={H.btnPg} onClick={() => setPage(2)} >2</button>
                    <button className={H.btnPg} onClick={(e) => handlePage(e)} >3</button>
                    <button className={H.btnPg} onClick={(e) => handlePage(e)} >4</button>
                    <button className={H.btnPg} onClick={(e) => handlePage(e)} >5</button>
                    <button className={H.btnPg} onClick={(e) => handlePage(e)} >6</button>
                    <button className={H.btnPg} onClick={(e) => handlePage(e)} >7</button>
                </div>
            </div>


            <nav className={H.cards}>
                {
                    allGames.length ? allGames.map(g => {
                        return (
                            <Link to={`/details/${g.id}`} style={{ textDecoration: 'none' }} key={g.id}  >
                                <Card name={g.name}
                                    id={g.id}
                                    img={g.image}
                                    genres={g.created_db ? g.genres.map(genre => ` ${genre.name} |`) : g.genres.map(genre => ` ${genre} |`)}
                                    rating={g.rating}
                                    released={g.released}
                                    key={g.id}
                                />
                            </Link>
                        );
                    })
                    : <img className={H.gif} src={gif} />
                }
            </nav>
        </div>
    )
}

