import React, { ReactElement } from 'react'
import Navbar from './_components/Navbar'
import Footer from './_components/Footer'
import HomePage from './Homepage'
import MenuPage from './MenuPage'
import OrderPage from './OrderPage'
import { Route, Routes } from 'react-router-dom'
import Login from './Login'
import SignUp from './Signup'
import WeeklyMenu from './MenuPage/menu'
import PersonalMenu from './MenuPage/personal'

export default function ClientTemplate(): ReactElement {
  return (
    <div>
        <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/gallery' element={<MenuPage />} />
        <Route path='/daily' element={<WeeklyMenu />} />
        <Route path='/order' element={<OrderPage />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/personal-menu' element={<PersonalMenu/>} />
      </Routes>
        <Footer />
    </div>
  )
}
