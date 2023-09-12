import axios from 'axios';
import Joi from 'joi';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import style from "./ChangePasswordPage.module.css";

export default function ChangePasswordPage(props) {
    console.log(props.user)
    let navigate = useNavigate();
    let [validList, setValidList] = useState([]);
    let [user, setUser] = useState({
        id: '',
        password: '',
    });
    let [tempUser, setTempUser] = useState({
        password: '',
        cPassword: '',
    });
    let [flag, setFlag] = useState(false);

    useEffect(() => {
        if (flag === !flag) {
            return;
        } else {
            //insertExamRequestRecord();
            // updateExamRequestsTable();
        }
        console.log('did update');
    }, [flag])
    async function submitHandling(Event) {
        Event.preventDefault();
        let validatationResult = inputValidation(tempUser);
        if (validatationResult.error) {
            // Error Detected  
            setValidList(validatationResult.error.details);
            flag = !flag;
        }
        else {
            // show to uesr // 
            user["id"]=props.user;
            user["password"]=tempUser["password"];
            console.log(user)
            let { data } = await axios.put('http://localhost/multaqa/api/change_password.php',user);
            console.log(data.change_password);
            if (data.change_password.message === 'success') {
                if (props.userPosition === '5') {
                    navigate('/profile');
                } else if (props.userPosition === '4') {
                    navigate('/report');
                } else if (props.userPosition === '3') {
                    navigate('/college_admin');
                } else if (props.userPosition === '2') {
                    navigate('/add_student');
                } else if (props.userPosition === '1') {
                    navigate('/moltaqa_status');
                }
            }
        }
    }
    function inputValidation(user) {
        let schema = Joi.object({
            password: Joi.string().required().pattern(new RegExp('^[A-za-z0-9]')).messages({
                "string.pattern.base": "المدخلات غير صحيحة ، يجب أن يكون على الأقل 8 خانات",
                'string.empty': 'هذه الخانة إجبارية'
            }),
            cPassword: Joi.any().valid(Joi.ref("password")).required(),
        })
        return schema.validate(user, { abortEarly: false });
    }
    function getUserData(Event) {
        let userTemp = tempUser;
        userTemp[Event.target.name] = Event.target.value;
        console.log(userTemp);
        setTempUser(userTemp);
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
                                            <p className="text-white-50 mb-5 mt-5">الرجاء إدخال كلمة المرور الجديدة</p>
                                            <div className="form-outline form-white mb-4">
                                                <input onChange={getUserData} name='password' type="password" id="typeEmailX" className="form-control form-control-lg" />
                                                <label className="form-label" htmlFor="typeEmailX">كلمة المرور</label>
                                            </div>
                                            <div className="form-outline form-white mb-4">
                                                <input onChange={getUserData} name='cPassword' type="password" id="typePasswordX" className="form-control form-control-lg" />
                                                <label className="form-label" htmlFor="typePasswordX">تأكيد كلمة المرور</label>
                                            </div>
                                            <button className="btn btn-outline-light btn-lg px-5" type="submit">تعديل كلمة المرور</button>
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
