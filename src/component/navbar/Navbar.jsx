import React from 'react'
import { Link } from 'react-router-dom';
import style from "./Navbar.module.css";

export default function Navbar(props) {
    console.log(props);
    return (
        <>
            <nav className={style.backg + " navbar navbar-expand-lg content-box overflow-auto sticky-top"} >
                <div className="container">
                    <Link className="navbar-brand fs-4 text-white" to="/">جنة النجاح</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse navbarSupportedContent" >
                        <ul className="navbar-nav me-auto">
                            {
                                // student .
                                (props.userPosition === '5'||props.userPosition === '4'||props.userPosition === '3' || props.userPosition==='tester') ? <>
                                    <li className="nav-item ">
                                        <Link className="nav-link border rounded me-2 text-white" to="/exams">طلب إمتحان</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link border rounded me-2 text-white" to="/profile">الصفحة الشخصية</Link>
                                    </li>
                                </> : null
                            }
                            {
                                // supervisor . 
                                (props.userPosition === '4'||props.userPosition === '3' || props.userPosition==='tester' ) ? <>
                                    <li className="nav-item">
                                        <Link className="nav-link border rounded  me-2 text-white" to="/report">التقارير</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link border rounded me-2 text-white" to="/exam_requests">طلبات الإمتحانات</Link>
                                    </li>
                                </> : null
                            }
                            {
                                // college admin .
                                (props.userPosition === '3' || props.userPosition==='tester') ? <>
                                    <li className="nav-item">
                                        <Link className="nav-link border rounded  me-2 text-white" to="/college_admin">الصفحة الرئيسية</Link>
                                    </li>
                                </> : null
                            }
                            {
                                //  admin .
                                (props.userPosition === '2' || props.userPosition==='tester') ? <>
                                    <li className="nav-item">
                                        <Link className="nav-link border rounded  me-2 text-white" to="/add_student">إضافة طالب</Link>
                                    </li>
                                </> : null
                            }
                            {
                                // doctor .
                                (props.userPosition === '1' || props.userPosition==='tester') ? <>
                                    <li className="nav-item">
                                        <Link className="nav-link border rounded  me-2 text-white" to="/moltaqa_status">إحصائية الملتقى</Link>
                                    </li>
                                </> : null
                            }
                        </ul>
                    </div>
                    <div className="collapse navbar-collapse navbarSupportedContent" >
                        <ul className="navbar-nav ms-auto">
                            {
                                props.user ? <>

                                    <li className="nav-item">
                                        <Link className="nav-link border rounded text-white" to="/change_password">تغيير كلمة السر</Link>
                                    </li>
                                    <li className="nav-item ms-3">
                                        <Link className="nav-link border rounded text-white" onClick={props.logout} to="/">تسجيل خروج</Link>
                                    </li>
                                </> : null
                            }
                            {
                                props.user == null ? <>
                                    <li className="nav-item">
                                        <Link className="nav-link border rounded text-white" to="/login">تسجيل دخول</Link>
                                    </li>
                                </> : null
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </>

    )
}
