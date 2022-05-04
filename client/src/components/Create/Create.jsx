import React, { useState, useEffect } from 'react';
import { createGame, getGenres, getPlatforms } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import C from './Create.module.css'

//import notie from 'notie'
// import 'notie/dist/notie.css';

export function validate(input) {
    let errors = {};
    if (!input.name) {
        errors.name = 'Name is required';
    } else if (!/^[A-Z]/.test(input.name)) {
        errors.name = 'The first letter must be capitalized!';
    } else if (/[$%&|<>#]/.test(input.name)) {
        errors.name = 'No special characters allowed!';
    }
    // else if (/[0-9]/.test(input.name)) {
    //     errors.name = 'Not numbers';
    // } else if (/\s/.test(input.name)) {
    //     errors.name = 'No Spaces';
    // }

    if (!input.image) {
        errors.image = 'Url is required';
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(input.image)) {
        errors.image = 'Invalid url';
    }

    if (!input.description) {
        errors.description = 'Description is required!';
    } else if (input.description.split(' ').length < 20 && input.description.split(' ').length > 100) {
        errors.description = input.description.split(' ').length + 'Number of words allowed: 10-100!';
    }

    if (!input.released) {
        errors.released = 'Released is required!';
    } else if (!/^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/.test(input.released)) {
        errors.released = 'Valid date format: YYYY-MM-DD';
    }

    if (!input.rating) {
        errors.rating = 'Rating is required!';
    }
    if (!input.genres.length) {
        errors.genres = 'Genres is required!';
    }
    if (!input.platforms.length) {
        errors.platforms = 'Platforms is required!';
    }
    return errors;
};


export default function CreateGame() {

    const dispatch = useDispatch()
    const genres = useSelector(state => state.genres)
    const platforms = useSelector(state => state.platforms)
    // const history = useHistory()


    const [input, setInput] = useState({
        name: '',
        image: '',
        description: '',
        released: '',
        rating: '',
        platforms: [],
        genres: [],
    });

    const [botonActivo, setBotonActivo] = useState(false);
    const [errors, setErrors] = useState({});

    // despoacho esa accin: 
    useEffect(() => {
        dispatch(getGenres())
        dispatch(getPlatforms())
    }, [dispatch])

    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));

        // if (input.name &&
        //     Object.entries(errors).length == 0 &&
        //     input.genres &&
        //     input.platforms.length &&
        //     input.description &&
        //     input.released &&
        //     input.image &&
        //     input.rating
        // ) {
        //     setBotonActivo(true)
        // } else {
        //     setBotonActivo(false)
        // }

        // // console.log('tamaño del objeto error', Object.entries(errors).length) //==0
        // // console.log('el name si hay', input.name)
        // // console.log('tmaño de arr types', input.type.length)
    }
    // const handleCleanForm = (e) => {
    //     setInput({
    //         ...input,
    //         name: '',
    //         image: '',
    //         description: '',
    //         released: '',
    //         rating: '',
    //         platforms: [],
    //         genres: [],
    //     });
    // }

    // function enables() {
    //     if(input.name){
    //         console.log("SI ESCRIBIERON")
    //         const btn = document.getElementById('btn')
    //         btn.disabled =true;
    //     }
    // }


    const handleSelectGenre = (e) => {
        setInput({
            ...input,
            genres: [...input.genres, e.target.value]
        });
    }
    const handleSelectPlatform = (e) => {
        setInput({
            ...input,
            platforms: [...input.platforms, e.target.value]
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createGame(input))
        alert("Game creado")
        setInput({
            ...input,
            name: '',
            image: '',
            description: '',
            released: '',
            rating: '',
            platforms: [],
            genres: [],
        });
        //notie.alert({ type: 1, text: 'Successful creation!', time: 3 })
        //history.push('/games') //para ir al home
    }
    function handleDeleteGenre(e, deleteGenre) {
        e.preventDefault();
        setInput({
            ...input,
            genres: input.genres.filter(genre => genre !== deleteGenre)
        })
    }
    function handleDeletePlatform(e, deletePLatform) {
        e.preventDefault();
        setInput({
            ...input,
            platforms: input.platforms.filter(pl => pl !== deletePLatform)
        })
    }




    return (
        <body >
            <div className={C.container}>
                <div className={C.container1} >
                    <div>
                        <h5 className={C.welcome}>¡Welcome {input.name}!</h5>
                    </div>
                    <div>
                        <img src={input.image} width='400px' />
                    </div>
                    <div>
                        <Link to='/home'><button className={C.btnBack}>Back</button></Link>
                    </div>
                </div>
                <div className={C.form}>

                    {/* <div className={C.erros}>{errors.name && errors.name} {errors.image && errors.image}</div> */}

                    <form onSubmit={handleSubmit} >
                        <div className={C.container2}>
                            <div>
                                <label>Name*</label>
                                <input type="text" value={input.name} name="name" placeholder="-" onChange={handleInputChange}
                                    className={errors.name && 'danger'} />
                                {errors.name && (<p className='danger'>{errors.name}</p>)}
                            </div>

                            <div>
                                <label>Description</label>
                                <input type="text" value={input.description} name="description" placeholder="Description..." onChange={handleInputChange}
                                />
                                {errors.description && (<p className='danger'>{errors.description}</p>)}
                            </div>
                            <div>
                                <label>Released</label>
                                <input type="text" value={input.released} name="released" placeholder="YYYY-MM-DD" onChange={handleInputChange}
                                // 2022-09-17  2015-05-18
                                />
                                {errors.released && (<p className='danger'>{errors.released}</p>)}
                            </div>
                            <div>
                                <label >Image</label>
                                <input type="text" value={input.image} name="image" placeholder="https://GameImagen.png" onChange={handleInputChange}
                                    className={`${C.input} ${errors.image && 'danger'}`}
                                />
                                {errors.image && (<p className='danger'>{errors.image}</p>)}
                            </div>
                            <div>
                                <label>Rating: {input.rating}</label>
                                <input type="range" min={0.0} max={5} className={C.slider} value={input.rating.value} step="0.1" name="rating" onChange={handleInputChange} />
                                {errors.rating && (<p className='danger'>{errors.rating}</p>)}
                            </div>
                            <div>
                                <label>Genres: </label>
                                <select name="genres" id="genres" onChange={(e) => handleSelectGenre(e)}>
                                    <option defaultValue={true}>Choose...</option>
                                    {genres.map(g => (
                                        <option value={g.name}>{g.name}</option>
                                    ))}
                                </select>
                                {input.genres?.map(selec =>
                                    <a>
                                        {selec} <button className={C.btnx} onClick={(e) => handleDeleteGenre(e, selec)}>X</button>
                                    </a>
                                )}
                                {errors.genres && (<p className='danger'>{errors.genres}</p>)}
                            </div>
                            <div>
                                <label>Platforms: </label>
                                <select name="platforms" id="platforms" onChange={(e) => handleSelectPlatform(e)}>
                                    <option defaultValue={true}>Choose...</option>
                                    {platforms.map(p => (
                                        <option value={p}>{p}</option>
                                    ))}
                                </select>
                                {input.platforms?.map(selec =>
                                    <a>
                                        {selec} <button className={C.btnx} onClick={(e) => handleDeletePlatform(e, selec)}>X</button>
                                    </a>
                                )}
                                {errors.platforms && (<p className='danger'>{errors.platforms}</p>)}

                            </div>
                        </div>
                        {/* <button onClick={(e) => handleCleanForm(e)}>CREATE GAME</button>   */}
                        <div className={C.btnsub} >
                             {/* disabled={!botonActivo}  onClick={(e) => handleCleanForm(e)} */}
                            <button type="submit" id="btn"  >CREATE GAME</button>  handleCleanForm
                        </div>
                    </form>
                </div>
            </div >
        </body >

    );
};



