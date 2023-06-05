import { RadioGroup, FormControlLabel, Radio} from '@mui/material'
import { Form } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React, { useState } from 'react'
import { Order, Package } from '../type'

export default function OrderPaidment(props: { packageSelected: Package, nextCurrent: any }) {

    const { packageSelected, nextCurrent } = props;

    const currentDate = new Date();

    const [orderValue, setOrderValue] = useState<Order>({
        timeDelivery: '10:00 - 11:00',
        payMethod: 'COD',
        alleryNote: '',
        addressNote: '',
        duration: 'week',
        timeStart: currentDate,
        package: packageSelected
    })
    const totalCost = orderValue.duration === 'month' && packageSelected ? packageSelected?.cost * 4 : packageSelected?.cost;

    const handleOnChange = (e: any) => {
        const { name, value } = e.target;
        setOrderValue({ ...orderValue, [name]: value })
    }

    const handleSubmitOrderValue = (e: any) => {
        e.preventDefault();
        if( orderValue.addressNote && orderValue.alleryNote !== ''){
            nextCurrent(1);
            console.log(orderValue)
        }
    }

    return (
        <div className='order-paidment'>
            <div className="container">
                <Form onSubmitCapture={(e) => handleSubmitOrderValue(e)}>
                    <div className="row">
                        <div className='col-md-6 order-paidment__img'>
                            <img src={`./img/${packageSelected?.img}`} alt="" />
                        </div>
                        <div className="col-md-6">
                            <div className='form-group mt-md-4'>
                                <div className="order-detail-content">
                                    <h5>{packageSelected?.name} - {orderValue.duration === 'week' ? 'Gói 5 ngày' : 'Gói 20 ngày'} - {totalCost}đ</h5>
                                    <ul>
                                        <li>
                                            {packageSelected?.type === '0' ? 'Gói 3 bữa SÁNG - TRƯA - TỐI' : packageSelected?.type === '1' ? 'Gói 2 bữa SÁNG - TRƯA' : packageSelected?.type === '2' ? 'Gói 2 bữa SÁNG - TỐI' : 'Gói 2 bữa TRƯA - TỐI'}
                                        </li>
                                        <li>Giao {packageSelected?.type === "0" ? 3 : 2} phần ăn tận nơi mỗi ngày, từ thứ 2 đến thứ 6.</li>
                                        <li>Thích hợp cho dân văn phòng bận rộn, tiết kiệm thời gian</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="form-group mt-md-4">
                                <Form.Item name="Thời gian giao hàng" label='Thời gian giao hàng'>
                                    <select
                                    className='oder-paidment__select'
                                        onChange={handleOnChange}
                                        defaultValue={orderValue.timeDelivery}
                                        placeholder='Thời gian giao hàng'
                                        name='timeDelivery'
                                    >
                                        <option value="10:00 - 11:00">10:00 - 11:00</option>
                                        <option value="11:00 - 12:00">11:00 - 12:00</option>
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
                                        <option value="BANK TCB">Thanh toán bằng BANK TCB</option>
                                        <option value="BANK VCB">Thanh toán bằng BANK VCB</option>
                                    </select>
                                </Form.Item>
                            </div>
                            <div className='form-group mt-md-4'>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue={orderValue.duration}
                                    name="radio-buttons-group"
                                >
                                    <FormControlLabel value="week" control={<Radio name='duration' onChange={handleOnChange} />} label="Gói tuần - 5 ngày" />
                                    <FormControlLabel value="month" control={<Radio name='duration' onChange={handleOnChange} />} label="Gói tháng - 20 ngày" />
                                </RadioGroup>
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
