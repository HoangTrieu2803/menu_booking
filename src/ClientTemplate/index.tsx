import React, { ReactElement } from 'react'
import Navbar from './_components/Navbar'
import Footer from './_components/Footer'
import HomePage from './Homepage'
import MenuPage from './MenuPage'
import { Route, Routes } from 'react-router-dom'

export default function ClientTemplate(): ReactElement {
  return (
    <div>
        <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/menu' element={<MenuPage />} />
      </Routes>
        <Footer />
    </div>
  )
}
