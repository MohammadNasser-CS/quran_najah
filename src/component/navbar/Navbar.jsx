import React from 'react'
import { Link } from 'react-router-dom';
import style from "./Navbar.module.css";

export default function Navbar(props) {
    return (
        <>
            <nav className={style.backg + " navbar navbar-expand-lg content-box overflow-auto sticky-top"} >
                <div className="container">
                    <Link className="navbar-brand fs-4 text-white" to="/">Quran_Najah</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse navbarSupportedContent" >
                        {
                            props.user ? <>
                                <ul className="navbar-nav me-auto">
                                    <li className="nav-item">
                                        <Link className="nav-link  text-white" to="/home">Home</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link  text-white" to="/">Profile</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link  text-white" to="/">Achievements</Link>
                                    </li>
                                </ul>
                            </> : null
                        }

                    </div>
                    <div className="collapse navbar-collapse navbarSupportedContent" >
                        <ul className="navbar-nav ms-auto">
                            {
                                props.user ? <>
                                    <li className="nav-item">
                                        <Link className="nav-link  text-white" onClick={props.logout} to="/">Logout</Link>
                                    </li>
                                </> : null
                            }

                            {
                                props.user == null ? <>
                                    <li className="nav-item">
                                        <Link className="nav-link text-white" to="/login">Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link text-white" to="/">SignUp</Link>
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
