import React from 'react';
import { Link } from 'react-router-dom';
import logo from "./logo.png";
import N from './Navbar.module.css';

export default function Navbar() {

    return (
        <header className='header'>
            {/* <div className='container logo-nav-container'> */}
            <>
                <Link to='/' >
                    <img href='/home' src={logo} alt="logo" />
                </Link>

                {/* width="110px" height="45px"  */}
            </>

            <div className={N.btnNav}>
                <Link to='/create' >
                    {/* <button className={N.btnCreate} >Create</button> */}
                    <a  >Create</a>

                </Link>
                <Link to='/about'>
                    <a >About</a>
                </Link>
                <Link to='/about'>
                    <a >Contact</a>
                </Link>
            </div>

            {/*                 
                <nav className="navigation"> */}


            {/* <Link to='/' >
                        <button className='btnLogout'>LogOut</button>
                    </Link> */}
            {/* </nav> */}
            {/* </div> */}
        </header>
    )
}
