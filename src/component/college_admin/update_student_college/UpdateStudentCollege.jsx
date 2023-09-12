import React, { useEffect, useState } from 'react'
import style from "./UpdateStudentCollege.module.css";
import axios from 'axios';
import Swal from 'sweetalert2';
export default function UpdateStudentCollege() {
    let [students, setStudents] = useState([]);
    let [tBody, setTBody] = useState(null);
    let [flag, setFlag] = useState(false);
    let [newCollegeRecord, setNewCollegeRecord] = useState({
        student_id: '',
        college_name: '',
        specialization: '',
    });
    function searchStudentByName(Event) {
        let tBodyData = students.map((ele, index) => {
            if (ele.Student_name.includes(Event.target.value)) {
                return <tr key={index}>
                    <td>{ele.Student_name}</td>
                    <td>{ele.Student_id}</td>
                    <td>{ele.college_name}</td>
                    <td>{ele.specialization}</td>
                    <td><button type="button" className="btn btn-info" onClick={() => convertStudent(ele)}>أنقل</button></td>
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
                    <td>{ele.Student_name}</td>
                    <td>{ele.Student_id}</td>
                    <td>{ele.college_name}</td>
                    <td>{ele.specialization}</td>
                    <td><button type="button" className="btn btn-info" onClick={() => convertStudent(ele)}>أنقل</button></td>
                </tr>
            }
        });
        //console.log(tBodyData)
        setTBody(tBodyData);
        setFlag(!flag)
    }
    useEffect(() => {
        if (flag === !flag) {
            return;
        }
    }, [flag])
    useEffect(() => {
        getStudentList();
    }, []);
    async function getStudentList() {
        let { data } = await axios.get('http://localhost/multaqa/api/info_stu.php');
        console.log(data.info)
        setStudents(data.info);
    }
    async function updateCollege() {
        let { data } = await axios.put('http://localhost/multaqa/api/upgrade_college.php', newCollegeRecord);
        console.log(data.update_supervisor)
    }
    function convertStudent(ele) {
        Swal.fire({
            title: 'معلومات الإمتحان',
            html: `
            <p class="mb-1">إسم الطالب : <br>${ele.Student_name} </p><br>
            <div class="text-center">
            <label for="newCollegeName">إسم الكلية الجديدة :</label>
            <input type="text" id="newCollegeName" class="swal2-input" placeholder="إسم الكلية"><br>
            <label for="newCollegeName">إسم التخصص الجديد :</label>
            <input type="text" id="newSpecializationName" class="swal2-input" placeholder="إسم التخصص"><br>
            </div>
            `,
            confirmButtonText: 'تم النقل !',
            focusConfirm: false
        }).then((result) => {
            if (result.isConfirmed) {
                let studentTemp = newCollegeRecord;
                studentTemp['student_id'] = ele.Student_id;
                studentTemp['college_name'] = Swal.getPopup().querySelector('#newCollegeName').value;
                studentTemp['specialization'] = Swal.getPopup().querySelector('#newSpecializationName').value;
                setNewCollegeRecord(studentTemp);
                updateCollege();
                setFlag(!flag);
                Swal.fire(
                    'تم النقل!',
                    'تم تعديل الكلية بنجاح',
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
                        <input type="text" onChange={ searchStudentByName} id="studentName" className="col-4 p-3 swal2-input" placeholder="إسم الطالب .. " /><br />
                        <label htmlFor="studentID" className='col-2'>الرقم الجامعي :- </label>
                        <input type="text" onChange={searchStudentByID} id="studentID" className="col-4 p-3 swal2-input" placeholder="الرقم الجامعي .. " />
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
