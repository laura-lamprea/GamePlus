// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useParams } from 'react-router-dom';
// import { getPokemon } from '../../redux/actions';
// import D from './Detail.module.css';
// import gif from "../gif1.gif";

// export default function DetailPage() {

//     const dispatch = useDispatch();
//     const pokemon = useSelector(state => state.pokemon)

//     const id = useParams();
//     //console.log(id.id)

//     useEffect(() => {
//         dispatch(getPokemon(id.id))
//     }, [dispatch])

//     return (
//         <div>
//             <div className={D.container}>

//                 {
//                     pokemon.length > 0 ?
//                         <div>
//                             <div className={D.container2}>
//                                 <h1>{pokemon[0].name}</h1>
//                                 <p>N.°00{pokemon[0].id}</p>
//                             </div>
//                             <div className={D.container3}>
//                                 <div className={D.container4}>
//                                     <img src={pokemon[0].imgT} height="400px" alt="Not found" />
//                                 </div>
//                                 <div className={D.container5}>
//                                     <h2>HP {pokemon[0].lifeTime}</h2>
//                                     <div className={D.skills}>
//                                         <div className={`${D.circularProgress} ${D.atk}`} title={pokemon[0].force}></div>
//                                         <div className={`${D.circularProgress} ${D.def}`} title={pokemon[0].defending}></div>
//                                         <div className={`${D.circularProgress} ${D.spd}`} title={pokemon[0].speed}></div>
//                                     </div>

//                                     <div className={D.container6}>
//                                         <h3></h3><h3></h3>
//                                         <h3>Height: {Math.round((pokemon[0].height * 0.1 + Number.EPSILON) * 100) / 100} m </h3>
//                                         <h3>Weight: {Math.round((pokemon[0].weight * 0.1 + Number.EPSILON) * 100) / 100} Kg</h3>
//                                         <h3></h3><h3></h3>
//                                     </div>
//                                     {/* <h3>types {pokemon[0].type ? pokemon[0].type.map(t => t) : pokemon[0].types.map(t => t.name)}</h3> */}
                                
//                                         {pokemon[0].type ? pokemon[0].type.map(t =>
//                                             <a className={D.type}>{t}</a>) :
//                                             pokemon[0].types.map(t =>
//                                             <a className={D.type}>{t.name}</a>)
//                                         }
//                                    <div>
//                                    <Link to='/home'><button className={D.btnBack}>Back</button></Link>

//                                    </div>

//                                 </div>

//                             </div>


//                         </div> : <img className={D.gif} src={gif} />
//                 }
//             </div>
//         </div>
//     )
// };
