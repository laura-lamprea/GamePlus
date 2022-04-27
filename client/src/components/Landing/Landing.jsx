import React from 'react';
import { Link } from 'react-router-dom'
import L from './Landing.module.css';
// import logo from "./logo.png";

export default function LadingPage() {
    return (
        <div className={L.container}>
            {/* <img className={L.imgL} height='150px' src={logo} alt="logo" />  
            <img  className={L.img2} height='300px' src={pokes} alt="logo" />   */}
            <Link to='/home'>
            <button className={L.btnGo}>GO!</button>
            </Link>
        </div>
    )
};
