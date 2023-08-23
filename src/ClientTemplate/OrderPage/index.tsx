import React, { ReactElement, useEffect, useState } from 'react'
import './style.scss';
import { Steps } from 'antd';
import { DollarCircleOutlined, CheckCircleOutlined } from '@ant-design/icons'
import OrderPaidment from './OrderPaidment';
import { useAppDispatch } from '../../redux/store/store';
import { getPackage } from '../../redux/package/packageSlice';


export default function OrderPage(): ReactElement {
  
  const [current, setCurrent] = useState(0);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getPackage());
  }, [])

  const handleNextPage = (nextCurrent: number) => {
    setCurrent(current + nextCurrent)
  }

  const Finish = () => {
    return (
      <div className='order-finish'>
        <CheckCircleOutlined className='order-finish__icon' />
      </div>
    )
  }
  const order = [
    <OrderPaidment nextCurrent={handleNextPage} />,
    <Finish />
  ]

  return (
    <div className='order'>

      <div className="order-title">
        <h3>WEEKLY PACKAGES</h3>
        <h1>GOOD CHOICES</h1>
        <span className='order-title__img'><img src="./img/flower-decor.png" alt="" /></span>
      </div>

      <div className='order-step'>
        <Steps className='order-step__line' onChange={setCurrent} current={current} >
          <Steps.Step title='Paidment' icon={<DollarCircleOutlined />} />
          <Steps.Step title='Finish' icon={<CheckCircleOutlined />} disabled={true} />
        </Steps>
        {order[current]}
      </div>

    </div>
  )
}

