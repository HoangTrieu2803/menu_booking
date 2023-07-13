import React, { ReactElement, useEffect, useState } from 'react'
import './style.scss';
import { Package } from './type';
import { Steps } from 'antd';
import { PieChartOutlined, DollarCircleOutlined, CheckCircleOutlined } from '@ant-design/icons'
import OrderPaidment from './OrderPaidment';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store/store';
import { getPackage } from '../../redux/package/packageSlice';


export default function OrderPage(): ReactElement {

  const [current, setCurrent] = useState(0);
  const [packageSelected, setPackageSelected] = useState<Package>({ name: '', img: '', cost: 0, type: '', _id:'' });
  const packageArr = useAppSelector((state) => state.package.data) as Package[];
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getPackage());
  }, [])
  const renderPackage = () => {
    return packageArr?.map((item: Package) => {
      return (
        <div className="order-content-item" onClick={() => { handleOnClick(item) }}>
          <img src={`./img/${item.img}`} alt="" />
          <div className="order-content-item-detail">
            <h3>{item.name}</h3>
            <p>{item.cost}đ</p>
          </div>
        </div>
      )
    })
  }

  const handleOnClick = (selected: Package) => {
    setPackageSelected(selected);
    setCurrent(current + 1);
  }
  const handleNextPage = (nextCurrent: number) => {
    setCurrent(current + nextCurrent)
  }

  const OrderPackage = () => {
    return (
      <div className="order-content">
        {renderPackage()}
      </div>
    )
  }

  const Finish = () => {
    return (
      <div className='order-finish'>
        <CheckCircleOutlined className='order-finish__icon' />
      </div>
    )
  }
  const order = [
    <OrderPackage />,
    <OrderPaidment packageSelected={packageSelected} nextCurrent={handleNextPage} />,
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
          <Steps.Step title='Package' icon={<PieChartOutlined />} onClick={() => { setPackageSelected({ name: '', img: '', cost: 0, type: '' , _id:''}) }} />
          <Steps.Step title='Paidment' icon={<DollarCircleOutlined />} disabled={packageSelected.name === ''} />
          <Steps.Step title='Finish' icon={<CheckCircleOutlined />} disabled={true} />
        </Steps>
        {order[current]}
      </div>

    </div>
  )
}

