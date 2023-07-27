import React from 'react'
import AdminNav from './_components/Navbar'
import { Route, Routes } from 'react-router-dom'
import DishesManager from './DishesManager'
import OrderManager from './OrderManager'

export default function AdminTemplate() {
  return (
    <div>
        <AdminNav/>
        <Routes>
            <Route path='/' element={<DishesManager/>} />
            <Route path='/order' element={<OrderManager/>}/>
        </Routes>
        
    </div>
  )
}
