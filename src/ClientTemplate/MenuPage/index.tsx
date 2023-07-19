import React, { ReactElement, useEffect,useState } from 'react'
import { Food } from "./type"
import './style.scss'
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import { useAppDispatch, useAppSelector } from '../../redux/store/store';
import { getDishes } from '../../redux/dishes/dishesSlice';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

export default function MenuPage(): ReactElement {

  const [value, setValue] = useState('all');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const foods = useAppSelector((state) => state.foods.data) as Food[];
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getDishes());
}, [])

const handleRenderFood = () => {
  return foods.map((item: Food) => {
    return (
      <TabPanel value={value === 'all' ? 'all' : item.type}>
      <div className="menu-content-item">
        <img src={`./img/${item.img}`} alt="" />
        <div className='menu-content-item-title'>
          <h4>{item.name}</h4>
          <p>{item.cost}</p>
        </div>
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
              <Tab label="All" value='all' />
              <Tab label= "Breakfast" value ='breakfast'/>
              <Tab label="Lunch" value='lunch' />
              <Tab label="Dinner" value='dinner' />
            </TabList>
          </Box>
          <div className='menu-content'>
            {handleRenderFood()}
          </div>
        </TabContext>
    </div>
  )
}
