import React, { useEffect, useState } from 'react'
import style from "./Report.module.css";
import axios from 'axios';
import Swal from 'sweetalert2';
export default function Report(props) {
    console.log(props.user);
    let [studentsData, setStudentsData] = useState({});
    let [flag, setFlag] = useState(false);
    let [reportRecord, setReportRecord] = useState({
        Student_id: '',
        no_of_save_pages: '',
        no_of_review_pages: '',
        page_to_page_save: '',
        page_to_page_review: '',
        note: ''
    });
    let [examinatorData, setExaminatorData] = useState({});
    let [examinatorId, setExaminatorId] = useState({
        supervisor_id: ''
    });
    let [gradeRecord, setGradeRecord] = useState({
        serial_no: '',
        grade: '',
    })
    let [examsSelectedRecords, setExamsSelectedRecords] = useState(null)
    useEffect(() => {
        if (props == null) {
            return;
        }
        getGroupStudents();
        getSelectedExams();
    }, [props]);
    async function getGroupStudents() {
        let examinatorIdTemp = examinatorId;
        examinatorIdTemp['supervisor_id'] = props.user;
        setExaminatorId(examinatorIdTemp)
        let { data } = await axios.post('http://localhost/multaqa/api/info_class_supervisor.php', examinatorId);
        setStudentsData(data.information_supervisor_classes);
        console.log(data.information_supervisor_classes)

    }
    async function getSelectedExams() {
        let examinatorIdTemp = examinatorId;
        examinatorIdTemp['supervisor_id'] = props.user;
        setExaminatorId(examinatorIdTemp)
        console.log(examinatorId)
        let { data } = await axios.post('http://localhost/multaqa/api/reports_page_exam_requests_for_the_supervisor.php', examinatorId);
        console.log(data.report_exam_supervisor_request);
        setExamsSelectedRecords(data.report_exam_supervisor_request);
        console.log(examsSelectedRecords);
    }
    async function insertExamGrade() {
        let { data } = await axios.post('http://localhost/multaqa/api/grade_exam.php', gradeRecord);
        console.log(data.insert_grade);
    }
    async function insertReportData(){
        let { data } = await axios.post('http://localhost/multaqa/api/Supervisor_Uploads_Information.php', reportRecord);
        console.log(data.Supervisor_uploads_information);   
    }
    function submitReport(ele) {
        Swal.fire({
            title: 'رفع التقرير',
            html: `
            <input id="savedPages" class="swal2-input" type="text" />
            <label className="form-label" htmlFor="StudentName">عدد صفحات الحفظ</label>
            <input id="fromTo" class="swal2-input" type="text" placeholder="من-إلى"/><br>
            <label className="form-label" htmlFor="StudentName" >من صفحة إلى صفحة</label>
            <input id="revPages" class="swal2-input" type="text"/><br>
            <label className="form-label" htmlFor="StudentName">عدد صفحات المراجعة</label>
            <input id="revFromTo" class="swal2-input" type="text" placeholder="من-إلى"/><br>
            <label className="form-label" htmlFor="StudentName">من صفحة إلى صفحة</label>
            <input id="notes" class="swal2-input" type="text"/><br>
            <label className="form-label" htmlFor="StudentName">ملاحظات</label>
                `,
            confirmButtonText: 'إرفع التقرير !',
            focusConfirm: false,
            preConfirm: () => {
                let reportRecordTemp = reportRecord;
                reportRecordTemp['Student_id'] = ele.Student_id;
                reportRecordTemp['no_of_save_pages'] = document.getElementById('savedPages').value // get it from the input field .
                reportRecordTemp['page_to_page_save'] = document.getElementById('fromTo').value // get it from the input field .
                reportRecordTemp['no_of_review_pages'] = document.getElementById('revPages').value // get it from the input field .
                reportRecordTemp['page_to_page_review'] = document.getElementById('revFromTo').value // get it from the input field .
                reportRecordTemp['note'] = document.getElementById('notes').value // get it from the input field .
                setReportRecord(reportRecordTemp);
                console.log(reportRecord);
                insertReportData();
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // here call function to send reportRecord to the Back-end .
                Swal.fire(
                    'تم الرفع!',
                    'تم رفع التقرير',
                    'success'
                )
            }
        })
    }
    function submitGrade(ele) {
        Swal.fire({
            title: 'رفع العلامة',
            html: `
            <p class="mb-1">إسم الطالب : <br>${ele.Student_name} </p><br>
            <p class="mb-1">رقم الطالب الجامعي: <br>${ele.student_id}</p><br>
            <input type="text" id='grade' className="form-control form-control-lg" />
            <label className="form-label" htmlFor="StudentName">العلامة</label>
                `,
            confirmButtonText: 'إرفع العلامة !',
            focusConfirm: false,
            preConfirm: () => {
                let gradeRecordTemp = gradeRecord;
                gradeRecordTemp['grade'] = document.getElementById('grade').value // get it from the input field .
                gradeRecordTemp['serial_no'] = ele.serial_no;
                setGradeRecord(gradeRecordTemp);
                console.log(gradeRecord);
                insertExamGrade();
            }
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'تم الرفع!',
                    'تم رصد العلامة',
                    'success'
                )
            }
        })
    }
    return (
        <>
            <>
                <section className={style.backimg + " d-flex align-items-center overflow-hidden"} >
                    <div className="container ">
                        { // here is to set the exam grade after take it . depending on examinator name 
                            examsSelectedRecords != null ? <table className="table   table-sm overflow-hidden ">
                                <thead className="table table-dark">
                                    <tr>
                                        <th>إسم الطالب </th>
                                        <th>هاتف الطالب</th>
                                        <th>الكلية</th>
                                        <th>رصد علامة</th>
                                    </tr>
                                </thead>
                                <tbody className='table-group-divider table-success'>
                                    {
                                        examsSelectedRecords != null ? examsSelectedRecords.map((ele, index) => {
                                            return (<tr key={index}>
                                                <td>{ele.Student_name}</td>
                                                <td>{ele.phone}</td>
                                                <td>{ele.college_name}</td>
                                                <td><button type="button" className="btn btn-info" onClick={() => submitGrade(ele)}>أرصد علامة</button></td>
                                            </tr>)
                                        }) : null
                                    }
                                </tbody>
                            </table> : null
                        }
                        <table className="table   table-sm overflow-hidden ">
                            <thead className="table table-info">
                                <tr>
                                    <th>إسم الحلقة : {studentsData.class_name}</th>
                                    <th>عدد الطلاب : {studentsData.no_of_students}</th>
                                    <th>الكلية : {studentsData.college_name}</th>
                                </tr>
                            </thead>
                        </table>
                        <table className="table   table-sm overflow-hidden ">
                            <thead className="table table-dark">
                                <tr>
                                    <th>الرقم</th>
                                    <th>إسم الطالب</th>
                                    <th>رقم الهاتف</th>
                                    <th>الخطة</th>
                                    <th>إرفع</th>
                                </tr>
                            </thead>
                            <tbody id="table-body" className="table-group-divider table-success">
                                {
                                    studentsData.data_student?.map((ele, index) => {
                                        return (<tr key={index}>
                                            <td>{ele.Student_id}</td>
                                            <td>{ele.Student_name}</td>
                                            <td>{ele.phone}</td>
                                            <td>{ele.plan}</td>
                                            <td><button type="button" className="btn btn-info" onClick={() => submitReport(ele)}>إرفع</button></td>
                                        </tr>)
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </section>
            </>
        </>
    )
}
