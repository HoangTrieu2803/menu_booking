import React, { useState } from 'react'
import { postUser } from '../../redux/user/userSlice';
import { useAppDispatch } from '../../redux/store/store';

export default function SignUp() {
    const [state, setState] = useState({
        email: "",
        password: "",
        phoneNumber: 0,
        userName: ''
    });
    const [rePass, setRePass] = useState('');
    const handleOnChange = (e: any) => {
        const { name, value } = e.target;
        setState({
            ...state,
            [name]: value,
        });
    };
    const dispatch = useAppDispatch();
    const handleSignup = (e: any) => {
        e.preventDefault()
        if (rePass !== state.password) {
            alert("mật khẩu chưa trùng khớp")
        } else {
            dispatch(postUser(state)).then((result) => {   
                if (result.payload) return window.location.replace("/login")
                alert("dang ky thanh cong!")
            })
        }
    }
    return (
        <div className="container-fluid backgroundBody pb-5 login" style={{ height: "100vh" }}>
            <div className="container-fluid col-4 mt-4 text-white login-content">
                <div className="login-content__form py-4 px-4">
                    <h1 className="text-center">
                        <p className="mb-2">Đăng Ký</p>
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
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="userName">Tên người dùng</label>
                            <input
                                onChange={handleOnChange}
                                type="text"
                                className="form-control"
                                id="userName"
                                aria-describedby="emailHelp"
                                placeholder="Tên người dùng"
                                name="userName"
                                required
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
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Nhập lại mật khẩu</label>
                            <input
                                type="password"
                                className="form-control"
                                id="exampleInputPassword2"
                                placeholder="Nhập lại mật khẩu"
                                name="reMatKhau"
                                onChange={e => {
                                    setRePass(e.target.value)
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPhoneNumber">Nhập số điện thoại</label>
                            <input
                                type="number"
                                className="form-control"
                                id="exampleInputPhoneNumber"
                                placeholder="Nhập số điện thoại"
                                name="phoneNumber"
                                onChange={handleOnChange}
                            />
                        </div>
                        <button
                            type="submit"
                            className="login-content__button col-12"
                            onClick={handleSignup}
                        >
                            Đăng Ký
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

