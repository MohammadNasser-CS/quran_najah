import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import style from "./Login.module.css";

export default function Login(props) {
    console.log(props)
    let navigate = useNavigate();
    let [validList, setValidList] = useState([]);
    let [users, setUsers] = useState({
        User_no: '',
        password: '',
    });
    async function submitHandling(Event) {
        Event.preventDefault();
        let validatationResult = inputValidation(users);
        if (validatationResult.error) {
            // Error Detected  
            setValidList(validatationResult.error.details);
        }
        else {
            //show to uesr // 
            let { data } = await axios.post('http://localhost/multaqa/api/login.php',users);
            console.log(data.login);
            if (data.login.message === 'success') {
                localStorage.setItem('userToken', data.login.User_id);
                localStorage.setItem('userPosition', data.login.type);
                props.getUserData();
                props.getUserPosition();
                if (data.login.type === '5') {
                    navigate('/profile');
                } else if (data.login.type === '4') {
                    navigate('/report');
                } else if (data.login.type === '3') {
                    navigate('/college_admin');
                } else if (data.login.type === '2') {
                    navigate('/add_student');
                } else if (data.login.type === '1') {
                    navigate('/moltaqa_status');
                }
            }
        }
    }
    function inputValidation(user) {
        let schema = Joi.object({
            User_no: Joi.string().pattern(new RegExp('[0-9]{4,8}')).message({
                "string.pattern.base": "inputs is not valid , must be 0-9",
                'string.empty': 'password is required , pleaz enter it'
            }),
            password: Joi.string().pattern(new RegExp('[0-9]{4,8}')).messages({
                "string.pattern.base": "inputs is not valid , must be a-z or A-z or 0-9",
                'string.empty': 'password is required , pleaz enter it'
            }),
        })
        return schema.validate(user, { abortEarly: false });
    }
    function getUserData(Event) {
        let userTemp = users;
        userTemp[Event.target.name] = Event.target.value;
        console.log(userTemp);
        setUsers(userTemp);
    }
    return (
        <>
            <section className={style.backimg + " fixed overflow-auto"}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className={style.backg + " card  text-white"} style={{ borderRadius: '4rem' }}>
                                <div className="card-body p-5 text-center">
                                    <div className="mb-md-5 mt-md-4">
                                        {
                                            validList.map((error, index) => <div className='alert alert-danger'>{error.message}</div>)
                                        }
                                        <img src={require('./img/logo1.jpg')} className="w-25" alt='' />
                                        <form onSubmit={submitHandling}>
                                            <p className="text-white-50 mb-5 mt-5">Please enter your email and password!</p>
                                            <div className="form-outline form-white mb-4">
                                                <input onChange={getUserData} name='User_no' type="text" id="typeEmailX" className="form-control form-control-lg" />
                                                <label className="form-label" htmlFor="typeEmailX">Email</label>
                                            </div>
                                            <div className="form-outline form-white mb-4">
                                                <input onChange={getUserData} name='password' type="password" id="typePasswordX" className="form-control form-control-lg" />
                                                <label className="form-label" htmlFor="typePasswordX">Password</label>
                                            </div>
                                            <p className="small mb-3 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>
                                            <button className="btn btn-outline-light btn-lg px-5" type="submit">Login</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
