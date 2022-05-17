import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../logo.png";
import N from './Navbar.module.css';

export default function Navbar() {

    return (
        <header className='header'>
            <img href='/home' src={logo} alt="logo" />
            <Link to='/create' >
                <button type="button" class="btn btn-success btn-sm ">
                    <span class="glyphicon glyphicon-plus"></span> CREATE
                </button>
            </Link>
            <div className={N.btnNav}>

                <Link to='/about'>
                    <button type="button" class="btn btn-outline-light">
                        <span class="glyphicon glyphicon-user"></span> About
                    </button>
                </Link>
                <Link to='/' >
                    <button type="button" class="btn btn-outline-light">
                        <span class="glyphicon glyphicon-log-out"></span> LogOut
                    </button>
                </Link>
            </div>
        </header>
    )
}
