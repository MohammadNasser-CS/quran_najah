import React, { useEffect, useState } from 'react'
import style from "./DailyReportShow.module.css"
import axios from 'axios';
import Swal from 'sweetalert2';

export default function DailyReportShow() {
    let [reports, setReports] = useState([]);
    let [tBody, setTBody] = useState(null);
    let [flag, setFlag] = useState(false);
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
        let { data } = await axios.get('http://localhost/multaqa/api/display_Report.php');
        setReports(data.display_report);
    }
    function searchStudentByName(e) {
        let tBodyData = reports.map((ele, index) => {
            if (ele.supervisor_name.includes(e.target.value)) {
                return <tr key={index}>
                    <td>{ele.student_name}</td>
                    <td>{ele.Student_id}</td>
                    <td>{ele.supervisor_name}</td>
                    <td>{ele.class_name}</td>
                    <td><button type="button" className="btn btn-info" onClick={() => convertStudent(ele)}>عرض</button></td>
                </tr>
            }
        });
        setTBody(tBodyData);
        setFlag(!flag)
    }
    function searchStudentByID(e) {
        let tBodyData = reports.map((ele, index) => {
            if (ele.supervisor_id.includes(e.target.value)) {
                return <tr key={index}>
                    <td>{ele.student_name}</td>
                    <td>{ele.Student_id}</td>
                    <td>{ele.supervisor_name}</td>
                    <td>{ele.class_name}</td>
                    <td><button type="button" className="btn btn-info" onClick={() => convertStudent(ele)}>عرض</button></td>
                </tr>
            }
        });
        setTBody(tBodyData);
        setFlag(!flag)
    }
    function convertStudent(ele) {
        Swal.fire({
            title: 'معلومات التقرير',
            html: `
            <div class="text-center">
            <p class="mb-1">تاريخ التقرير : <br>${ele.date} </p><br>
            <p class="mb-1">عدد صفحات الحفظ :<br>${ele.no_of_save_pages} </p><br>
            <p class="mb-1">من صفحة إلى صفحة :<br>${ele.page_to_page_save} </p><br>
            <p class="mb-1">عدد صفحات المراجعة :<br>${ele.no_of_review_pages} </p><br>
            <p class="mb-1">من صفحة إلى صفحة :<br>${ele.page_to_page_review} </p><br>
            <p class="mb-1">ملاحظات على الطالب :<br>${ele.note} </p><br>
            <p class="mb-1">نمط الإمتحان :<br>${ele.exam_pattern!=null?ele.exam_pattern:"لا يوجد"} </p><br>
            <p class="mb-1">نوع الإمتحان :<br>${ele.exam_section!=null?ele.exam_section:"لا يوجد"} </p><br>
            <p class="mb-1">علامة الإمتحان :<br>${ele.grade!=null?ele.grade:"لا يوجد"} </p><br>
            </div>
            `,
            focusConfirm: false
        })
    }
    return (
        <>
            <section className={style.backimg + " overflow-hidden d-flex align-items-center"}>
                <div className="container ">
                    <div className=" mb-3  align-items-center m-auto mt-3 me-3 p-3 row">
                        <label htmlFor="studentName" className='col-2'>إسم المشرف :- </label>
                        <input type="text" onChange={searchStudentByName} id="studentName" className="col-4 swal2-input p-3" placeholder="إسم الطالب .. " /><br />
                        <label htmlFor="studentID" className='col-2'>الرقم الجامعي للمشرف :- </label>
                        <input type="text" onChange={searchStudentByID} id="studentID" className="col-4 swal2-input p-3" placeholder="الرقم الجامعي .. " />
                    </div>
                    <table className="table   table-sm overflow-hidden ">
                        <thead className="table table-dark">
                            <tr>
                                <th>إسم الطالب</th>
                                <th>الرقم الجامعي</th>
                                <th>إسم المشرف</th>
                                <th>إسم الحلقة</th>
                                <th>عرض</th>
                            </tr>
                        </thead>
                        <tbody id="table-body" className="table-group-divider table-success">
                            {
                                tBody != null ?
                                    tBody : reports.map((ele, index) => {
                                        return (<tr key={index}>
                                            <td>{ele.student_name}</td>
                                            <td>{ele.Student_id}</td>
                                            <td>{ele.supervisor_name}</td>
                                            <td>{ele.class_name}</td>
                                            <td><button type="button" className="btn btn-info" onClick={() => convertStudent(ele)}>عرض</button></td>
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
