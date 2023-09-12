import React, { useEffect, useState } from 'react'
import style from "./SuperVisorUpgrage.module.css";
import axios from 'axios';
import Swal from 'sweetalert2';
export default function SuperVisorUpgrade() {
    let [students, setStudents] = useState([]);
    let [tBody, setTBody] = useState(null);
    let [flag, setFlag] = useState(false);
    let [stdToSuper,setStdToSuper]=useState({
        student_id:'',
        class_name:'',
        type:'',
    })
    let [superToStd,setSuperToStd]=useState({
        student_id:'',
        type:'',
    })
    useEffect(() => {
        if (flag === !flag) {
            return;
        } else {
            //insertExamRequestRecord();
            // updateExamRequestsTable();
        }
    }, [flag])
    useEffect(() => {
        getStudentList();
    }, []);
    async function getStudentList() {
        let { data } = await axios.get('http://localhost/multaqa/api/upgrade_page_student.php');
        setStudents(data.info_Students);
    }
    function searchStudentByName(Event) {
        let tBodyData = students.map((ele, index) => {
            if (ele.Student_name.includes(Event.target.value)) {
                return <tr key={index}>
                    <td>{ele.Student_id}</td>
                    <td>{ele.Student_name}</td>
                    <td>{ele.college_name}</td>
                    <td>{ele.type === '5' ? 'طالب' : ele.type === '4' ? 'مشرف' : 'مسؤول كلية'}</td>
                    <td><button type="button" className="btn btn-info" onClick={() => convertStudent(ele)}>تعديل منصب</button></td>
                </tr>
            }
        });
        setTBody(tBodyData);
        setFlag(!flag)
    }
    function searchStudentByID(Event) {
        let tBodyData = students.map((ele, index) => {
            if (ele.Student_id.includes(Event.target.value)) {
                return <tr key={index}>
                    <td>{ele.Student_id}</td>
                    <td>{ele.Student_name}</td>
                    <td>{ele.college_name}</td>
                    <td>{ele.type === '5' ? 'طالب' : ele.type === '4' ? 'مشرف' : 'مسؤول كلية'}</td>
                    <td><button type="button" className="btn btn-info" onClick={() => convertStudent(ele)}>تعديل منصب</button></td>
                </tr>
            }
        });
        setTBody(tBodyData);
        setFlag(!flag)
    }
    async function updateStudentPosition(){
        let { data } = await axios.put('http://localhost/multaqa/api/update_Student_to_supervisor_coll.php',stdToSuper);
    }
    async function updateSupervisorPosition(){
        let { data } = await axios.put('http://localhost/multaqa/api/update_coll_super_to_std.php',superToStd);
    }
    function convertStudent(ele) {
        Swal.fire({
            title: 'معلومات الطالب',
            html: `
            <div class="text-center">
            <p class="alert alert-danger">مشرف = 4 ، مسؤول كلية = 3</p>
            <input id="newType" class="swal2-input" type="text"/>
            <label className="form-label" htmlFor="StudentName">رمز المنصب الجديد</label><br>
            <input id="className" class="swal2-input" type="text"/><br>
            <label className="form-label" htmlFor="StudentName">إسم الحلقة</label><br>
            </div>
            `,
            confirmButtonText: 'تم تعديل المنصب !',
            focusConfirm: false
        }).then((result) => {
            if (result.isConfirmed) {
                let studentTemp = stdToSuper;
                studentTemp['type'] = document.getElementById('newType').value;
                studentTemp['class_name'] = document.getElementById('className').value;
                studentTemp['student_id'] = ele.Student_id;
                setStdToSuper(studentTemp);
                setFlag(!flag);
                updateStudentPosition();
                Swal.fire(
                    'تم التعديل!',
                    'تمت تعديل منصب الطالب   ',
                    'success'
                )
            }
        })
    }
    function convertSupervisor(ele) {
        Swal.fire({
            title: 'معلومات الطالب',
            html: `
            <div class="text-center">
            <p class="alert alert-danger">طالب = 5 ، مشرف = 4 ، مسؤول كلية = 3</p>
            <input id="newType" class="swal2-input" type="text"/>
            <label className="form-label" htmlFor="StudentName">رمز المنصب الجديد</label>
            </div>
            `,
            confirmButtonText: 'تم تعديل المنصب !',
            focusConfirm: false
        }).then((result) => {
            if (result.isConfirmed) {
                let studentTemp = superToStd;
                studentTemp['type'] = document.getElementById('newType').value;
                studentTemp['student_id'] = ele.Student_id;
                setSuperToStd(studentTemp);
                setFlag(!flag);
                updateSupervisorPosition();
                Swal.fire(
                    'تم التعديل!',
                    'تمت تعديل منصب الطالب   ',
                    'success'
                )
            }
        })
    }
    return (
        <>
            <section className={style.backimg + " overflow-hidden d-flex align-items-center"}>
                <div className="container ">
                    <div className=" mb-3  align-items-center m-auto mt-3 me-3 p-3 row">
                        <label htmlFor="studentName" className='col-2'>إسم الطالب :- </label>
                        <input type="text" onChange={searchStudentByName} id="studentName" className="col-4 swal2-input p-3" placeholder="إسم الطالب .. " /><br />
                        <label htmlFor="studentID" className='col-2'>الرقم الجامعي :- </label>
                        <input type="text" onChange={searchStudentByID} id="studentID" className="col-4 swal2-input p-3" placeholder="الرقم الجامعي .. " />
                    </div>
                    <table className="table   table-sm overflow-hidden ">
                        <thead className="table table-dark">
                            <tr>
                                <th>إسم الطالب</th>
                                <th>الرقم الجامعي</th>
                                <th>الكلية</th>
                                <th>المنصب</th>
                                <th>ترقية</th>
                            </tr>
                        </thead>
                        <tbody id="table-body" className="table-group-divider table-success">
                            {
                                tBody != null ?
                                    tBody : students.map((ele, index) => {
                                        return (<tr key={index}>
                                            <td>{ele.Student_name}</td>
                                            <td>{ele.Student_id}</td>
                                            <td>{ele.college_name}</td>
                                            <td>{ele.type === '5' ? 'طالب' : ele.type === '4' ? 'مشرف' : 'مسؤول كلية'
                                            }</td>
                                            <td>{ele.type==='5'?<button type="button" className="btn btn-info" onClick={() => convertStudent(ele)}>تعديل منصب</button>:<button type="button" className="btn btn-info" onClick={() => convertSupervisor(ele)}>تعديل منصب</button>}</td>
                                        </tr>)
                                    })
                            }
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    )
}
