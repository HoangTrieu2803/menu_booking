import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import './style.scss'
import nextMonday from 'date-fns/nextMonday'
import lightFormat from 'date-fns/lightFormat'
import addDays from 'date-fns/addDays'
import { useAppSelector, useAppDispatch } from '../../redux/store/store';
import { getDishes } from '../../redux/dishes/dishesSlice';
import { Menu } from './type';


export default function WeeklyMenu() {

    const handleFormatDate = (date: Date) => {
        return lightFormat(date, 'dd-MM');
    }
    const firstMonday = nextMonday(new Date());
    const lastFriday = addDays(firstMonday, 4);
    const firstMondayFormat = handleFormatDate(firstMonday);
    const lastFridayFormat = handleFormatDate(lastFriday);
    const [firstDay, setFirstDay] = useState<Date>(firstMonday);
    const [lastDay, setLastDay] = useState<Date>(lastFriday);
    const dispatch = useAppDispatch();
    const lastWeekMenu = JSON.parse(localStorage.getItem('daily1') as any) as Menu[];
    const recentWeekMenu = JSON.parse(localStorage.getItem('daily2') as any) as Menu[];
    const nextWeekMenu = JSON.parse(localStorage.getItem('daily3') as any) as Menu[];
    const [daily, setDaily] = useState<Menu[]>(recentWeekMenu);
    const foods = useAppSelector((state) => state.foods.data);
    useEffect(() => {
        dispatch(getDishes());
        const nextTwoWeek = handleFormatDate(nextMonday(nextMonday(new Date())))
        console.log(nextTwoWeek, firstMondayFormat)
        if (firstMondayFormat === nextTwoWeek) {
            localStorage.setItem('daily1', JSON.stringify(recentWeekMenu));
            localStorage.setItem('daily2', JSON.stringify(nextWeekMenu));
            localStorage.setItem('daily3', JSON.stringify(randomMenu()));
        }
    }, [])
    
    useEffect(() => {
        const firstDayFormat = (handleFormatDate(firstDay))
        if (firstMondayFormat === firstDayFormat) {
            setDaily(recentWeekMenu)
        } else if (firstMonday < firstDay) {
            setDaily(nextWeekMenu)
        } else setDaily(lastWeekMenu)
    }, [firstDay])
    const randomFood = () => {
        return foods[Math.floor(Math.random() * foods.length)]
    }
    const randomMenu = () => {
        return [
            { date: "T2", breakfast: randomFood(), lunch: randomFood(), dinner: randomFood() },
            { date: "T3", breakfast: randomFood(), lunch: randomFood(), dinner: randomFood() },
            { date: "T4", breakfast: randomFood(), lunch: randomFood(), dinner: randomFood() },
            { date: "T5", breakfast: randomFood(), lunch: randomFood(), dinner: randomFood() },
            { date: "T6", breakfast: randomFood(), lunch: randomFood(), dinner: randomFood() },
        ]
    }

    const isLogin = localStorage.getItem('User') ? '/order' : '/login';

    const renderMenu = (dailyMenu: Menu[]) => {
        return dailyMenu.map((item: any, index: number) => {
            return (
                <div className='weeklyMenu-content__table-item'>
                    <div className='weeklyMenu-content__table-item-col'><span>{item.date} <br />{handleFormatDate(addDays(firstDay, index))}</span></div>
                    <div className='weeklyMenu-content__table-item-col'>
                        {item.breakfast.name}
                        <br />
                        {/* {item.breakfast} */} Canh rong bien
                        <br />
                        {item.breakfast.cost}
                    </div>
                    <div className='weeklyMenu-content__table-item-col'>
                        {item.lunch.name}
                        <br />
                        {/* {item.lunch} */} Canh rong bien
                        <br />
                        {item.lunch.cost}
                    </div>
                    <div className='weeklyMenu-content__table-item-col'>
                        {item.dinner.name}
                        <br />
                        {/* {item.dinner} */} Canh rong bien
                        <br />
                        {item.dinner.cost}
                    </div>
                </div>
            )
        })
    }
    const handleWeek = (day: number) => {
        const nextMondayWeek = addDays(firstDay, day);
        const nextFridayWeek = addDays(nextMondayWeek, 4);
        setFirstDay(nextMondayWeek);
        setLastDay(nextFridayWeek);
    }

    return (
        <div className='weeklyMenu'>
            <div className='carousel'>
                <div className='carousel-content'>
                    <h3>WEEKLY MEAL PLAN</h3>
                    <h1>{firstMondayFormat} <ArrowRightAltIcon style={{ fontSize: '40px' }} /> {lastFridayFormat}</h1>
                    <Link to={isLogin} className="carousel-content__button">
                        LET'S START
                    </Link>

                </div>
            </div>
            <div className='weeklyMenu-content container'>
                <div className='weeklyMenu-content-title'>
                    <h1>MENU</h1>
                    <p>Excepturi sint occaecati cupiditate non provident. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.</p>
                </div>
                <div className='weeklyMenu-content-time'>
                    <div className='weeklyMenu-content-time__left'>
                        <button disabled={new Date() > firstDay} className='btn btn-danger' onClick={() => handleWeek(-7)}>Last Week</button>
                        <span>{handleFormatDate(firstDay)}</span>
                        <ArrowRightAltIcon style={{ fontSize: '20px', fontWeight: 'bold' }} />
                        <span>{handleFormatDate(lastDay)}</span>
                        <button disabled={firstMonday < firstDay} className='btn btn-success' onClick={() => handleWeek(7)}>Next Week</button>
                    </div>
                    <div className='weeklyMenu-content-time__right'>
                        <button className='btn btn-danger'>Order Now</button>
                    </div>
                </div>
                <div className='weeklyMenu-content__table'>
                    <div className='weeklyMenu-content__table-header'>
                        <div className='weeklyMenu-content__table-header-col'>Date</div>
                        <div className='weeklyMenu-content__table-header-col'>Breakfast</div>
                        <div className='weeklyMenu-content__table-header-col'>Lunch</div>
                        <div className='weeklyMenu-content__table-header-col'>Dinner</div>
                    </div>
                    {renderMenu(daily)}
                </div>
            </div>
        </div>
    )
}
