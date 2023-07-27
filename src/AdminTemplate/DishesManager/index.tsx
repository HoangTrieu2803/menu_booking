import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/store/store';
import { Food } from '../../ClientTemplate/MenuPage/type';
import { deleteDish, getDishes } from '../../redux/dishes/dishesSlice';
import Pagination from '../_components/Pagination';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import './style.scss';
import { Modal } from '@mui/material';
import DishModal from './Modal';
import AddIcon from '@mui/icons-material/Add';
import { numberFormat } from '../../Funtional';

export default function DishesManager() {
    const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
    const handleClose = () => {setModalDeleteOpen(false);};
    const [openModal, setOpenModal] = useState(false);
    const handleCloseModal = () => {setOpenModal(false);};
    const foods = useAppSelector((state) => state.foods.data) as Food[];
    const [foodEdit, setFoodEdit] = useState<Food>({_id:'',cost:0,img:'',name:'',type:'breakfast'});
    const [chooseId , setChooseId] = useState<string>();
    const [actionType, setActionType] = useState<string>('')
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getDishes());
    }, [])
    const [currentPage, setCurrentPage] = useState(1);
    const foodsPerPage = 5;
    const indexOfLastPage = currentPage * foodsPerPage;
    const indexOfFirstPage = indexOfLastPage - foodsPerPage;
    const lastFoodPage = Math.ceil(foods.length / 5)
    const handleClickPreviousPage = () => {
        setCurrentPage(currentPage - 1)
    }
    const handleClickNextPage = () => {
        setCurrentPage(currentPage + 1)
    }
    const paginate = (indexPage: number) => {
        setCurrentPage(indexPage)
    }
    const foodPerPage = Array.isArray(foods)&& foods?.slice(indexOfFirstPage, indexOfLastPage)

    const handleDelete = () =>{
        dispatch(deleteDish(chooseId));
        window.location.replace('/');
    }
    
    // const findFood = () =>{
    //     const listId : any = []
    //     menus?.map((menu:MenuOrder)=>{
    //         menu.menu?.map((item:Menu)=>{
    //             foods?.map((food:Food)=>{
    //                 if(item.breakfast.name === food.name || item.dinner.name === food.name || item.lunch.name === food.name){
    //                     listId.push(food._id)
    //                 }
    //             })
    //         })
    //     })
    //     return listId
    // }

    // const handleNotDelete = (foodId: string | undefined) =>{
    //     let count =0;
    //     findFood().map((id:string)=>{
    //         foodId === id && count++;
    //     })
    //     return count        
    // }
    const handleAction = (type : string, foodEditChoose : Food) =>{
        setOpenModal(true);
        setActionType(type);
        if(type === 'edit'){
            setFoodEdit(foodEditChoose)
        }else if(type === 'add'){
            setFoodEdit({_id:'',cost:0,img:'',name:'',type:'breakfast'})
        }
    }

    const renderDish = () => {
        return Array.isArray(foodPerPage) && foodPerPage?.map((food: Food ) => {
            return (
                <tr>
                    <td>{food._id}</td>
                    <td>{food.name}</td>
                    <td><img src={`./img/${food.img}`} alt='img' /></td>
                    <td>{numberFormat(food.cost)}</td>
                    <td>{food.type}</td>
                    <td>
                        <button className='btn btn-danger'   onClick={()=>{setChooseId(food._id);setModalDeleteOpen(true)}}><DeleteForeverIcon/></button>
                        <button className='btn btn-primary'  onClick={()=>{handleAction('edit',food)}}><EditIcon/></button>
                    </td>
                </tr>
            )
        })
    }
    return (
        <div className='dish-container'>
            <div className='dish-container-content text-center'>
                <h1 className='m-5'>DISH MANAGER</h1>
                <button className='btn btn-success text-right' onClick={()=>{handleAction('add',foodEdit)}}><AddIcon/></button>
                <div className='dish-container-content__table container'>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Tên món ăn</th>
                                <th scope="col">Hình ảnh</th>
                                <th scope="col">Giá</th>
                                <th scope="col">Loại</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderDish()}
                        </tbody>
                    </table>
                    <ul className='paginationAdmin'>
                        <button className="btn btn-danger" disabled={currentPage === 1} onClick={handleClickPreviousPage}><ArrowBackIosIcon/></button>
                        <Pagination foodsPerPage={foodsPerPage} totalFood={foods?.length} paginate={paginate} currentPage={currentPage} />
                        <button className="btn btn-danger" disabled={currentPage === lastFoodPage} onClick={handleClickNextPage}><ArrowForwardIosIcon/></button>
                    </ul>
                </div>
            </div>
            <Modal
                open={modalDeleteOpen}
                onClose={handleClose}
            >
                <div className='modal-body'>
                    <h3>Bạn có chắc chắn xóa món ăn này không?</h3>
                    <div className='my-4' style={{display:'flex',justifyContent:'space-around'}}>
                    <button className="btn btn-danger" onClick={()=>setModalDeleteOpen(false)} >No</button>
                    <button className="btn btn-success" onClick={handleDelete}>Yes</button>
                    </div>
                </div>
            </Modal>
            <DishModal modalOpen={openModal} modalClose={handleCloseModal} type={actionType} food={foodEdit}  />
        </div>
    )
}
