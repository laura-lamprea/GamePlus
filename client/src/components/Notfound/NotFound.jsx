import React from 'react';
import { Link } from 'react-router-dom';
import N from './Not.module.css'


export default function NotFound() {


    return (
        <div className={N.container}>
            <Link to='/home'>
                <button className={N.btnGo}>Go to home</button>
            </Link>
        </div>

    )
}