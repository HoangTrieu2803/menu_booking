import React, { ReactElement } from 'react'
import './style.scss'
import { Link } from 'react-router-dom'

export default function Carousel(): ReactElement {
    const isLogin = localStorage.getItem('User') ? '/order' : '/login';

    return (
        <div className='carousel'>
            <div className='carousel-content'>
                <h3>Taste the Difference</h3>
                <h1>Fine & Delicious Food</h1>
                <Link to={isLogin} className="carousel-content__button">
                    LET'S START
                </Link>

            </div>
        </div>
    )
}
