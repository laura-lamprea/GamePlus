import React from 'react';
import { Link } from 'react-router-dom';
// import logo from "./logo.png";
import './Navbar.module.css';

export default function Navbar() {

    return (
        <header className='header'>
            <div className='container logo-nav-container'>
                {/* <img className="imgl" src={logo} width="110px" height="45px" alt="logo" /> */}
                
                <nav className="navigation">
                    <Link to='/create' >
                        <button className='btnCreate'>Create</button>
                    </Link>
                    <Link to='/about'>
                        <button className='btnCreate'>About</button>
                    </Link>

                    <Link to='/' >
                        <button className='btnLogout'>LogOut</button>
                    </Link>
                </nav>
            </div>
        </header>
    )
}
