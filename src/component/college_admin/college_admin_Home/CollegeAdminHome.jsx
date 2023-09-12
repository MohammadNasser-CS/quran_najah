import React from 'react'
import style from "./CollegeAdminHome.module.css"
import { useNavigate } from 'react-router-dom';
export default function CollegeAdminHome() {
    let navigate = useNavigate();

    function supervisorUpgrade() {
        navigate('/supervisor_upgrade');
    }
    function reportsShow() {
        navigate('/reports_page_show');
    }
    function changeStudentSupervisor() {
        navigate('/change_student_supervisor');
    }
    function collegeChange() {
        navigate('/upate_college_page');
    }
    return (
        <>
            <section className={style.backimg + "  overflow-hidden d-flex align-items-center "}>
                <div className=" container">
                    <div className={style.card_deck + " row grid gap-3 d-flex justify-content-center"}>
                        <div className={style.box_shadow + " text-white d-flex mb-5 col-3 card"}>
                            <div className="card-header">
                                <h4 className="my-0 font-weight-normal">تغيير منصب</h4>
                            </div>
                            <div className="card-body">
                                <button type="button" className="p-5 btn btn-lg btn-block  btn-light  btn-outline-primary" onClick={supervisorUpgrade}>تغيير منصب الطالب</button>
                            </div>
                        </div>
                        <div className={style.box_shadow + "  text-white card mb-5 d-flex col-3"}>
                            <div className="card-header">
                                <h4 className="my-0 font-weight-normal">التقارير الأسبوعية</h4>
                            </div>
                            <div className="card-body">
                                <button type="button" className="p-5 btn btn-lg btn-block  btn-light  btn-outline-primary" onClick={reportsShow}>عرض التقارير الأسبوعية</button>
                            </div>
                        </div>
                        <div className={style.box_shadow + "  text-white card mb-5 d-flex col-3 ="}>
                            <div className="card-header">
                                <h4 className="my-0 font-weight-normal">نقل الطالب</h4>
                            </div>
                            <div className="card-body">
                                <button type="button" className="p-5 btn btn-lg btn-block  btn-light  btn-outline-primary" onClick={changeStudentSupervisor}>نقل الطالب إلى مشرف جديد</button>
                            </div>
                        </div>
                        <div className={style.box_shadow + "  text-white card mb-5 d-flex col-3"}>
                            <div className="card-header">
                                <h4 className="my-0 font-weight-normal">تغيير الكلية</h4>
                            </div>
                            <div className="card-body">
                                <button type="button" className="p-5 btn btn-lg btn-block  btn-light  btn-outline-primary" onClick={collegeChange}>تغيير الكلية</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
