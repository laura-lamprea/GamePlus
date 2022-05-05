import React from 'react';
import { Link } from 'react-router-dom'
import L from './Landing.module.css';

export default function LadingPage() {
    return (
        <div className={L.container}>
            <div className={L.containerInfo}>
                <h2>WELCOME TO GAME+</h2>
                <h1>ONLINE GAMING SITE</h1>
                <p>Here you can see the different
                    video games available along with relevant information
                    about them using the rawg external api.</p>
                <Link to='/home'>
                    <button className={L.btnGo}>Let's go!</button>
                </Link>
            </div>


        </div>
    )
};
