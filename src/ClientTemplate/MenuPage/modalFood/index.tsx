import { Modal } from '@mui/material'
import React, { useState } from 'react'
import { Food, Menu } from '../type';


export default function ModalFood(props: { open: boolean, handleClose: any, foods: Food[], chooseFood: any, chooseId: string, chooseType: string, handleUnchoose:any}) {
    const { open, handleClose, foods, chooseFood, chooseId, chooseType,handleUnchoose } = props
    const [currentPage, setCurrentPage] = useState(1);
    const foodsPerPage = 3;
    const indexOfLastPage = currentPage * foodsPerPage;
    const indexOfFirstPage = indexOfLastPage - foodsPerPage;
    const handleClickPreviousPage = () => {
        setCurrentPage(currentPage - 1)
    }
    const handleClickNextPage = () => {
        setCurrentPage(currentPage + 1)
    }
    const foodPerPage = foods.slice(indexOfFirstPage, indexOfLastPage)

    const renderFoods = () => {
        return foodPerPage?.map((item: Food, index:number) => {
            return (
                <div className='row modal-body__item justify-content-center' onClick={()=>chooseFood(item, chooseId, chooseType)}>
                     <div className='col-4'>
                        <img src={`../img/${item.img}`} alt="" />
                    </div>
                    <div className='col-8'>
                        {item.name}
                    </div>
                </div>
            )
        })
    }
    const renderTitle = () => {
        if (chooseType === '1') return <h2>Breakfast</h2>
        else if (chooseType === '2') return <h2>Lunch</h2>
        else return <h2>Dinner</h2>
    }
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <div className='modal-body'>
                    {renderTitle()}
                    <hr />
                    {renderFoods()}
                    <button onClick={()=>{
                        const food = {name:'...', img:'' , cost:'' , type:chooseType}
                        handleUnchoose(food, chooseType, chooseId)
                    }} className='btn btn-danger'>Bỏ chọn</button>

                    <div className='delete-modal'>
                        <button className="btn btn-danger" disabled={currentPage === 1} onClick={handleClickPreviousPage}>Previous</button>
                        <span>{currentPage}</span>
                        <button className="btn btn-success" disabled={currentPage === Math.floor(foods.length / 3)} onClick={handleClickNextPage}>Next</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
