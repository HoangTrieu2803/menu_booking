import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './style.scss'
export default function Login() {
    const [state, setState] = useState({
        taiKhoan: "",
        matKhau: "",
    });
    const handleOnChange = (e : any) => {
        const { name, value } = e.target;
        setState({
            ...state,
            [name]: value,
        });
    };

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
                                name="taiKhoan"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Mật Khẩu</label>
                            <input
                                type="password"
                                className="form-control"
                                id="exampleInputPassword1"
                                placeholder="Mật khẩu"
                                name="matKhau"
                                onChange={handleOnChange}
                            />
                        </div>
                        <button
                            type="submit"
                            className="login-content__button col-12"
                        >
                            Đăng nhập
                        </button>
                    </form>
                    <div className="text-center pt-2">
                        <Link to={"/signup"}>Bạn chưa có tài khoản?</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
