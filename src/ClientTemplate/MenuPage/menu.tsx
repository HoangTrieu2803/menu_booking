import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import './style.scss'
import nextMonday from 'date-fns/nextMonday'
import lightFormat from 'date-fns/lightFormat'
import addDays from 'date-fns/addDays'


export default function WeeklyMenu() {

    const handleFormatDate = (date : Date) =>{
        return lightFormat(date,'dd-MM');
    }
    const firstMonday = nextMonday(new Date());
    const lastFriday = addDays(firstMonday, 4);
    const firstMondayFormat = handleFormatDate(firstMonday);
    const lastFridayFormat = handleFormatDate(lastFriday);
    const [firstDay, setFirstDay] = useState<Date>(firstMonday);
    const [lastDay, setLastDay] = useState<Date>(lastFriday);

    const isLogin = localStorage.getItem('User') ? '/order' : '/login';

    const renderMenu = () => {
        let array = [0, 1, 2, 3, 4];
        return array.map((item) => {
            return (
                <div className='weeklyMenu-content__table-item'>
                    <div className='weeklyMenu-content__table-item-col'><span>T{item + 2} <br />{handleFormatDate(addDays(firstDay,item))}</span></div>
                    <div className='weeklyMenu-content__table-item-col'>
                        GÀ MẬT ONG + KHOAI NƯỚNG
                        <br />
                        CANH RONG BIỂN
                        <br />
                        40.000d
                    </div>
                    <div className='weeklyMenu-content__table-item-col'>
                        GÀ MẬT ONG + KHOAI NƯỚNG
                        <br />
                        CANH RONG BIỂN
                        <br />
                        40.000d
                    </div>
                    <div className='weeklyMenu-content__table-item-col'>
                        GÀ MẬT ONG + KHOAI NƯỚNG
                        <br />
                        CANH RONG BIỂN
                        <br />
                        40.000d
                    </div>
                </div>
            )
        })
    }
    const handleWeek = (day : number) =>{
        const nextMondayWeek = addDays(firstDay,day);
        const nextFridayWeek = addDays(nextMondayWeek,4);
        setFirstDay(nextMondayWeek);
        setLastDay(nextFridayWeek);
    }
    
    return (
        <div className='weeklyMenu'>
            <div className='carousel'>
                <div className='carousel-content'>
                    <h3>WEEKLY MEAL PLAN</h3>
                    <h1>{firstMondayFormat} <ArrowRightAltIcon /> {lastFridayFormat}</h1>
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
                        <button disabled={new Date() > firstDay} className='btn btn-danger' onClick={() => handleWeek(-7)}>pre</button>
                        <span>{handleFormatDate(firstDay)}</span>
                        <ArrowRightAltIcon style={{ fontSize: '70px', fontWeight: 'bold' }} />
                        <span>{handleFormatDate(lastDay)}</span>
                        <button disabled={firstMonday < firstDay} className='btn btn-success' onClick={()=>handleWeek(7)}>next</button>
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
                    {renderMenu()}
                </div>
            </div>
        </div>
    )
}
