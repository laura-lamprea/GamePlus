// import React, { useState, useEffect } from 'react';
// import { createPokemon, getTypes } from '../../redux/actions';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useHistory } from 'react-router-dom';
// import C from './Create.module.css'

// import notie from 'notie'
// import 'notie/dist/notie.css';

// export function validate(input) {
//     let errors = {};
//     if (!input.name) {
//         errors.name = 'Name is required';
//     } else if (/[A-Z]/.test(input.name)) {
//         errors.name = 'Dont capitalize';
//     } else if (/[0-9]/.test(input.name)) {
//         errors.name = 'Not numbers';
//     } else if (/\s/.test(input.name)) {
//         errors.name = 'No Spaces';
//     }  
//     if(!input.imgT) {
//         errors.imgT = 'Url is required';
//     } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(input.imgT)) {
//         errors.imgT = 'Invalid url';
//     } 
//     //
//     //SI YA EXISTE 
//     // if (!input.type) {
//     //     errors.type = 'Types are required';
//     //   }
//     return errors;
// };


// export default function CreatePokemon() {

//     const dispatch = useDispatch()
//     const types = useSelector(state => state.types)
//     // const history = useHistory()

//     //crear un estado con todo lo que necesita el POST para crear
//     const [input, setInput] = useState({
//         name: '',
//         imgT: '',
//         lifeTime: '',
//         force: '',
//         defending: '',
//         speed: '',
//         height: '',
//         weight: '',
//         type: [],
//     });

//     const [botonActivo, setBotonActivo] = useState(false);
//     const [errors, setErrors] = useState({});

//     // despoacho esa accin: 
//     useEffect(() => {
//         dispatch(getTypes())
//     }, [dispatch])

//     const handleInputChange = (e) => {
//         setInput({
//             ...input,
//             [e.target.name]: e.target.value
//         });
//         setErrors(validate({
//             ...input,
//             [e.target.name]: e.target.value
//         }));

//         if (input.name && Object.entries(errors).length == 0 && input.type.length && input.imgT) {
//             setBotonActivo(true)
//         } else {
//             setBotonActivo(false)
//         }
//         // console.log('tamaño del objeto error', Object.entries(errors).length) //==0
//         // console.log('el name si hay', input.name)
//         // console.log('tmaño de arr types', input.type.length)
//     }

//     // function enables() {
//     //     if(input.name){
//     //         console.log("SI ESCRIBIERON")
//     //         const btn = document.getElementById('btn')
//     //         btn.disabled =true;
//     //     }
//     // }


//     const handleSelect = (e) => {
//         setInput({
//             ...input,
//             type: [...input.type, e.target.value]
//         });
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         dispatch(createPokemon(input))
//         //alert("personaje creado")
//         notie.alert({ type: 1, text: 'Successful creation!', time: 3 })
//         //history.push('/pokemons') //para ir al home
//     }
//     function handleDeleteType(e, deleteType) {
//         e.preventDefault();
//         setInput({
//             ...input,
//             type: input.type.filter(type => type !== deleteType)
//         })

//     }

//     return (
//         <body >
//             <div className={C.container}>
//                 <div className={C.container1} >
//                     <div>
//                         <h5 className={C.welcome}>¡Welcome {input.name}!</h5>
//                     </div>
//                     <div>
//                         <img src={input.imgT} width='400px' /> 
//                     </div>
//                     <div>
//                         <Link to='/home'><button className={C.btnBack}>Back</button></Link>
//                     </div>
//                 </div>
//                 <div className={C.form}>

//                     <div className={C.erros}>{errors.name && errors.name} {errors.imgT && errors.imgT}</div>

//                     <form onSubmit={handleSubmit} >
//                         <div className={C.container2}>
//                             <label>Name</label>
//                             <input type="text" value={input.name} name="name" placeholder="-" onChange={handleInputChange}
//                                 className={errors.name && 'danger'}
//                             />
//                             <label >Image</label>
//                             <input type="text" value={input.imgT} name="imgT" placeholder="https://imagePokemon-transparent.png" onChange={handleInputChange} 
//                               className={`${C.input} ${errors.imgT && 'danger'}`}
//                             // className={errors.imgT && 'danger'}
//                             />
//                             <label>Height</label>
//                             <input type="number" value={input.height.value} className={C.input} placeholder="m" name="height" onChange={handleInputChange} />
//                             <label>Weight</label>
//                             <input type="number" value={input.weight} className={C.input} placeholder="Kg" name="weight" onChange={handleInputChange} />
//                         </div>

//                         <div className={C.container3}>
//                             <div className={C.container4}>
//                                 <label>HP: {input.lifeTime}</label>
//                                 {/* <input type="text" value={input.lifeTime} name="lifeTime" placeholder="-" onChange={handleInputChange} /> */}
//                                 <input type="range" min={1} max={100} autocomplete="off" className={C.slider} value={input.lifeTime.value} name="lifeTime" onChange={handleInputChange} />


//                                 <label>ATK: {input.force}</label>
//                                 {/* <input type="text" value={input.force} name="force" placeholder="-" onChange={handleInputChange} /> */}
//                                 <input type="range" min={1} max={100} value={input.force.value} name="force" onChange={handleInputChange} />
//                             </div>
//                             <div className={C.container4}>
//                                 <label>DEF: {input.defending}</label>
//                                 {/* <input type="text" value={input.defending} name="defending" placeholder="-" onChange={handleInputChange} /> */}
//                                 <input type="range" min={1} max={100} value={input.defending.value} name="defending" onChange={handleInputChange} />

//                                 <label>SPD: {input.speed}</label>
//                                 {/* <input type="text" value={input.speed} name="speed" placeholder="-" onChange={handleInputChange} /> */}
//                                 <input type="range" min={1} max={100} value={input.speed.value} name="speed" onChange={handleInputChange} />

//                             </div>
//                         </div>

//                         <label>Types: </label>
//                         <select name="type" id="type" onChange={(e) => handleSelect(e)}>
//                             {/* <select name="type" id="type" onChange={handleInputChange}> */}
//                             <option defaultValue={true}>Choose...</option>
//                             {types.map(t => (
//                                 <option value={t.name}>{t.name}</option>
//                             ))}
//                         </select>

//                         {/* <ul> */}
//                         {input.type?.map(selec =>
//                             <a>
//                                 {selec} <button className={C.btnx} onClick={(e) => handleDeleteType(e, selec)}>X</button>
//                             </a>
//                         )}
//                         {/* {input.type.map(selec => (selec + " "))} */}
//                         {/* {input.types.map((tipo) => <span>{tipo}</span>)} */}
//                         {/* </ul> */}


//                         <div className={C.btnsub} >
//                             <button type="submit" id="btn" disabled={!botonActivo}>CREATE POKEMON</button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </body>

//     );
// };



