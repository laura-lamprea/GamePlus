import React from 'react';
import { Link } from 'react-router-dom';
import A from './About.module.css';
import git from "./git.png";
import link from "./link.png";
import logo from "../logo.png";


export default function About() {


    return (
        <div className={A.container}>
            <center>
                <h1>ABOUT</h1>
                <img src={logo} className={A.loguito} alt="logo" />
                <p className={A.p}>
                    It is an app where you can see different video games available with
                    relevant information about them extracted from the external api <a href="https://rawg.io/apidocs">rawg</a>.
                    It has filtering and rating functionalities, alphabetical ordering
                    and depending on the origin of the game (api or DB), search for
                    the one you want and you can also create new games with a form
                    available to enter the necessary information to create it
                    successfully. It was built using React,  Redux, Node and Sequelize.
                    Finally, I leave you two links to contact me!
                </p>
                <div className={A.container2}>
                    <a title="My Github" href="https://github.com/laura-lamprea" target="_blank" rel="noreferrer" ><img src={git} height='70px' alt="Not found" /></a>
                    <a title="My LinkedIn" href="https://www.linkedin.com/in/lauralamprea/" target="_blank" rel="noreferrer" ><img src={link} height='80px' alt="Not found" /></a>
                </div>
                <div>
                    <Link to='/home'><button className={A.btnBack}>&laquo; Back</button></Link>
                </div>
            </center>

        </div>
    )
}