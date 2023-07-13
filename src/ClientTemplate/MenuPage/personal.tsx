import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import './style.scss'
import nextMonday from 'date-fns/nextMonday'
import lightFormat from 'date-fns/lightFormat'
import addDays from 'date-fns/addDays'
import { useAppSelector, useAppDispatch } from '../../redux/store/store';
import { getDishes } from '../../redux/dishes/dishesSlice';
import { Food, Menu, MenuOrder } from './type';
import ModalFood from './modalFood';
import { getMenu } from '../../redux/menus/menuSlice';

export default function PersonalMenu() {

    const handleFormatDate = (date: Date) => {
        return lightFormat(date, 'dd-MM');
    }
    const firstMonday = nextMonday(new Date());
    const lastFriday = addDays(firstMonday, 4);
    const firstMondayFormat = handleFormatDate(firstMonday);
    const [firstDay, setFirstDay] = useState<Date>(firstMonday);
    const [lastDay, setLastDay] = useState<Date>(lastFriday);
    const dispatch = useAppDispatch();
    const personalMenuRecent = JSON.parse(localStorage.getItem('personal1') as any) as Menu[];
    const personalMenuLast = JSON.parse(localStorage.getItem('personal2') as any) as Menu[];
    const [personalDaily, setPersonalDaily] = useState<Menu[]>([
        { date: "T2", breakfast: { name: "...", cost: "", id: "", img: "", type: "1" }, lunch: { name: "...", cost: "", id: "", img: "", type: "2" }, dinner: { name: "...", cost: "", id: "", img: "", type: "3" }},
        { date: "T3", breakfast: { name: "...", cost: "", id: "", img: "", type: "1" }, lunch: { name: "...", cost: "", id: "", img: "", type: "2" }, dinner: { name: "...", cost: "", id: "", img: "", type: "3" }},
        { date: "T4", breakfast: { name: "...", cost: "", id: "", img: "", type: "1" }, lunch: { name: "...", cost: "", id: "", img: "", type: "2" }, dinner: { name: "...", cost: "", id: "", img: "", type: "3" }},
        { date: "T5", breakfast: { name: "...", cost: "", id: "", img: "", type: "1" }, lunch: { name: "...", cost: "", id: "", img: "", type: "2" }, dinner: { name: "...", cost: "", id: "", img: "", type: "3" }},
        { date: "T6", breakfast: { name: "...", cost: "", id: "", img: "", type: "1" }, lunch: { name: "...", cost: "", id: "", img: "", type: "2" }, dinner: { name: "...", cost: "", id: "", img: "", type: "3" }},
    ])
    const [chooseId, setChooseId] = useState<string>('');
    const [chooseType, setChooseType] = useState<string>('');
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const foods = useAppSelector((state) => state.foods.data) as Food[];
    const menu = useAppSelector((state)=> state.menu.data) as any;
    useEffect(() => {
        dispatch(getDishes());
        dispatch(getMenu('1'))
    }, [])
    console.log(menu)
    useEffect(() => {
        const firstDayFormat = (handleFormatDate(firstDay))
        if (firstMondayFormat === firstDayFormat) {
            setPersonalDaily(personalMenuRecent)
        }
        else setPersonalDaily(personalMenuLast)
    }, [firstDay])
    const randomFood = () => {
        return foods[Math.floor(Math.random() * foods.length)]
    }
    const randomMenu = () => {
        return [
            { date: "T2", breakfast: randomFood(), lunch: randomFood(), dinner: randomFood()},
            { date: "T3", breakfast: randomFood(), lunch: randomFood(), dinner: randomFood()},
            { date: "T4", breakfast: randomFood(), lunch: randomFood(), dinner: randomFood()},
            { date: "T5", breakfast: randomFood(), lunch: randomFood(), dinner: randomFood()},
            { date: "T6", breakfast: randomFood(), lunch: randomFood(), dinner: randomFood()},
        ]
    }

    const chooseFood = (food: Food, chooseId: string, chooseType: string) => {
        setPersonalDaily(preState => {
            const newState = preState.map((item) => {
                if (item.date === chooseId) {
                    if (chooseType === '2') {
                        return { ...item, lunch: food }
                    } else if (chooseType === '1') {
                        return { ...item, breakfast: food }
                    } else {
                        return { ...item, dinner: food }
                    }
                }
                return item;
            })
            return newState;
        })
        handleClose();
    }
    console.log(chooseId)
    const handleSaveMenu = () =>{
        const user = JSON.parse(localStorage.getItem("user") as any)
        const menuOrder : MenuOrder = {
            menu : personalDaily,
            userId: user._id,
            timeStart : firstDay
        }
        localStorage.setItem('personal1', JSON.stringify(personalDaily))
        localStorage.setItem('personalMenu', JSON.stringify(menuOrder))
    }

    const renderMenu = (dailyMenu: Menu[]) => {
        return dailyMenu ? dailyMenu.map((item: any, index: number) => {
            return (
                <div className='weeklyMenu-content__table-item'>
                    <div className='weeklyMenu-content__table-item-col'><span>{item.date} <br />{handleFormatDate(addDays(firstDay, index))}</span></div>
                    <div className='weeklyMenu-content__table-item-col' onClick={() => {
                        if(handleFormatDate(firstDay)=== firstMondayFormat && personalMenuRecent === null) setOpen(true)
                        setChooseId(item.date)
                        setChooseType('1')
                    }}>
                        {item.breakfast.name}
                        <br />
                        {/* {item.breakfast} */} Canh rong bien
                        <br />
                        {item.breakfast.cost}
                    </div>
                    <div className='weeklyMenu-content__table-item-col' onClick={() => {
                        if(handleFormatDate(firstDay)=== firstMondayFormat && personalMenuRecent === null) setOpen(true)
                        setChooseId(item.date)
                        setChooseType('2')
                    }}>
                        {item.lunch.name}
                        <br />
                        {/* {item.lunch} */} Canh rong bien
                        <br />
                        {item.lunch.cost}
                    </div>
                    <div className='weeklyMenu-content__table-item-col' onClick={() => {
                        if(handleFormatDate(firstDay)=== firstMondayFormat && personalMenuRecent === null) setOpen(true)
                        setChooseId(item.date)
                        setChooseType('3')

                    }}>
                        {item.dinner.name}
                        <br />
                        {/* {item.dinner} */} Canh rong bien
                        <br />
                        {item.dinner.cost}
                    </div>
                </div>
            )
        }) :  (<div className='weeklyMenu-content__table__btnRandom'>
            <button className='btn btn-danger' onClick={() => {
            setPersonalDaily(randomMenu())
        }}>Random</button>
        </div>)
    }
    const handleWeek = (day: number) => {
        const nextMondayWeek = addDays(firstDay, day);
        const nextFridayWeek = addDays(nextMondayWeek, 4);
        setFirstDay(nextMondayWeek);
        setLastDay(nextFridayWeek);
    }
    return (
        <div className='weeklyMenu'>

            <div className='weeklyMenu-content container'>
                <div className='weeklyMenu-content-title'>
                    <h1>PERSONAL MENU</h1>
                    <p>Excepturi sint occaecati cupiditate non provident. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.</p>
                </div>
                <div className='weeklyMenu-content-time'>
                    <div className='weeklyMenu-content-time__left'>
                        <button disabled={new Date() > firstDay} className='btn btn-danger' onClick={() => handleWeek(-7)}>Last Week</button>
                        <span>{handleFormatDate(firstDay)}</span>
                        <ArrowRightAltIcon style={{ fontSize: '20px', fontWeight: 'bold' }} />
                        <span>{handleFormatDate(lastDay)}</span>
                        <button disabled={new Date() < firstDay} className='btn btn-success' onClick={() => handleWeek(7)}>Next Week</button>
                    </div>
                    <div className='weeklyMenu-content-time__right'>
                        <Link to={'/order'} onClick={handleSaveMenu}  className='btn btn-danger'>Order Now</Link>
                    </div>
                </div>
                <div className='weeklyMenu-content__table'>
                    <div className='weeklyMenu-content__table-header'>
                        <div className='weeklyMenu-content__table-header-col'>Date</div>
                        <div className='weeklyMenu-content__table-header-col'>Breakfast</div>
                        <div className='weeklyMenu-content__table-header-col'>Lunch</div>
                        <div className='weeklyMenu-content__table-header-col'>Dinner</div>
                    </div>
                    {renderMenu(personalDaily)}
                </div>
            </div>
            <ModalFood open={open} handleClose={handleClose} foods={foods} chooseFood={chooseFood} chooseId={chooseId} chooseType={chooseType} />
        </div>
    )
}
