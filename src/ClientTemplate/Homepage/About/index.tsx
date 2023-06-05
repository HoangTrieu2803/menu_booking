import React, { ReactElement } from 'react'
import './style.scss'
import { Link } from 'react-router-dom'

export default function About() : ReactElement {
  return (
    <div className='about'>
        <div className='about-content'>
            <div className='about-content-left'>
                <h3>History of</h3>
                <h1>Our Restaurant</h1>
                <span className='about-content-left__img'><img src="./img/flower-decor.png" alt="" /></span>
                <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
                    atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.</p>
                <Link to={'/'} className='about-content-left__button'>Our Story</Link>
            </div>
            <div className='about-content-right'>
            <img src="./img/home-image-1-2.jpg" alt="" />                  
            </div>
        </div>
        <div className="about-content">
            <div className="about-content-right">
            <img src="./img/home-image-1-1.jpg" alt="" />  
            </div>
            <div className="about-content-left">
            <h3>Delicated</h3>
                <h1>Our Services</h1>
                <span className='about-content-left__img'><img src="./img/flower-decor.png" alt="" /></span>
                <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
                    atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.</p>
                <Link to={'/'} className='about-content-left__button'>View more</Link>
            </div>
        </div>
        <div className="about-banner row" >
            <div className='about-banner-left col-2'>
            </div>
            <div className="about-banner-right col-10">
                <div className='about-banner-right-title'>
                    <h1>Over 250 Delicious & Tasty</h1>
                    <h3>Recipe</h3>
                </div>
            </div>
        </div>
    </div>
  )
}
