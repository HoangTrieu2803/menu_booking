import { Form } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React, { useEffect, useState } from 'react'
import { Order, Package } from '../type'
import { useAppDispatch, useAppSelector } from '../../../redux/store/store'
import { postOrder } from '../../../redux/order/orderSlice'
import { getMenu } from '../../../redux/menus/menuSlice'
import { MenuOrder } from '../../MenuPage/type'
import { lightFormat } from 'date-fns'
import Paypal from './Paypal'

export default function OrderPaidment(props: { nextCurrent: any }) {
   
    const {nextCurrent } = props;
    const dispatch = useAppDispatch();
    const user = JSON.parse(localStorage.getItem('user') as any)
    const currentDate = new Date();
    const detail = JSON.parse(localStorage.getItem('order') as any);
    const menuUser = useAppSelector((state) => state.menu.data) as MenuOrder[];
    const [checkOut,setCheckOut] = useState(false);
    const [isPaid, setIsPaid] = useState('');

    useEffect(()=>{
        dispatch(getMenu(user._id));
    },[])
    const handleTest = (test:string) =>{
        setIsPaid(test)
    }
    
    const [orderValue, setOrderValue] = useState<Order>({
        breakfastDelivery: '7:00 - 7:30',
        lunchDelivery: '11:00 - 11:30',
        dinnerDelivery: '17:00 - 17:30',
        payMethod: 'COD',
        alleryNote: '',
        addressNote: '',
        timeStart: currentDate,
        menuOrder:[] ,
        cost: detail.total,
        userId: user._id
    })

    const handleOnChange = (e: any) => {
        const { name, value } = e.target;
        const arr : any =[]
        const handleFormatDate = (date: Date) => {
            return lightFormat(date, 'dd-MM');
        }
        menuUser?.map((menu: MenuOrder)=>{
            if(menu.timeOrder === handleFormatDate(currentDate)) arr.push(menu._id);
        })
        setOrderValue({ ...orderValue, [name]: value,menuOrder:arr })
    }
    useEffect(()=>{
        orderValue.payMethod === 'PAYPAL' ? setCheckOut(true) : setCheckOut(false)
    },[orderValue.payMethod])

    function numberFormat(number:number) {
        const decimals =  0;
        const thousandsSeparator = ',';

        const fixedNumber = number.toFixed(decimals);
        const parts = fixedNumber.toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);

        return parts.join(thousandsSeparator);
    }
    const handleSubmitOrderValue = (e: any) => {
        e.preventDefault();
        if(orderValue.payMethod === 'COD' && orderValue.addressNote !== '' && orderValue.alleryNote !== ''){
            localStorage.removeItem('order');
            dispatch(postOrder(orderValue));
            nextCurrent(1)
        }
    }
    useEffect(()=>{
        if(isPaid === 'success'&& orderValue.addressNote && orderValue.alleryNote !== '' ){
            localStorage.removeItem('order');
            dispatch(postOrder(orderValue));
            nextCurrent(1)
        }
    },[isPaid])
    return (
        <div className='order-paidment'>
            <div className="container">
                <Form onSubmitCapture={(e) => handleSubmitOrderValue(e)}>
                    <div className="row">
                        <div className='col-md-6 order-paidment__img'>
                            <img src={`./img/goi4.jpg`} alt="" />
                        </div>
                        <div className="col-md-6">
                            <div className='form-group mt-md-4'>
                                <div className="order-detail-content">
                                    <h5>Tổng giá trị thực đơn - {numberFormat(detail.total)}đ</h5>
                                </div>
                            </div>
                            <div className="form-group mt-md-4">
                                <Form.Item name="Thời gian giao hàng buổi sáng" label='Thời gian giao hàng buổi sáng'>
                                    <select
                                    className='oder-paidment__select'
                                        onChange={handleOnChange}
                                        defaultValue={orderValue.breakfastDelivery}
                                        placeholder='Thời gian giao hàng'
                                        name='breakfastDelivery'
                                    >
                                        <option value="7:00 - 7:30">7:00 - 7:30</option>
                                        <option value="7:30 - 8:00">7:30 - 8:00</option>
                                    </select>
                                </Form.Item>
                            </div>
                            <div className="form-group mt-md-4">
                                <Form.Item name="Thời gian giao hàng buổi trưa" label='Thời gian giao hàng buổi trưa'>
                                    <select
                                    className='oder-paidment__select'
                                        onChange={handleOnChange}
                                        defaultValue={orderValue.lunchDelivery}
                                        placeholder='Thời gian giao hàng'
                                        name='lunchDelivery'
                                    >
                                        <option value="11:00 - 11:30">11:00 - 11:30</option>
                                        <option value="11:30 - 12:00">11:30 - 12:00</option>
                                    </select>
                                </Form.Item>
                            </div>
                            <div className="form-group mt-md-4">
                                <Form.Item name="Thời gian giao hàng buổi chiều" label='Thời gian giao hàng buổi chiều'>
                                    <select
                                    className='oder-paidment__select'
                                        onChange={handleOnChange}
                                        defaultValue={orderValue.dinnerDelivery}
                                        placeholder='Thời gian giao hàng'
                                        name='dinnerDelivery'
                                    >
                                        <option value="17:00 - 17:30">17:00 - 17:30</option>
                                        <option value="17:30 - 18:00">17:30 - 18:00</option>
                                    </select>
                                </Form.Item>
                            </div>
                            <div className="form-group mt-md-4">
                                <Form.Item name="Phương thức thanh toán" label='Phương thức thanh toán'>
                                    <select
                                    className='oder-paidment__select'
                                        value={'Phương thức thanh toán'}
                                        defaultValue={orderValue.payMethod}
                                        onChange={handleOnChange}
                                        name='payMethod'
                                    >
                                        <option value="COD">Thanh toán tiền mặt</option>
                                        <option value="Zalo">Thanh toán bằng Zalo</option>
                                        <option value="MOMO">Thanh toán bằng MOMO</option>
                                        <option value="PAYMENT">Thanh toán bằng PAYMENT</option>
                                        <option value="PAYPAL">Thanh toán bằng PAYPAL</option>
                                    </select>
                                </Form.Item>
                            </div>
                            <div className="form-group mt-md-4">
                            {checkOut&& (<Paypal handleTest={handleTest} />)}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="form-group mt-md-4">
                            <Form.Item initialValue={orderValue.alleryNote} name="Allery Note" label="Note" rules={[{ required: true }]}>
                                <TextArea name='alleryNote' onChange={handleOnChange}
                                    placeholder='Ghi chú về các thành phần bị dị ứng' />
                            </Form.Item>
                        </div>
                        <div className="form-group mt-md-4">
                            <Form.Item initialValue={orderValue.addressNote} name="Address Note" label="Note" rules={[{ required: true }]}>
                                <TextArea name='addressNote' onChange={handleOnChange} placeholder='Ghi chú về địa chỉ giao hàng (block chung cư, tên tòa nhà văn phòng...)' />
                            </Form.Item>
                        </div>
                    </div>
                    <div className="col-md-12" style={{ textAlign: "right" }}>
                        <button type='submit' className="btn btn-danger">Hoàn thành</button>
                    </div>
                </Form>
            </div>
        </div>
    )
}
