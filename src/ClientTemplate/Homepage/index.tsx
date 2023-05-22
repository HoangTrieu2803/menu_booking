import React, { ReactElement } from 'react'
import Carousel from './Carousel'
import About from './About'
import Stunning from './Stunning'
import Team from './Team'

export default function HomePage():ReactElement {
  return (
    <div>
      <Carousel/>
      <About/>
      <Stunning/>
      <Team/>
    </div>
  )
}
