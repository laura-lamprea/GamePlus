import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { useEffect } from 'react' //useState
import { useDispatch, useSelector } from 'react-redux'
import { getAllGames } from '../../redux/actions'
import Card from '../Card/Card'
// import Navbar from '../Navbar/Navbar'
import H from './Home.module.css';
// import gif from "../gif1.gif";

export default function HomePage() {
    const dispatch = useDispatch()
    const allGames = useSelector(state => state.games)
    const [page, setPage] = useState(1)
    // const types = useSelector(state => state.types)
    useEffect(() => {
        dispatch(getAllGames(page))
        //dispatch(getTypes())
    }, [dispatch])  //monstar y ejecutar cuando tenga esto [esto] o hacer un useeffect de getallgames siempre y cuando tenga otro estado por ejemplo genres si no esta, que no lo haga

    function handlePage(e) {
        e.preventDefault(); 
        setPage(e.target.textContent)
        dispatch(getAllGames(page))
        console.log('el textcontext', e.target.textContent)
        // console.dir(e.target)
        console.log('pagina', page)
    }

    return(
        <div className={H.container}>
        {/* <Navbar /> */}
        <div className={H.container2} >
            {/* <div className={H.filters}>
                <div>
                    <button className={H.btnAll} onClick={(e) => { handleClick(e) }}>Load All Pokemons</button>
                </div>
                <div>
                    <select onChange={(e) => orderAlfaHdl(e)}>
                        <option >Name</option>
                        <option value='asc'>A-Z</option>
                        <option value='des'>Z-A</option>
                    </select>
                    <select onChange={(e) => orderForceHdl(e)}>
                        <option >Strength</option>
                        <option value='asc'>to the strongest</option>
                        <option value='des'>to the weakest</option>
                    </select>
                    <select onChange={(e) => filterCreatedHdl(e)}>
                        <option >Origin</option>
                        <option value='all'>All</option>
                        <option value='created'>Created</option>
                        <option value='api'>Existing</option>
                    </select>
                    <select name="type" id="type" onChange={(e) => filterTypeHdl(e)}>
                        <option >Types</option>
                        <option value='all'>All</option>
                        {types.map(t => (
                            <option value={t.name} >{t.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <input className={H.inputSearch} type="text" autoComplete='off' placeholder=" Search by exact Pokemon name..." onChange={(e) => handleInputChange(e)} />
                    <button className={H.btnSubmit} disabled={!botonActivo} type="submit" onClick={(e) => handleSubmit(e)}>GO!</button>
                </div>
            </div> */}
            {/* <div>
                <ul className={H.ul}>
                    <li className={H.li}><a className={H.a}>«</a></li>
                    <li className={H.li}><a className={H.a} onClick={(e) => handlePage(e)}>1</a></li>
                    <li className={H.li}><a className={H.a} onClick={(e) => handlePage(e)}>2</a></li>
                    <li className={H.li}><a className={H.a} onClick={(e) => handlePage(e)}>3</a></li>
                    <li className={H.li}><a className={H.a} onClick={(e) => handlePage(e)}>4</a></li>
                    <li className={H.li}><a className={H.a}>»</a></li>
                </ul>
            </div> */}
        </div>


        <div className={H.btngroup}>
                    <button type="button" onClick={(e) => handlePage(e)} >1</button>
                    <button type="button" onClick={(e) => handlePage(e)} >2</button>
                    <button type="button" onClick={(e) => handlePage(e)} >3</button>
                    <button type="button" onClick={(e) => handlePage(e)} >4</button>
               
            </div>

        <nav className={H.cards}>
            {
                allGames.length && allGames.map(g => {  //SI EL ESTADO EXITE
                    return (
                        // <Link to={`/details/${p.id}`} style={{ textDecoration: 'none' }} >
                            <Card name={g.name} img={g.image} rating={g.rating} />
                        // </Link>
                    );
                }) 
                // : <img className={H.gif} src={gif} height="250px" align="center" />
            }
        </nav>
    </div>
    )
}

// import React, { useState } from 'react';
// import { Link } from 'react-router-dom'
// import { useEffect } from 'react' //useState
// import { useDispatch, useSelector } from 'react-redux'
// import { getAllPokemons, getPokemonName, getTypes, orderAlfa, orderForce, filterType, filterCreated } from '../../redux/actions'
// import Card from '../Card/Card'
// import Navbar from '../Navbar/Navbar'
// import H from './Home.module.css';
// import gif from "../gif1.gif";

// export default function HomePage() {
//     const dispatch = useDispatch()
//     // const types = useSelector(state => state.types)
//     const allPokemons = useSelector(state => state.pokemons)
//     //
//     ////DISPATCH QUIEN VA A ENVIAR LA INFO AL REDUCER
//     //es igual al mapstateToprops 
//     //me guardo con selector todo lo que esta en el estado de pokemons
//     //ETADO, ME DEVUELVE SOLO ESA PARTE DEL ESTADO
//     //traernos del estado los pokemones cuando el componente se monta:
//     // useEffect(() => {
//     //     dispatch(getPokemons()) // despoacho esa accin: //es lo mismo que mapdispatchto porps
//     // })

//     // const [order, setOrder] = useState('')
//     const [page, setPage] = useState(1)
//     const [name, setName] = useState('')
//     const [botonActivo, setBotonActivo] = useState(false);
//     const [order, setOrder] = useState('')
//     const types = useSelector(state => state.types)

//     //
//     //EFECT PARA EMULAR LOS CICLOS DE VIDA,
//     //VA A AHCER ALGO PARA QUE SE RENDERIZE EL COMPONENTE
//     //EL USE EFFECT DESPACHA LA ACCION Y ESA ES LA LOGICA DEL PEDIDO (ACTIONS) EN DONDE SE HACE EL 
//     //PEDIDO AL BACK Y ENVIA A TRAVES DEL DISTPACH AL REDUCE A TRAVES DE UNA ACCION TODA LA INFO, 
//     //EL REDUCE LA AGARRA Y LA GUARDA EN EL ESTADO DE QUI ALLPOKEONS, AHI TENGO TODO LO DEL BACK
//     useEffect(() => {
//         // 
//         //despoacho esa accin: 
//         //es lo mismo que mapdispatchto porps
//         dispatch(getAllPokemons(page))
//         dispatch(getTypes())
//     }, [dispatch])
//     //ANTES DE QUE SE RENDERICE, DESPACHA LACCION


//     function handleClick(e) {
//         e.preventDefault();
//         dispatch(getAllPokemons(page))
//     }

//     function handlePage(e) {
//         // e.preventDefault(); 
//         setPage(e.target.textContent)
//         console.log('el textcontext', e.target.textContent)
//         // console.dir(e.target)
//         console.log('pagina', page)
//     }
//     function handleSubmit(e) {
//         e.preventDefault();
//         // console.log(allPokemons.map(p => p.name))
//         dispatch(getPokemonName(name))
//         setName(' ')
//     }
//     const handleInputChange = (e) => {
//         e.preventDefault();
//         setName(e.target.value)
//         // if(allPokemons.filter(p=>p.name === e.target.value)){
//         //     setBotonActivo(true)
//         // }else {
//         //     setBotonActivo(false)
//         // }
//     };
//     function orderAlfaHdl(e) {
//         e.preventDefault();
//         dispatch(orderAlfa(e.target.value));
//         setOrder(e.target.value)
//     }
//     function orderForceHdl(e) {
//         e.preventDefault();
//         dispatch(orderForce(e.target.value));
//         setOrder(e.target.value)
//     }
//     function filterTypeHdl(e) {
//         dispatch(filterType(e.target.value));
//     }
//     function filterCreatedHdl(e) {
//         dispatch(filterCreated(e.target.value));
//     }


//     return (
//         <div className={H.container}>
//             <Navbar />
//             <div className={H.container2} >
//                 <div className={H.filters}>
//                     <div>
//                         <button className={H.btnAll} onClick={(e) => { handleClick(e) }}>Load All Pokemons</button>
//                     </div>
//                     <div>
//                         <select onChange={(e) => orderAlfaHdl(e)}>
//                             <option >Name</option>
//                             <option value='asc'>A-Z</option>
//                             <option value='des'>Z-A</option>
//                         </select>
//                         <select onChange={(e) => orderForceHdl(e)}>
//                             <option >Strength</option>
//                             <option value='asc'>to the strongest</option>
//                             <option value='des'>to the weakest</option>
//                         </select>
//                         <select onChange={(e) => filterCreatedHdl(e)}>
//                             <option >Origin</option>
//                             <option value='all'>All</option>
//                             <option value='created'>Created</option>
//                             <option value='api'>Existing</option>
//                         </select>
//                         <select name="type" id="type" onChange={(e) => filterTypeHdl(e)}>
//                             <option >Types</option>
//                             <option value='all'>All</option>
//                             {types.map(t => (
//                                 <option value={t.name} >{t.name}</option>
//                             ))}
//                         </select>
//                     </div>
//                     <div>
//                         <input className={H.inputSearch} type="text" autoComplete='off' placeholder=" Search by exact Pokemon name..." onChange={(e) => handleInputChange(e)} />
//                         <button className={H.btnSubmit} disabled={!botonActivo} type="submit" onClick={(e) => handleSubmit(e)}>GO!</button>
//                     </div>
//                 </div>
//                 <div>
//                     <ul className={H.ul}>
//                         <li className={H.li}><a className={H.a}>«</a></li>
//                         <li className={H.li}><a className={H.a} onClick={(e) => handlePage(e)}>1</a></li>
//                         <li className={H.li}><a className={H.a} onClick={(e) => handlePage(e)}>2</a></li>
//                         <li className={H.li}><a className={H.a} onClick={(e) => handlePage(e)}>3</a></li>
//                         <li className={H.li}><a className={H.a} onClick={(e) => handlePage(e)}>4</a></li>
//                         <li className={H.li}><a className={H.a}>»</a></li>
//                     </ul>
//                 </div>
//             </div>


//             {/* <div className={H.btngroup}>
//                         <button type="button" onClick={(e) => handlePage(e)} >1</button>
//                         <button type="button" onClick={(e) => handlePage(e)} >2</button>
//                         <button type="button" onClick={(e) => handlePage(e)} >3</button>
//                         <button type="button" onClick={(e) => handlePage(e)} >4</button>
                   
//                 </div> */}

//             <nav className={H.cards}>
//                 {
//                     allPokemons.length ? allPokemons.map(p => {  //SI EL ESTADO EXITE
//                         return (
//                             <Link to={`/details/${p.id}`} style={{ textDecoration: 'none' }} >
//                                 <Card name={p.name} force={p.force} imgT={p.imgT} type={p.type ? p.type.map(t => ` ${t} `) : (p.types.map(t => ` ${t.name} `))} />
//                                 {/* <Card name={p.name} force={p.force} imgT={p.imgT} type={p.type ? p.type : (p.types.map(t => t.name))} /> */}
//                             </Link>
//                         );
//                     }) : <img className={H.gif} src={gif} height="250px" align="center" />
//                 }
//             </nav>
//         </div>
//     )
// };