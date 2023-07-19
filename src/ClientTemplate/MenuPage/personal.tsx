import React, { useEffect, useState } from 'react'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import './style.scss'
import nextMonday from 'date-fns/nextMonday'
import lightFormat from 'date-fns/lightFormat'
import addDays from 'date-fns/addDays'
import { useAppSelector, useAppDispatch } from '../../redux/store/store';
import { getDishes } from '../../redux/dishes/dishesSlice';
import { Food, Menu, MenuOrder } from './type';
import ModalFood from './modalFood';
import { getMenu, postMenu } from '../../redux/menus/menuSlice';

export default function PersonalMenu() {

    const handleFormatDate = (date: Date) => {
        return lightFormat(date, 'dd-MM');
    }
    const firstMonday = nextMonday(new Date());
    const lastFriday = addDays(firstMonday, 4);
    const [firstDay, setFirstDay] = useState<Date>(firstMonday);
    const [lastDay, setLastDay] = useState<Date>(lastFriday);
    const dispatch = useAppDispatch();
    const [defaultMenu, setDefaultMenu] = useState<Menu[]>([
        { date: "T2", breakfast: { name: "...", cost: "", id: "", img: "", type: "1" }, lunch: { name: "...", cost: "", id: "", img: "", type: "2" }, dinner: { name: "...", cost: "", id: "", img: "", type: "3" } },
        { date: "T3", breakfast: { name: "...", cost: "", id: "", img: "", type: "1" }, lunch: { name: "...", cost: "", id: "", img: "", type: "2" }, dinner: { name: "...", cost: "", id: "", img: "", type: "3" } },
        { date: "T4", breakfast: { name: "...", cost: "", id: "", img: "", type: "1" }, lunch: { name: "...", cost: "", id: "", img: "", type: "2" }, dinner: { name: "...", cost: "", id: "", img: "", type: "3" } },
        { date: "T5", breakfast: { name: "...", cost: "", id: "", img: "", type: "1" }, lunch: { name: "...", cost: "", id: "", img: "", type: "2" }, dinner: { name: "...", cost: "", id: "", img: "", type: "3" } },
        { date: "T6", breakfast: { name: "...", cost: "", id: "", img: "", type: "1" }, lunch: { name: "...", cost: "", id: "", img: "", type: "2" }, dinner: { name: "...", cost: "", id: "", img: "", type: "3" } },
        ])
    const [nextPersonalDaily, setNextPersonalDaily] = useState<Menu[]>(defaultMenu)
    const [recentPersonalDaily, setRecentPersonalDaily1] = useState<Menu[]>(defaultMenu)

    const [chooseId, setChooseId] = useState<string>('');
    const [chooseType, setChooseType] = useState<string>('');
    const [open, setOpen] = useState(false);
    const [isDisable, setIsDisable] = useState(false);
    const handleClose = () => setOpen(false);
    const foods = useAppSelector((state) => state.foods.data) as Food[];
    const menuUser = useAppSelector((state) => state.menu.data) as MenuOrder[];
    const [nextTotal, setNextToTal] = useState<number>(0);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user") as any)

        dispatch(getDishes());
        dispatch(getMenu(user._id))

        setNextToTal(0)
    }, [])

    const handleFind = (isExist?: string) => {
        let count = 0;
        for (let index = 0; index < menuUser.length; index++) {
            if (!isExist && menuUser[index].timeStart === handleFormatDate(firstDay)) {
                count++;
            }
            if (isExist) {
                menuUser[index].timeStart === isExist && count++;
            }
        }
        return count
    }

    useEffect(() => {
        menuUser?.map((weekMenu: MenuOrder) => {
            if (weekMenu.timeStart === handleFormatDate(firstDay)) {
                setNextPersonalDaily(weekMenu.menu);
                setIsDisable(true)
            }
        })
    }, [menuUser.length])
    useEffect(() => {
        menuUser?.map((weekMenu: MenuOrder) => {
            if (weekMenu.timeStart === handleFormatDate(firstDay)) setNextPersonalDaily(weekMenu.menu)
            else if (weekMenu.timeStart !== handleFormatDate(firstDay)) {
                if (handleFormatDate(firstDay) >= handleFormatDate(firstMonday)) {
                    setNextPersonalDaily(defaultMenu)
                }
            }
        })
        handleFind() === 0 ? setIsDisable(false) : setIsDisable(true)
    }, [firstDay])
    const handleModalFood = (date: string, chooseType: string) => {
        !isDisable && setOpen(true)
        setChooseId(date)
        setChooseType(chooseType)
    }

    const chooseFood = (food: Food, chooseId: string, chooseType: string) => {
        setNextPersonalDaily(preState => {
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

    useEffect(() => {
        let count = 0;
        for (let index = 0; index < nextPersonalDaily.length; index++) {
            if (nextPersonalDaily[index].breakfast.name !== '...') count++;
            if (nextPersonalDaily[index].lunch.name !== '...') count++;
            if (nextPersonalDaily[index].dinner.name !== '...') count++;
        }
        for (let index = 0; index < recentPersonalDaily.length; index++) {
            if (recentPersonalDaily[index].breakfast.name !== '...') count++;
            if (recentPersonalDaily[index].lunch.name !== '...') count++;
            if (recentPersonalDaily[index].dinner.name !== '...') count++;
        }
        setNextToTal(40000 * count);
    }, [nextPersonalDaily, recentPersonalDaily])
    const handleSaveMenu = () => {
        const user = JSON.parse(localStorage.getItem("user") as any)
        const nextMenuOrder: MenuOrder = {
            menu: handleFormatDate(firstDay) === handleFormatDate(firstMonday) ? nextPersonalDaily : recentPersonalDaily,
            userId: user._id,
            timeStart: handleFormatDate(firstMonday)
        }
        const recentMenuOrder: MenuOrder = {
            menu: handleFormatDate(firstDay) !== handleFormatDate(firstMonday) ? nextPersonalDaily : recentPersonalDaily,
            userId: user._id,
            timeStart: handleFormatDate(firstDay) === handleFormatDate(firstMonday) ? handleFormatDate(addDays(firstDay, -7)) : handleFormatDate(firstDay)
        }

        const recentMonday = handleFormatDate(addDays(firstMonday, -7));
        // nextPersonalDaily.map((menu) => {
        //     if (menu.breakfast.name !== '...' || menu.lunch.name !== '...' || menu.dinner.name !== '...') {
        //         handleFind(recentMonday) === 0 && dispatch(postMenu(recentMenuOrder));
        //         dispatch(postMenu(nextMenuOrder))
        //     }
        // })
        if(handleFormatDate(firstMonday) === handleFormatDate(firstDay) && nextPersonalDaily !== defaultMenu){
            dispatch(postMenu(nextMenuOrder))
            if(recentPersonalDaily !== defaultMenu){
                handleFind(recentMonday) === 0 && dispatch(postMenu(recentMenuOrder))
            }
        }else if(handleFormatDate(firstDay) === recentMonday && nextPersonalDaily !== defaultMenu){
            handleFind(recentMonday) === 0 && dispatch(postMenu(recentMenuOrder))
            if(recentPersonalDaily !== defaultMenu){
                dispatch(postMenu(nextMenuOrder))
            }
        }
        localStorage.setItem('order', JSON.stringify({ total: nextTotal }))
        window.location.replace('/order')
    }
    const renderMenu = (dailyMenu: Menu[]) => {
        return menuUser && dailyMenu?.map((menu: Menu, index: number) => {
            return (
                <div className={`weeklyMenu-content__table-item ${handleFormatDate(addDays(firstDay, index)) <= handleFormatDate(new Date()) && 'overlay-outdate'}`}>
                    <div className='weeklyMenu-content__table-item-col'><span className='weeklyMenu-content__table-item-col__circle'>{menu.date} <br />{handleFormatDate(addDays(firstDay, index))}</span></div>
                    <div className='weeklyMenu-content__table-item-col' onClick={() => { handleModalFood(menu.date, '1') }}>
                        <span style={{ color: menu.breakfast.name !== '...' ? 'red' : 'white', fontWeight: 'bold' }}>{menu.breakfast.name}</span>
                        <br />
                        {menu.breakfast.name === '...' ? 'x' : 'Canh rong biển'}
                        <br />
                        {menu.breakfast.cost}
                    </div>
                    <div className='weeklyMenu-content__table-item-col' onClick={() => { handleModalFood(menu.date, '2') }}>
                        <span style={{ color: menu.lunch.name !== '...' ? 'red' : 'white', fontWeight: 'bold' }}>{menu.lunch.name}</span>
                        <br />
                        {menu.lunch.name === '...' ? 'x' : 'Canh rong biển'}
                        <br />
                        {menu.lunch.cost}
                    </div>
                    <div className='weeklyMenu-content__table-item-col' onClick={() => { handleModalFood(menu.date, '3') }}>
                        <span style={{ color: menu.dinner.name !== '...' ? 'red' : 'white', fontWeight: 'bold' }}>{menu.dinner.name}</span>
                        <br />
                        {menu.dinner.name === '...' ? 'x' : 'Canh rong biển'}
                        <br />
                        {menu.dinner.cost}
                    </div>
                </div>
            )
        })
    }

    const handleWeek = (day: number) => {
        const nextMondayWeek = addDays(firstDay, day);
        const nextFridayWeek = addDays(nextMondayWeek, 4);
        setLastDay(nextFridayWeek);
        setFirstDay(nextMondayWeek);
        if (handleFind() < 1) {
            if (day === 7) {
                setNextPersonalDaily(recentPersonalDaily);
                setRecentPersonalDaily1(nextPersonalDaily);
            } else if (day === -7) {
                setNextPersonalDaily(recentPersonalDaily);
                setRecentPersonalDaily1(nextPersonalDaily);
            }
        }
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
                        <button disabled={isDisable} onClick={handleSaveMenu} className='btn btn-danger'>Order Now</button>
                    </div>
                </div>
                <div className='weeklyMenu-content__table'>
                    <div className='weeklyMenu-content__table-header'>
                        <div className='weeklyMenu-content__table-header-col'>Date</div>
                        <div className='weeklyMenu-content__table-header-col'>Breakfast</div>
                        <div className='weeklyMenu-content__table-header-col'>Lunch</div>
                        <div className='weeklyMenu-content__table-header-col'>Dinner</div>
                    </div>
                    {renderMenu(nextPersonalDaily)}
                </div>
            </div>
            <ModalFood open={open} handleClose={handleClose} foods={foods} chooseFood={chooseFood} chooseId={chooseId} chooseType={chooseType} />
        </div>
    )
}
