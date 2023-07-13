import React, { ReactElement, useEffect } from 'react'
import { Food } from "./type"
import './style.scss'
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import { useAppDispatch, useAppSelector } from '../../redux/store/store';
import { getDishes } from '../../redux/dishes/dishesSlice';

export default function MenuPage(): ReactElement {

  const foods = useAppSelector((state) => state.foods.data) as Food[];
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getDishes());
}, [])

  const handleRenderFood = () => {
    return foods.map((item: Food) => {
      return (
        <div className="menu-content-item">
          <img src={`./img/${item.img}`} alt="" />
          <div className='menu-content-item-title'>
            <h4>{item.name}</h4>
            <p>{item.cost}</p>
          </div>
        </div>
      )
    })
  }

  return (
    <div className='menu'>
      <div className='menu-banner'>
        <div className="menu-banner-title">
          <h3>GALLERY</h3>
          <h1>MENU</h1>
          <DinnerDiningIcon className='menu-content-item-title__icon' />
        </div>
      </div>
      <div className='menu-content'>
        {handleRenderFood()}
      </div>
    </div>
  )
}
