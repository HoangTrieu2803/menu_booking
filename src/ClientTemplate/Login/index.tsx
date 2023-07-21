import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import './style.scss'
import { useAppDispatch, useAppSelector } from '../../redux/store/store';
import { loginUser } from '../../redux/login/loginSlice';
export default function Login() {
    useEffect(()=>{
        localStorage.getItem('user') && window.location.replace('/');
    },[])
    const [state, setState] = useState({
        email: "",
        password: "",
    });
    const handleOnChange = (e : any) => {
        const { name, value } = e.target;
        setState({
            ...state,
            [name]: value,
        });
    };

    const dispatch = useAppDispatch();

    const handleLogin = (e : any) =>{
        e.preventDefault();
        dispatch(loginUser(state)).then((result)=>{
            // eslint-disable-next-line no-restricted-globals
            if(result.payload) return location.replace("/")
        })
    }

    return (
        <div className="container-fluid backgroundBody pb-5 login" style={{ height: "100vh" }}>
            <div className="container-fluid col-4 mt-4 text-white login-content">
                <div className="login-content__form py-4 px-4">
                    <h1 className="text-center">
                        <p className="mb-2">Đăng Nhập</p>
                    </h1>
                    <form>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email</label>
                            <input
                                onChange={handleOnChange}
                                type="email"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                placeholder="Email"
                                name="email"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Mật Khẩu</label>
                            <input
                                type="password"
                                className="form-control"
                                id="exampleInputPassword1"
                                placeholder="Mật khẩu"
                                name="password"
                                onChange={handleOnChange}
                            />
                        </div>
                        <button
                            type="submit"
                            className="login-content__button col-12"
                            onClick={handleLogin}
                        >
                            Đăng nhập
                        </button>
                    </form>
                    <div className="text-center pt-2">
                        <Link className='nav-link' to={"/signup"}>Bạn chưa có tài khoản?</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
