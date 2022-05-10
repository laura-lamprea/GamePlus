import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../logo.png";
import N from './Navbar.module.css';

export default function Navbar() {

    return (
        <header className='header'>
            <Link to='/' >
                <img href='/home' src={logo} alt="logo" />
            </Link>
            <div className={N.btnNav}>
                <Link to='/create' >
                    <a className={N.a} >Create</a>
                </Link>
                <Link to='/about'>
                    <a className={N.a}>About</a>
                </Link>
            </div>
        </header>
    )
}
