import React, { useState } from 'react'
import style from "./AddStudent.module.css";
import axios from 'axios';
import Joi from 'joi';
import Swal from 'sweetalert2';
export default function AddStudent() {
    const onePratString = <>
        <option value={0}>الأجزاء</option>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
        <option value={6}>6</option>
        <option value={7}>7</option>
        <option value={8}>8</option>
        <option value={9}>9</option>
        <option value={10}>10</option>
        <option value={11}>11</option>
        <option value={12}>12</option>
        <option value={13}>13</option>
        <option value={14}>14</option>
        <option value={15}>15</option>
        <option value={16}>16</option>
        <option value={17}>17</option>
        <option value={18}>18</option>
        <option value={19}>19</option>
        <option value={20}>20</option>
        <option value={21}>21</option>
        <option value={22}>22</option>
        <option value={23}>23</option>
        <option value={24}>24</option>
        <option value={25}>25</option>
        <option value={26}>26</option>
        <option value={27}>27</option>
        <option value={28}>28</option>
        <option value={29}>29</option>
        <option value={30}>30</option>
    </>
        ;
    const collegeOptions = <>
        <option value={"0"}>الكلية</option>
        <option value={"الهندسة"}>الهندسة وتكنولوجيا المعلومات</option>
        <option value={"الطب"}>الطب وعلوم الصحة</option>
        <option value={"الإقتصاد"}>الأعمال والإتصال</option>
        <option value={"العلوم"}>العلوم</option>
        <option value={"الفنون"}>الفنون الجميلة</option>
        <option value={"التربية"}>العلوم الإنسانية والتروبوية</option>
        <option value={"الشريعة"}>الشريعة</option>
        <option value={"القانون"}>القانون والعلوم السياسية</option>
        <option value={"الزراعة"}>الزراعة والطب البيطري</option>
    </>
    let [student, setStudent] = useState({
        Student_id: '',
        Student_name: '',
        plan: '',
        phone: '',
        gender: '',
        college_name: '',
        specialization: '',
    });
    let [errorMessage, setErrorMessage] = useState(null);
    async function submitHandling() {
        
        let { data } = await axios.post('http://localhost/multaqa/api/insert_new_student.php', student);
        console.log(data.insert_student.message);
        if(data.insert_student.message==='Success'){
            Swal.fire("عمل جيد!", "تم إضافة الطالب بنجاح", "أحسنت")
        }else{
        setErrorMessage('تأكد من صحة جميع المعلومات');
        }

    }

    function getUserData(Event) {
        let userTemp = student;
        userTemp[Event.target.name] = Event.target.value;
        console.log(userTemp);
        setStudent(userTemp);
    }
    function fillStudentData() {
        let selectedCollegeName = document.getElementById('college_name').value;
        let userTemp = student;
        userTemp['college_name'] = selectedCollegeName;
        console.log(userTemp);
        setStudent(userTemp);
    }
    return (
        <>
            <section className={style.backimg + " h-100"} >
                <div className="container p-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center pb-5 h-100">
                        <div className="col">
                            <div className="card card-registration my-4">
                                <div className="row g-0">
                                    <div className="col-xl-6 d-none d-xl-block">
                                        <img src={require('./img/qur5.jpeg')} alt="Sample" className="img-fluid h-100" style={{ borderTopLeftRadius: '.25rem', borderBottomLeftRadius: '.25rem' }} />
                                    </div>
                                    <div className="col-xl-6">
                                        <div className="card-body p-md-5 text-black">
                                            <h3 className="mb-5 text-uppercase">إضافة طالب</h3>
                                            {
                                                errorMessage!=null? <div className='alert alert-danger'>{errorMessage}</div>:null
                                            }
                                            <div className="row">
                                                <div className="col-md-12 mb-4">
                                                    <div className="form-outline">
                                                        <input type="text" onChange={getUserData} id="Student_name" name='Student_name' className="form-control form-control-lg" />
                                                        <label className="form-label" htmlFor="StudentName">إسم الطالب الرباعي</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-12 mb-4">
                                                    <div className="form-outline">
                                                        <input type="text" onChange={getUserData} id="Student_id" name='Student_id' className="form-control form-control-lg" />
                                                        <label className="form-label" htmlFor="superVisorName">رقم الطالب الجامعي</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12 mb-4">
                                                    <div className="form-outline">
                                                        <input type="text" onChange={getUserData} id="phone" name='phone' className="form-control form-control-lg" />
                                                        <label className="form-label" htmlFor="studentPhone">رقم الواتساب</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-12 mb-4">
                                                    <div className="form-outline mb-4">
                                                        <input type="text" onChange={getUserData} id="specialization" name='specialization' className="form-control form-control-lg" />
                                                        <label className="form-label" htmlFor="studentPhone">التخصص الجامعي</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-12 mb-4">
                                                    <div className="form-outline">
                                                        <input type="text" onChange={getUserData} id="plan" name='plan' className="form-control form-control-lg" placeholder='مكثف/عادي/تثبيت' />
                                                        <label className="form-label" htmlFor="studentPhone">خطة الحفظ</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-12 mb-4">
                                                    <div className="form-outline mb-4">
                                                        <input type="text" onChange={getUserData} id="gender" name='gender' className="form-control form-control-lg" placeholder='ذكر/أنثى : الهمزة ضرورية' />
                                                        <label className="form-label" htmlFor="studentPhone">الجنس</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row overflow-hidden ">
                                                <div className="col-md-12 mb-4 m-auto">
                                                    <select id="college_name" onChange={fillStudentData} className="select">
                                                        {collegeOptions}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-end pt-3">
                                                <button type="button" className="btn btn-warning btn-lg ms-2" onClick={submitHandling}>أضف طالب</button>
                                            </div>
                                        </div>
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
