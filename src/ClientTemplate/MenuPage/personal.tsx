import React, { useEffect, useState } from 'react'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import './style.scss'
import addDays from 'date-fns/addDays'
import { useAppSelector, useAppDispatch } from '../../redux/store/store';
import { getDishes } from '../../redux/dishes/dishesSlice';
import { Food, Menu, MenuOrder } from './type';
import ModalFood from './modalFood';
import { getMenu, postMenu, updateMenu } from '../../redux/menus/menuSlice';
import { Modal } from '@mui/material'

import { handleFormatDateStart, FIRST_MONDAY, RECENT_MONDAY, LAST_FRIDAY } from '../../Funtional';
import { getAllOrder } from '../../redux/order/orderSlice';
import { Order } from '../OrderPage/type';
import { Link, useNavigate } from 'react-router-dom';

export default function PersonalMenu() {

    const [firstDay, setFirstDay] = useState<Date>(FIRST_MONDAY);
    const [lastDay, setLastDay] = useState<Date>(LAST_FRIDAY);
    const dispatch = useAppDispatch();
    const [defaultMenu, setDefaultMenu] = useState<Menu[]>([
        { date: "T2", breakfast: { name: "...", cost: 0, _id: "", img: "", type: "1" }, lunch: { name: "...", cost: 0, _id: "", img: "", type: "2" }, dinner: { name: "...", cost: 0, _id: "", img: "", type: "3" } },
        { date: "T3", breakfast: { name: "...", cost: 0, _id: "", img: "", type: "1" }, lunch: { name: "...", cost: 0, _id: "", img: "", type: "2" }, dinner: { name: "...", cost: 0, _id: "", img: "", type: "3" } },
        { date: "T4", breakfast: { name: "...", cost: 0, _id: "", img: "", type: "1" }, lunch: { name: "...", cost: 0, _id: "", img: "", type: "2" }, dinner: { name: "...", cost: 0, _id: "", img: "", type: "3" } },
        { date: "T5", breakfast: { name: "...", cost: 0, _id: "", img: "", type: "1" }, lunch: { name: "...", cost: 0, _id: "", img: "", type: "2" }, dinner: { name: "...", cost: 0, _id: "", img: "", type: "3" } },
        { date: "T6", breakfast: { name: "...", cost: 0, _id: "", img: "", type: "1" }, lunch: { name: "...", cost: 0, _id: "", img: "", type: "2" }, dinner: { name: "...", cost: 0, _id: "", img: "", type: "3" } },
    ])
    const [nextPersonalDaily, setNextPersonalDaily] = useState<Menu[]>(defaultMenu)
    const [recentPersonalDaily, setRecentPersonalDaily1] = useState<Menu[]>(defaultMenu)

    const [chooseId, setChooseId] = useState<string>('');
    const [chooseType, setChooseType] = useState<string>('');
    const [open, setOpen] = useState(false);
    const [isDisable, setIsDisable] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [choiceDelete, setChoiceDelete] = useState<boolean>(false);
    const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
    const handleClose = () => { setOpen(false); setModalDeleteOpen(false); };
    const foods = useAppSelector((state) => state.foods.data) as Food[];
    const menuUser = useAppSelector((state) => state.menu.data) as MenuOrder[];
    const [nextTotal, setNextToTal] = useState<number>(0);
    const [menuDelele, setMenuDelele] = useState<any>();
    const orders = useAppSelector((state) => state.order.data) as Order[];
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user") as any)

        dispatch(getDishes());
        dispatch(getMenu(user._id))
        dispatch(getAllOrder())
        setNextToTal(0)
    }, [])
    useEffect(() => {
        setMenuDelele({
            ...menuDelele,
            menu: nextPersonalDaily
        })
    }, [nextPersonalDaily])

    const handleFind = (isExist?: string) => {
        let count = 0;
        if (Array.isArray(menuUser)) {
            for (let index = 0; index < menuUser.length; index++) {
                if (menuUser[index].timeStart === handleFormatDateStart(firstDay)) {
                    count++;
                }
                if (isExist) {
                    menuUser[index].timeStart === isExist && count++;
                }
            }
        }
        return count
    }
    const handleFindMenu = (date:string) =>{
        const user = JSON.parse(localStorage.getItem("user") as any)
            let count = 0;
            if (Array.isArray(orders)) {
                for (let index = 0; index < orders.length; index++) {
                    for(let j = 0; j < orders[index].menuOrder.length; j++){
                        if( orders[index].menuOrder[j].timeStart === date && orders[index].userId === user._id) count++;
                    }
                }
            }
            return count
        }
    const handleAction = () => {
        const user = JSON.parse(localStorage.getItem("user") as any)
        const nextMenuOrder: MenuOrder = {
            menu: handleFormatDateStart(firstDay) === handleFormatDateStart(FIRST_MONDAY) ? nextPersonalDaily : recentPersonalDaily,
            userId: user._id,
            timeStart: handleFormatDateStart(FIRST_MONDAY),
            timeOrder: handleFormatDateStart(new Date())
        }
        const recentMenuOrder: MenuOrder = {
            menu: handleFormatDateStart(firstDay) !== handleFormatDateStart(FIRST_MONDAY) ? nextPersonalDaily : recentPersonalDaily,
            userId: user._id,
            timeStart: handleFormatDateStart(firstDay) === handleFormatDateStart(FIRST_MONDAY) ? handleFormatDateStart(addDays(firstDay, -7)) : handleFormatDateStart(firstDay),
            timeOrder: handleFormatDateStart(new Date())
        }


        if (handleFormatDateStart(FIRST_MONDAY) === handleFormatDateStart(firstDay) && nextPersonalDaily !== defaultMenu) {
            if (handleFind(handleFormatDateStart(FIRST_MONDAY)) === 0) {
                dispatch(postMenu(nextMenuOrder))
            } else if (handleFind(handleFormatDateStart(FIRST_MONDAY)) > 0) {
                dispatch(updateMenu(menuDelele)) 
            }
            if (recentPersonalDaily !== defaultMenu) {
                if (handleFind(RECENT_MONDAY) === 0) {
                    dispatch(postMenu(recentMenuOrder))
                } else if (handleFind(RECENT_MONDAY) > 0) {
                    dispatch(updateMenu(menuDelele)) 
                }
            }
        } else if (handleFormatDateStart(firstDay) === RECENT_MONDAY && nextPersonalDaily !== defaultMenu) {
            if (handleFind(RECENT_MONDAY) === 0) {
                dispatch(postMenu(recentMenuOrder))
            } else {
                dispatch(updateMenu(menuDelele))
            }
            if (recentPersonalDaily !== defaultMenu) {
                if (handleFind(handleFormatDateStart(FIRST_MONDAY)) === 0) {
                    dispatch(postMenu(nextMenuOrder))
                }
            }
        }
        localStorage.setItem('order', JSON.stringify({ total: nextTotal }))
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user") as any)
        
        Array.isArray(orders) && orders?.map((order: Order) => {
            order.menuOrder.map((weekMenu: MenuOrder) => {
                if (weekMenu.timeStart === handleFormatDateStart(firstDay) && order.userId === user._id) {
                    setIsDelete(true);
                }
            })
        })
        Array.isArray(menuUser) && menuUser.map((weekMenu: MenuOrder) => {
            if (handleFind(handleFormatDateStart(FIRST_MONDAY)) > 0) {
                if (weekMenu.timeStart === handleFormatDateStart(FIRST_MONDAY)) {
                    setNextPersonalDaily(weekMenu.menu);
                    setMenuDelele(weekMenu)
                }
            } else {
                setNextPersonalDaily(defaultMenu)
            }
        })
    }, [orders.length, Array.isArray(menuUser) && menuUser.length])

    useEffect(() => {
        
        if(handleFindMenu(handleFormatDateStart(firstDay)) > 0){
            setIsDelete(true);
        }else{
            setIsDelete(false);
        }
        Array.isArray(menuUser) && menuUser?.map((weekMenu: MenuOrder) => {
            if (weekMenu.timeStart === handleFormatDateStart(firstDay)) { setNextPersonalDaily(weekMenu.menu); setMenuDelele(weekMenu) }
            else if (handleFind() < 1 && weekMenu.timeStart !== handleFormatDateStart(firstDay)) {
                if (handleFormatDateStart(FIRST_MONDAY) >= handleFormatDateStart(firstDay)) {
                    setNextPersonalDaily(defaultMenu)
                }
            }
        })
        handleFind() === 0 ? setIsDisable(false) : setIsDisable(true)
    }, [firstDay])
    const handleModalFood = (date: string, chooseType: string) => {
        !isDelete && setOpen(true)
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
    const handleOpenDeleteModal = (date: string, chooseType: string) => {
        setModalDeleteOpen(true)
        setChooseId(date)
        setChooseType(chooseType)
    }
    const handleDelele = () => {
        const deleteFood = { name: "...", cost: "", id: "", img: "", type: chooseType };
        setNextPersonalDaily(preState => {
            const newState = preState.map((item) => {
                if (item.date === chooseId) {
                    if (chooseType === '2') {
                        return { ...item, lunch: deleteFood }
                    } else if (chooseType === '1') {
                        return { ...item, breakfast: deleteFood }
                    } else {
                        return { ...item, dinner: deleteFood }
                    }
                }
                return item;
            })
            setMenuDelele({
                ...menuDelele,
                menu: newState
            })
            return preState;
        })
        setChoiceDelete(true);
        handleClose();
    }

    const handleOutdate = (index: number) => {
        let outdate = ''
        if (handleFormatDateStart(firstDay) === RECENT_MONDAY && handleFormatDateStart(addDays(addDays(FIRST_MONDAY, -7), index)) <= handleFormatDateStart(new Date())) {
            outdate = 'overlay-outdate'
        }
        return outdate;
    }

    const handleUnchoose = (food:Food, chooseType:string , chooseId: string) =>{
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
        if (choiceDelete) {
            dispatch(updateMenu(menuDelele))
            setChoiceDelete(false)
        }
        // window.location.replace('/personal-menu')
    }, [choiceDelete])
    useEffect(() => {
        let count = 0;
        
        if(handleFindMenu(handleFormatDateStart(FIRST_MONDAY))< 1 && handleFindMenu(RECENT_MONDAY) < 1){
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
        }else{
            for (let index = 0; index < nextPersonalDaily.length; index++) {
                if (nextPersonalDaily[index].breakfast.name !== '...') count++;
                if (nextPersonalDaily[index].lunch.name !== '...') count++;
                if (nextPersonalDaily[index].dinner.name !== '...') count++;
            }
        }
        setNextToTal(40000 * count);
    }, [nextPersonalDaily, recentPersonalDaily])


    const renderMenu = (dailyMenu: Menu[]) => {
        return menuUser && dailyMenu?.map((menu: Menu, index: number) => {
            return (
                <div className={`weeklyMenu-content__table-item ${handleOutdate(index)}`}>
                    <div className='weeklyMenu-content__table-item-col'><span className='weeklyMenu-content__table-item-col__circle'>{menu.date} <br />{handleFormatDateStart(addDays(firstDay, index))}</span></div>
                    <div className='weeklyMenu-content__table-item-col' onClick={() => { handleModalFood(menu.date, '1') }}>
                        <span style={{ color: menu.breakfast.name !== '...' ? 'red' : 'white', fontWeight: 'bold' }}>{menu.breakfast.name}</span>
                        <br />
                        {menu.breakfast.name === '...' ? 'x' : 'Canh rong biển'}
                        <br />
                        {menu.breakfast.cost === 0 ? '' : menu.breakfast.cost}
                        <br />
                        {menu.breakfast.name === '...' ? '' : <button className='btn btn-danger' style={{ display: `${isDelete ? '' : 'none'}` }} onClick={() => handleOpenDeleteModal(menu.date, '1')}>Hủy</button>}
                    </div>
                    <div className='weeklyMenu-content__table-item-col' onClick={() => { handleModalFood(menu.date, '2') }}>
                        <span style={{ color: menu.lunch.name !== '...' ? 'red' : 'white', fontWeight: 'bold' }}>{menu.lunch.name}</span>
                        <br />
                        {menu.lunch.name === '...' ? 'x' : 'Canh rong biển'}
                        <br />
                        {menu.lunch.cost === 0 ? '' : menu.lunch.cost}
                        <br />
                        {menu.lunch.name === '...' ? '' : <button className='btn btn-danger' style={{ display: `${isDelete ? '' : 'none'}` }} onClick={() => handleOpenDeleteModal(menu.date, '2')}>Hủy</button>}
                    </div>
                    <div className='weeklyMenu-content__table-item-col' onClick={() => { handleModalFood(menu.date, '3') }}>
                        <span style={{ color: menu.dinner.name !== '...' ? 'red' : 'white', fontWeight: 'bold' }}>{menu.dinner.name}</span>
                        <br />
                        {menu.dinner.name === '...' ? 'x' : 'Canh rong biển'}
                        <br />
                        {menu.dinner.cost === 0 ? '' : menu.dinner.cost}
                        <br />
                        {menu.dinner.name === '...' ? '' : <button className='btn btn-danger' style={{ display: `${isDelete ? '' : 'none'}` }} onClick={() => handleOpenDeleteModal(menu.date, '3')}>Hủy</button>}
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
        const user = JSON.parse(localStorage.getItem("user") as any)

        if (handleFind(handleFormatDateStart(FIRST_MONDAY)) < 1 && nextPersonalDaily !== defaultMenu) {
            if (day === -7) {
                const nextMenuOrder: MenuOrder = {
                    menu: nextPersonalDaily,
                    userId: user._id,
                    timeStart: handleFormatDateStart(FIRST_MONDAY),
                    timeOrder: handleFormatDateStart(new Date())
                }
                dispatch(postMenu(nextMenuOrder))
                window.location.replace('/personal-menu')
            }
        }
        else if (handleFind(RECENT_MONDAY) < 1 && nextPersonalDaily !== defaultMenu) {
            if (day === 7) {
                const nextMenuOrder: MenuOrder = {
                    menu: nextPersonalDaily,
                    userId: user._id,
                    timeStart: RECENT_MONDAY,
                    timeOrder: handleFormatDateStart(new Date())
                }
                dispatch(postMenu(nextMenuOrder))
                window.location.replace('/personal-menu')
            }
        }
        
        if(handleFind() > 0){
            if (day === 7) {
                setNextPersonalDaily(recentPersonalDaily);
                setRecentPersonalDaily1(nextPersonalDaily);
                dispatch(updateMenu(menuDelele))
            } else if (day === -7) {
                setNextPersonalDaily(recentPersonalDaily);
                setRecentPersonalDaily1(nextPersonalDaily);
                dispatch(updateMenu(menuDelele))
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
                        <span>{handleFormatDateStart(firstDay)}</span>
                        <ArrowRightAltIcon style={{ fontSize: '20px', fontWeight: 'bold' }} />
                        <span>{handleFormatDateStart(lastDay)}</span>
                        <button disabled={new Date() < firstDay} className='btn btn-success' onClick={() => handleWeek(7)}>Next Week</button>
                    </div>
                    <div className='weeklyMenu-content-time__right'>
                        <button onClick={handleAction} className='btn' disabled={isDelete}><Link to={isDelete || nextPersonalDaily === defaultMenu && recentPersonalDaily === defaultMenu ? '#' : '/order'} className='btn btn-danger'>Order Now</Link></button>
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
            <Modal
                open={modalDeleteOpen}
                onClose={handleClose}
            >
                <div className='modal-body'>
                    <h3>Bạn có chắc chắn xóa bữa ăn này không?</h3>
                    <div className='delete-modal'>
                        <button className="btn btn-danger" onClick={() => setModalDeleteOpen(false)} >No</button>
                        <button className="btn btn-success" onClick={()=>{
                            handleDelele()
                            window.location.replace('/personal-menu')                             
                        }}>Yes</button>
                    </div>
                </div>
            </Modal>
            <ModalFood open={open} handleClose={handleClose} foods={foods} chooseFood={chooseFood} chooseId={chooseId} chooseType={chooseType} handleUnchoose={handleUnchoose} />
        </div>
    )
}
