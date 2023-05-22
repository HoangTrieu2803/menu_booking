import React, { ReactElement } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHotTub, faMartiniGlass, faBowlFood, faUser, faEgg, faTruck } from '@fortawesome/free-solid-svg-icons'
import { Category } from './type'
import './style.scss'

const title = [{ title: 'High Quality Foods', icon: faHotTub },
{ title: 'Inspiring Recipes', icon: faMartiniGlass },
{ title: 'Salutary Meals', icon: faBowlFood },
{ title: 'Proffessional Staff', icon: faUser },
{ title: 'Pristine Ingredients', icon: faEgg },
{ title: 'Express Delivery', icon: faTruck },
]

const handleRender = () => {
    return title.map((item: Category) => {
        return (
            <div className='stunning-content-item col-4'>
                <FontAwesomeIcon icon={item.icon} className='stunning-content-item__icon' />
                <h3>{item.title}</h3>
                <p>Etiam feugiat eleifend est, sed luctus odio tempor vitae. Vivamus maximus scelerisque ipsum nec commodo. Vivamus maximus scelerisque ipsum nec commodo.</p>
            </div>
        )
    })
}
export default function Stunning(): ReactElement {
    return (
        <div className='stunning'>
            <div className='stunning-title'>
                <h3>For your comfort</h3>
                <h1>Stunning Things</h1>
                <span><img src="./img/flower-decor-2.png" alt="" /></span>
            </div>
            <div className='stunning-content row'>
                {handleRender()}
            </div>
        </div>
    )
}
