import React, { ReactElement, useState } from 'react'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Food } from "./type"
import './style.scss'
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';

export default function MenuPage(): ReactElement {
  const [value, setValue] = useState('0');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const foods = [{ name: 'com ga', img: 'g1.jpg', type: '2', cost: '40.000', id: '1' },
  { name: 'com bo', img: 'g2.jpg', type: '1', cost: '40.000', id: '2' },
  { name: 'com ga chien nuoc mam', img: 'g3.jpg', type: '2', cost: '40.000', id: '3' },
  { name: 'com bo xao', img: 'g4.jpg', type: '1', cost: '40.000', id: '4' },
  { name: 'com ca chien', img: 'g5.jpg', type: '1', cost: '40.000', id: '5' },
  { name: 'com ga xao sa ot', img: 'g6.jpg', type: '2', cost: '40.000', id: '6' }]

  const handleRenderFood = () => {
    return foods.map((item: Food) => {
      return (
        <TabPanel value={value === '0' ? '0' : item.type} className="menu-content-item">
          <img src={`./img/${item.img}`} alt="" />
          <div className='menu-content-item-title'>
            <h4>{item.name}</h4>
            <p>{item.cost}</p>
          </div>
        </TabPanel>
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
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="All" value='0' />
              <Tab label="Lunch" value='1' />
              <Tab label="Dinner" value='2' />
            </TabList>
          </Box>
          <div className='menu-content'>
            {handleRenderFood()}
          </div>
        </TabContext>
      </div>
  )
}
