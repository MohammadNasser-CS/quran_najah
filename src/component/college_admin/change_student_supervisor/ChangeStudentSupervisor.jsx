import React, { useEffect, useState } from 'react'
import style from "./ChangeStudentSupervisor.module.css"
import axios from 'axios';
import Swal from 'sweetalert2';
export default function ChangeStudentSupervisor() {
    let [students, setStudents] = useState([]);
    let [tBody, setTBody] = useState(null);
    let [flag, setFlag] = useState(false);
    let [newStudentRecord, setNewStudentRecord] = useState({
        student_id: '',
        supervisor_id_new: '',
        supervisor_id_old: '',
    });
    function searchStudentByName(Event) {
        let tBodyData = students.map((ele, index) => {
            if (ele.studentName.includes(Event.target.value)) {
                return <tr key={index}>
                    <td>{ele.studentName}</td>
                    <td>{ele.regesterationNumber}</td>
                    <td>{ele.studentCollege}</td>
                    <td>{ele.suggestedHour}</td>
                    <td><button type="button" className="btn btn-info" onClick={() => convertStudent(ele)}>أنقل</button></td>
                </tr>
            }
        });
        //console.log(tBodyData)
        setTBody(tBodyData);
        setFlag(!flag)
    }
    function searchStudentByID(Event) {
        //console.log(search.value);
        //console.log(students);
        let tBodyData = students.map((ele, index) => {
            if (ele.regesterationNumber.includes(Event.target.value)) {
                return <tr key={index}>
                    <td>{ele.studentName}</td>
                    <td>{ele.regesterationNumber}</td>
                    <td>{ele.studentCollege}</td>
                    <td>{ele.suggestedHour}</td>
                    <td><button type="button" className="btn btn-info" onClick={() => convertStudent(ele)}>أنقل</button></td>
                </tr>
            }
        });
        //console.log(tBodyData)
        setTBody(tBodyData);
        setFlag(!flag)
    }
    useEffect(() => {
        // if (selectedCollegeValue === '0' && selectedExamPlanValue === '0' && selectedExamTypeValue === '0' && selectedSexTypeValue === '0') {
        //     return;
        // }
        if (flag === !flag) {
            return;
        } else {
            //insertExamRequestRecord();
            // updateExamRequestsTable();
        }
        console.log('did update');
    }, [flag])
    useEffect(() => {
        getStudentList();
    }, []);
    async function getStudentList() {
        let { data } = await axios.get('http://localhost/multaqa/api/modify_supervisor_info.php');
        console.log(data.info_Students)
        setStudents(data.info_Students);
    }
    async function updateSupervisor() {
        let { data } = await axios.put('http://localhost/multaqa/api/update_supervisor.php', newStudentRecord);
        console.log(data.update_supervisor)
    }
    function convertStudent(ele) {
        Swal.fire({
            title: 'معلومات الإمتحان',
            html: `
            <p class="mb-1">إسم الطالب : <br>${ele.Student_name} </p><br>
            <p class="mb-1"> إسم المشرف الحالي: <br>${ele.supervisor_name === 'help for new student' ? "لا يوجد" : ele.supervisor_name} </p><br>
            <div class="text-center">
            <label for="newSupervisorName">إسم المشرف الجديد :</label>
            <input type="text" id="newSupervisorName" class="swal2-input" placeholder="إسم المشرف"><br>
            <label for="newSupervisorID">رقم المشرف الجديد :</label>
            <input type="text" id="newSupervisorID" class="swal2-input" placeholder="الرقم الجامعي"><br>
            </div>
            `,
            confirmButtonText: 'تم النقل !',
            focusConfirm: false
        }).then((result) => {
            if (result.isConfirmed) {
                let studentTemp = newStudentRecord;
                studentTemp['student_id'] = ele.Student_id;
                studentTemp['supervisor_id_old'] = ele.supervisor_id;
                studentTemp['supervisor_id_new'] = Swal.getPopup().querySelector('#newSupervisorID').value;
                setNewStudentRecord(studentTemp);
                console.log(newStudentRecord);
                setFlag(!flag);
                updateSupervisor();
                Swal.fire(
                    'تم النقل!',
                    'تم تعديل المشرف بنجاح',
                    'success'
                )
            }
        })
    }
    return (
        <>
            <section className={style.backimg + " overflow-hidden d-flex align-items-center"}>
                <div className="container align-items-center ">
                    <div className=" mb-3  align-items-center m-auto mt-3 me-3 p-3 row">
                        <label htmlFor="studentName" className='col-2'>إسم الطالب :- </label>
                        <input type="text" onChange={() => searchStudentByName()} id="studentName" className="col-4 p-3 swal2-input" placeholder="إسم الطالب .. " /><br />

                        <label htmlFor="studentID" className='col-2'>الرقم الجامعي :- </label>
                        <input type="text" onChange={() => searchStudentByID()} id="studentID" className="col-4 p-3 swal2-input" placeholder="الرقم الجامعي .. " />
                    </div>
                    <table className="table  table-sm overflow-hidden ">
                        <thead className="table table-dark">
                            <tr>
                                <th>إسم الطالب</th>
                                <th>الرقم الجامعي</th>
                                <th>الكلية</th>
                                <th>التخصص</th>
                                <th>نقل</th>
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
                                            <td>{ele.specialization}</td>
                                            <td><button type="button" className="btn btn-info" onClick={() => convertStudent(ele)}>أنقل</button></td>
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
