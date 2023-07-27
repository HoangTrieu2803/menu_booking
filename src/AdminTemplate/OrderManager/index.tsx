// import { DatePicker, Form } from 'antd'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/store/store';
import { Menu, MenuOrder } from '../../ClientTemplate/MenuPage/type';
import { lightFormat, nextMonday, addDays } from 'date-fns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import { getAllOrder } from '../../redux/order/orderSlice';
import { Order } from '../../ClientTemplate/OrderPage/type';

export default function OrderManager() {
    const orders = useAppSelector((state) => state.order.data) as Order[];
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getAllOrder())
    }, [])

    const handleFormatDate = (date: Date) => {
        return lightFormat(date, 'yyyy-MM-dd');
    }
    const handleFormatDateStart = (date: Date) => {
        return lightFormat(date, 'dd-MM');
    }
    const firstMonday = nextMonday(new Date());

    const recentMonday = handleFormatDate(addDays(firstMonday, -7));

    const [value, setValue] = React.useState<Dayjs | null>(dayjs(recentMonday));

    function numberFormat(number:number) {
        const decimals =  0;
        const thousandsSeparator = ',';

        const fixedNumber = number.toFixed(decimals);
        const parts = fixedNumber.toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);

        return parts.join(thousandsSeparator);
    }

    const dateStart = handleFormatDateStart(value?.toDate() as Date)
    
    const handleRenderMenu = () =>{
        return orders?.map((order : Order)=>{
            return order.menuOrder.map((menu : MenuOrder)=>{
                if(menu.timeStart === dateStart){
                    return(
                        <div className='py-5'>
                            <h3>Thực đơn: {menu.userId.email} - {numberFormat(order.cost)}đ</h3>
                            <p>Hình thức thanh toán: {order.payMethod}</p>
                            <p>Ngày bắt đầu thực đơn: {menu.timeStart}</p>
                            <p>Địa chỉ giao hàng chi tiết: {order.addressNote}</p>
                            <p>Thành phần dị ứng: {order.alleryNote}</p>
                            <p>Ngày đặt: {menu.timeOrder}</p>
                            <p>Số điện thoại: {menu.userId.phoneNumber}</p>
                            <h5>Thực đơn bao gồm:</h5>
                            <table className='table text-center'>
                                <tr>
                                    <th>Date</th>
                                    <th>Breakfast - time delivery: {order.breakfastDelivery}</th>
                                    <th>Lunch - time delivery: {order.lunchDelivery}</th>
                                    <th>Dinner - time delivery: {order.dinnerDelivery}</th>
                                </tr>
                                {menu.menu.map((item:Menu,index:number)=>{
                                    return(
                                        <tr>
                                            <td>{handleFormatDateStart(addDays(value?.toDate() as Date,index))}</td>
                                            <td style={{color:`${item.breakfast.name !== '...' ? 'red': 'black'}`,fontWeight:'bold'}}>{item.breakfast.name === "..." ? 'x': item.breakfast.name}</td>
                                            <td style={{color:`${item.lunch.name !== '...' ? 'red': 'black'}`,fontWeight:'bold'}}>{item.lunch.name === "..." ? 'x': item.lunch.name}</td>
                                            <td style={{color:`${item.dinner.name !== '...' ? 'red': 'black'}`,fontWeight:'bold'}}>{item.dinner.name === "..." ? 'x': item.dinner.name}</td>
                                        </tr>
                                    )
                                })}
                            </table>
                        </div>
                    )
                }
            })
        })
    }
    return (
        <div className='container'>
            <h1 className='m-5 text-center'>ORDER MANAGER</h1>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker label="Time Start Menu" defaultValue={value} onChange={(newValue) => setValue(newValue)} />
                </DemoContainer>
            </LocalizationProvider>

            <div>
                {handleRenderMenu()}
            </div>
        </div>
    )
}
