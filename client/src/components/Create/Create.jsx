import React, { useState, useEffect } from 'react';
import { createGame, getGenres, getPlatforms } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import C from './Create.module.css'
import swal from 'sweetalert';
//import { useForm } from 'react-hook-form'
// import notie from 'notie'
// import 'notie/dist/notie.css';

export default function CreateGame() {
    const dispatch = useDispatch()
    const genres = useSelector(state => state.genres)
    const platforms = useSelector(state => state.platforms)
    //const { register } = useForm();



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

        if (input.genres &&
            input.platforms.length &&
            input.description &&
            input.released &&
            input.image &&
            input.rating
        ) {
            setBotonActivo(true)
        } else {
            setBotonActivo(false)
        }
    }

    const handleSelectGenre = (e) => {
        setInput({
            ...input,
            genres: [...new Set([...input.genres, e.target.value])]
        });
    }
    const handleSelectPlatform = (e) => {
        setInput({
            ...input,
            platforms: [...new Set([...input.platforms, e.target.value])]
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.entries(errors).length === 0) {
            dispatch(createGame(input))
            // alert("GAME CREATED SUCCESSFULLY!!")
            // notie.alert({ type: 1, text: 'Successful creation!', time: 2 })
            swal("Success", "Videogame created! Check it out!", "success");
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
            setBotonActivo(false)
            document.getElementById("genres").getElementsByTagName('option')[0].selected = 'selected'
            document.getElementById("platforms").getElementsByTagName('option')[0].selected = 'selected'
        } else {
            swal("Oops!", "Something went wrong! Enter the required data!", "error");
            //alert('FAILED CREATION!! \n Invalid data, please enter the required data!')
            // setBotonActivo(false)
        }
        // dispatch(createGame(input))
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
        <div className={C.container}>
            <div className={C.containerLeft} >
                <h5 className={C.welcome}>¡New Game!</h5>
                <img className={C.imgNew} src={input.image} alt="Not found"/>
                <Link to='/home'>
                    <button className={C.btnBack}><div className={C.toLeft}></div>Back</button>
                </Link>
            </div>
            <div className={C.containerRight}>
                <form onSubmit={handleSubmit}  >
                    <div className={C.formItem} >
                        <label >Name</label>
                        <input type="text" value={input.name} name="name" placeholder="The name of the videogame is..." onChange={handleInputChange}
                            className={errors.name && 'danger'} />
                        {botonActivo && errors.name && (<h6 className={C.danger}> {errors.name}</h6>)}
                    </div>

                    <div className={C.formItem}>
                        <label>Description</label>
                        <textarea cols="100" rows="3" type="text" value={input.description} name="description" placeholder="The videogame is about..." onChange={handleInputChange}
                        /> {input.description.split(' ').length - 1}/120
                        {botonActivo && errors.description && (<h6 className={C.danger}> {errors.description}</h6>)}
                    </div>
                    <div className={C.formItem}>
                        <label>Released</label>
                        <input type="text" value={input.released} name="released" placeholder="YYYY-MM-DD" onChange={handleInputChange}
                        />
                        {/* ref={register({required:{value:true, message:'oeeeeeeeee'}})}  */}
                        {botonActivo && errors.released && (<h6 className={C.danger}> {errors.released}</h6>)}
                    </div>
                    <div className={C.formItem}>
                        <label >Image</label>
                        <input type="text" value={input.image} name="image" placeholder="https://url-of-image-the-videogame.png" onChange={handleInputChange}
                        />
                        {botonActivo && errors.image && (<h6 className={C.danger}> {errors.image}</h6>)}
                    </div>
                    <div >
                        <label>Genres: </label>
                        <select name="genres" id="genres" onChange={(e) => handleSelectGenre(e)}>
                            <option defaultValue={true}>Choose...</option>
                            {genres.map(g => (
                                <option value={g.name}>{g.name}</option>
                            ))}
                        </select>
                        {input.genres?.map(selec =>
                            <span>
                                {selec} <button className={C.btnx} onClick={(e) => handleDeleteGenre(e, selec)}>X</button>
                            </span>
                        )}
                        {botonActivo && errors.genres && (<h6 className={C.danger}> {errors.genres}</h6>)}
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
                            <span>
                                {selec} <button className={C.btnx} onClick={(e) => handleDeletePlatform(e, selec)}>X</button>
                            </span>
                        )}
                        {botonActivo && errors.platforms && (<h6 className={C.danger}> {errors.platforms}</h6>)}
                    </div>
                    <div className={C.formSlice}>
                        <label>Rating: </label>
                        <input type="range" min={1.00} max={5.00} className={C.slider} value={input.rating.value} step="0.1" name="rating" onChange={handleInputChange} />  {input.rating}
                        {botonActivo && errors.rating && (<h6 className={C.danger}> {errors.rating}</h6>)}
                    </div>

                    <div className={C.btnsub} >
                        <button type="submit" disabled={!botonActivo} className={C.btnAll} id="btn" >CREATE GAME</button>
                    </div>
                </form>

            </div>
        </div >
    );
};

export function validate(input) {
    let errors = {};
    if (!input.name) {
        errors.name = 'Name is required!';
    } else if (/[$%&|<>#]/.test(input.name)) {
        errors.name = 'No special characters allowed!';
    }
    // else if (!/^[A-Z]/.test(input.name)) {
    //     errors.name = 'The first letter must be capitalized!';
    // } 
    // else if (/[0-9]/.test(input.name)) {
    //     errors.name = 'Not numbers';
    // } else if (/\s/.test(input.name)) {
    //     errors.name = 'No Spaces';
    // }

    if (!input.image) {
        errors.image = 'Url is required!';
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(input.image)) {
        errors.image = 'Invalid url';
    }

    if (!input.description) {
        errors.description = 'Description is required!'
    } else if (input.description.split(' ').length < 20 || input.description.split(' ').length > 120) {
        errors.description = 'Number of words allowed: 20-120!';
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





