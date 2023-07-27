import { Modal } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Food } from '../../../ClientTemplate/MenuPage/type'
import { Form, Input } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useAppDispatch } from '../../../redux/store/store'
import { addDish, updateDish } from '../../../redux/dishes/dishesSlice'

export default function DishModal(props: { modalOpen: boolean, modalClose: any, type: string, food: Food }) {
    const { modalOpen, modalClose, type, food } = props
    const [foodEdit, setFoodEdit] = useState<Food>({ _id: '', cost: 0, img: '', name: '', type: 'breakfast' });
    const dispatch = useAppDispatch();

    useEffect(() => {
        setFoodEdit(food)
    }, [food])
    const handleOnchange = (e: any) => {
        const { name, value } = e.target;
        setFoodEdit({ ...foodEdit, [name]: value})
    }

    const handleSubmit = (e : any) => {
        e.preventDefault()
        const imgpath = foodEdit.img.split('\\')
        const imgname = imgpath[imgpath.length - 1]
        
        if (type === 'edit') {
            const food = {_id:foodEdit._id, name:foodEdit.name , img:imgname , type:foodEdit.type, cost:foodEdit.cost}
            dispatch(updateDish(food))
        } else if (type === 'add') {
            const food = { name: foodEdit.name, img: imgname, type: foodEdit.type, cost: foodEdit.cost }
            dispatch(addDish(food))
        }

        window.location.replace('/')
    }

    return (
        <div>
            <Modal
                open={modalOpen}
                onClose={modalClose}
            >
                <div className='modal-body'>
                    <h3>{type === 'edit' ? 'Modal sửa món ăn' : 'Modal thêm món ăn'}</h3>
                    <hr />
                    <div>
                        <Form onSubmitCapture={(e) => handleSubmit(e)}>
                            <div>
                                <div className="form-group mt-md-4">
                                    <Form.Item initialValue={food.name} name="Tên món ăn" label="Tên món ăn" rules={[{ required: true }]}>
                                        <TextArea onChange={handleOnchange} defaultValue={food.name} style={{ width: '80%', height: '30px' }} name='name'
                                            placeholder='Tên món ăn' />
                                    </Form.Item>
                                </div>

                                <div className="form-group mt-md-4">
                                    <Form.Item name="Hình ảnh" label="Hình ảnh" rules={[{ required: true }]}>
                                        <input type='file' onChange={handleOnchange} style={{ width: '80%', height: '30px' }} name='img' placeholder='Hình ảnh' />
                                    </Form.Item>
                                </div>
                                <div className="form-group mt-md-4">
                                    <Form.Item name="Giá" initialValue={food.cost} label="Giá" rules={[{ required: true }]}>
                                        <TextArea onChange={handleOnchange} defaultValue={food.cost} style={{ width: '80%', height: '30px' }} name='cost' placeholder='Giá' />
                                    </Form.Item>
                                </div>
                                <div className="form-group mt-md-4">
                                    <Form.Item name="type" label='Loại'>
                                        <select
                                            style={{ width: '80%', height: '30px' }}
                                            placeholder='Loại'
                                            name='type'
                                            defaultValue={food.type}
                                            onChange={handleOnchange}
                                        >
                                            <option value="breakfast">breakfast</option>
                                            <option value="lunch">lunch</option>
                                            <option value="dinner">dinner</option>
                                        </select>
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="col-md-12" style={{ textAlign: "right" }}>
                                <button type='submit' className={type === 'edit' ? 'btn btn-primary' : "btn btn-success"}>{type === 'edit' ? 'Sửa' : 'Thêm'}</button>
                            </div>
                        </Form>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
