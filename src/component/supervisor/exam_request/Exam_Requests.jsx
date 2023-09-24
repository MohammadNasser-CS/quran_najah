import React, { useEffect, useState } from 'react'
import style from "./Exam_Requests.module.css";
import axios from 'axios';
import Swal from 'sweetalert2';
export default function Exam_Requests(props) {
    console.log(props.user);
    let [examRequests, setExamRequests] = useState([]);
    let selectedCollegeValue = '0';
    let selectedExamPlanValue = '0';
    let selectedExamTypeValue = '0'
    let selectedSexTypeValue = '0';
    let [tBody, setTBody] = useState(null);
    let [examinatorRecord, setExaminatorRecord] = useState({
        serial_no: '',
        student_id: '',
        supervisor_id: '',
    });
    let [flag, setFlag] = useState(false);
    function fillTableByType(type) {
        let tBodyData = examRequests.map((ele, index) => {
            if (ele.exam_pattern === type) {
                return <tr key={index}>
                    <td>{ele.college_name}</td>
                    <td>{ele.plan}</td>
                    <td>{ele.exam_pattern}</td>
                    <td>{ele.exam_section}</td>
                    <td>{ele.date}</td>
                    <td><button type="button" className="btn btn-info" onClick={getStudent}>إحجز</button></td>
                </tr>
            }
        });
        return tBodyData;
    }
    function fillTableByCollege(college) {
        var tBodyData = examRequests.map((ele, index) => {
            if (ele.college_name === college) {
                return <tr key={index}>
                    <td>{ele.college_name}</td>
                    <td>{ele.plan}</td>
                    <td>{ele.exam_pattern}</td>
                    <td>{ele.exam_section}</td>
                    <td>{ele.date}</td>
                    <td><button type="button" className="btn btn-info" onClick={getStudent}>إحجز</button></td>
                </tr>
            }
        });
        return tBodyData;
    }
    function fillTableByPlan(plan) {
        let tBodyData = examRequests.map((ele, index) => {
            if (ele.plan === plan) {
                return <tr key={index}>
                    <td>{ele.college_name}</td>
                    <td>{ele.plan}</td>
                    <td>{ele.exam_pattern}</td>
                    <td>{ele.exam_section}</td>
                    <td>{ele.date}</td>
                    <td><button type="button" className="btn btn-info" onClick={getStudent}>إحجز</button></td>
                </tr>
            }
        });
        return tBodyData;
    }
    function fillTableBySex(sex) {
        let tBodyData = examRequests.map((ele, index) => {
            if (ele.gender === sex) {
                return <tr key={index}>
                    <td>{ele.college_name}</td>
                    <td>{ele.plan}</td>
                    <td>{ele.exam_pattern}</td>
                    <td>{ele.exam_section}</td>
                    <td>{ele.date}</td>
                    <td><button type="button" className="btn btn-info" onClick={getStudent}>إحجز</button></td>
                </tr>
            }
        });
        return tBodyData;
    }
    function fillTableByCollegeAndPlan(college, plan) {
        let tBodyData = examRequests.map((ele, index) => {
            if (ele.college_name === college && ele.plan === plan) {
                return <tr key={index}>
                    <td>{ele.college_name}</td>
                    <td>{ele.plan}</td>
                    <td>{ele.exam_pattern}</td>
                    <td>{ele.exam_section}</td>
                    <td>{ele.date}</td>
                    <td><button type="button" className="btn btn-info" onClick={getStudent}>إحجز</button></td>
                </tr>
            }
        });
        return tBodyData;
    }
    function fillTableByCollegeAndType(college, type) {
        let tBodyData = examRequests.map((ele, index) => {
            if (ele.college_name === college && ele.exam_pattern === type) {
                return <tr key={index}>
                    <td>{ele.college_name}</td>
                    <td>{ele.plan}</td>
                    <td>{ele.exam_pattern}</td>
                    <td>{ele.exam_section}</td>
                    <td>{ele.date}</td>
                    <td><button type="button" className="btn btn-info" onClick={getStudent}>إحجز</button></td>
                </tr>
            }
        });
        return tBodyData;
    }
    function fillTableByCollegeAndSex(college, sex) {
        var tBodyData = examRequests.map((ele, index) => {
            if (ele.college_name === college && ele.gender === sex) {
                return <tr key={index}>
                    <td>{ele.college_name}</td>
                    <td>{ele.plan}</td>
                    <td>{ele.exam_pattern}</td>
                    <td>{ele.exam_section}</td>
                    <td>{ele.date}</td>
                    <td><button type="button" className="btn btn-info" onClick={getStudent}>إحجز</button></td>
                </tr>
            }
        });
        return tBodyData;
    }
    function fillTableByPlanAndType(plan, type) {
        let tBodyDate = examRequests.map((ele, index) => {
            if (ele.plan === plan && ele.exam_pattern === type) {
                return <tr key={index}>
                    <td>{ele.college_name}</td>
                    <td>{ele.plan}</td>
                    <td>{ele.exam_pattern}</td>
                    <td>{ele.exam_section}</td>
                    <td>{ele.date}</td>
                    <td><button type="button" className="btn btn-info" onClick={getStudent}>إحجز</button></td>
                </tr>
            }
        });
        return tBodyDate;
    }
    function fillTableByPlanAndSex(plan, sex) {
        let tBodyData = examRequests.map((ele, index) => {
            if (ele.plan === plan && ele.gender === sex) {
                return <tr key={index}>
                    <td>{ele.college_name}</td>
                    <td>{ele.plan}</td>
                    <td>{ele.exam_pattern}</td>
                    <td>{ele.exam_section}</td>
                    <td>{ele.date}</td>
                    <td><button type="button" className="btn btn-info" onClick={getStudent}>إحجز</button></td>
                </tr>
            }
        });
        return tBodyData;
    }
    function fillTableByTypeAndSex(type, sex) {
        let tBodyData = examRequests.map((ele, index) => {
            if (ele.exam_pattern === type && ele.gender === sex) {
                return <tr key={index}>
                    <td>{ele.college_name}</td>
                    <td>{ele.plan}</td>
                    <td>{ele.exam_pattern}</td>
                    <td>{ele.exam_section}</td>
                    <td>{ele.date}</td>
                    <td><button type="button" className="btn btn-info" onClick={getStudent}>إحجز</button></td>
                </tr>
            }
        });
        return tBodyData;
    }
    function fillTableByCollegeAndPlanAndType(college, plan, type) {
        let tBodyData = examRequests.map((ele, index) => {
            if (ele.college_name === college && ele.plan === plan && ele.exam_pattern === type) {
                return <tr key={index}>
                    <td>{ele.college_name}</td>
                    <td>{ele.plan}</td>
                    <td>{ele.exam_pattern}</td>
                    <td>{ele.exam_section}</td>
                    <td>{ele.date}</td>
                    <td><button type="button" className="btn btn-info" onClick={getStudent}>إحجز</button></td>
                </tr>
            }
        });
        return tBodyData;
    }
    function fillTableByPlanAndTypeAndSex(plan, type, sex) {
        let tBodyData = examRequests.map((ele, index) => {
            if (ele.plan === plan && ele.exam_pattern === type && ele.gender === sex) {
                return <tr key={index}>
                    <td>{ele.college_name}</td>
                    <td>{ele.plan}</td>
                    <td>{ele.exam_pattern}</td>
                    <td>{ele.exam_section}</td>
                    <td>{ele.date}</td>
                    <td><button type="button" className="btn btn-info" onClick={getStudent}>إحجز</button></td>
                </tr>
            }
        });
        return tBodyData;
    }
    function fillTableByCollegeAndTypeAndSex(college, type, sex) {
        let tBodyData = examRequests.map((ele, index) => {
            if (ele.college_name === college && ele.exam_pattern === type && ele.gender === sex) {
                return <tr key={index}>
                    <td>{ele.college_name}</td>
                    <td>{ele.plan}</td>
                    <td>{ele.exam_pattern}</td>
                    <td>{ele.exam_section}</td>
                    <td>{ele.date}</td>
                    <td><button type="button" className="btn btn-info" onClick={getStudent}>إحجز</button></td>
                </tr>
            }
        });
        return tBodyData;
    }
    function fillTableByCollegeAndPlanAndSex(college, plan, sex) {
        let tBodyData = examRequests.map((ele, index) => {
            if (ele.college_name === college && ele.plan === plan && ele.gender === sex) {
                return <tr key={index}>
                    <td>{ele.college_name}</td>
                    <td>{ele.plan}</td>
                    <td>{ele.exam_pattern}</td>
                    <td>{ele.exam_section}</td>
                    <td>{ele.date}</td>
                    <td><button type="button" className="btn btn-info" onClick={getStudent}>إحجز</button></td>
                </tr>
            }
        });
        return tBodyData;
    }
    function fillTableAfterChoice() {
        selectedCollegeValue = document.getElementById('college').value;
        selectedExamPlanValue = document.getElementById('examPlan').value;
        selectedExamTypeValue = document.getElementById('examType').value;
        selectedSexTypeValue = document.getElementById('sexType').value;
        console.log(selectedCollegeValue, selectedExamPlanValue, selectedExamTypeValue, selectedSexTypeValue);
        let temp;
        // fill table by the 4 Filters .
        if (selectedCollegeValue !== "0" && selectedExamPlanValue !== "0" && selectedExamTypeValue !== "0" && selectedSexTypeValue !== "0") {
            temp = examRequests.map((ele, index) => {
                if (ele.examPlan === selectedExamPlanValue && ele.examType === selectedExamTypeValue
                    && ele.studentCollege === selectedCollegeValue && ele.studentSex === selectedSexTypeValue) {
                    return (<tr key={index}>
                        <td>{ele.college_name}</td>
                        <td>{ele.plan}</td>
                        <td>{ele.exam_pattern}</td>
                        <td>{ele.exam_section}</td>
                        <td>{ele.date}</td>
                        <td><button type="button" className="btn btn-info" onClick={getStudent}>إحجز</button></td>
                    </tr>)
                }
            });
            setTBody(temp);
        }
        // fill table by college filter only .
        else if (selectedCollegeValue !== "0" && selectedExamPlanValue === "0" && selectedExamTypeValue === "0" && selectedSexTypeValue === "0") {
            temp = fillTableByCollege(selectedCollegeValue);
            setTBody(temp);
        }
        // fill table by Plan filter only .
        else if (selectedCollegeValue === "0" && selectedExamPlanValue !== "0" && selectedExamTypeValue === "0" && selectedSexTypeValue === "0") {
            temp = fillTableByPlan(selectedExamPlanValue);
            setTBody(temp);
        }
        // fill table by Type filter only .
        else if (selectedCollegeValue === "0" && selectedExamPlanValue === "0" && selectedExamTypeValue !== "0" && selectedSexTypeValue === "0") {
            temp = fillTableByType(selectedExamTypeValue);
            setTBody(temp);
        }
        // fill table by gender filter only .
        else if (selectedCollegeValue === "0" && selectedExamPlanValue === "0" && selectedExamTypeValue === "0" && selectedSexTypeValue !== "0") {
            temp = fillTableBySex(selectedSexTypeValue);
            setTBody(temp);
        }
        // fill table by college & plan filters .
        else if (selectedCollegeValue !== "0" && selectedExamPlanValue !== "0" && selectedExamTypeValue === "0" && selectedSexTypeValue === "0") {
            temp = fillTableByCollegeAndPlan(selectedCollegeValue, selectedExamPlanValue);
            setTBody(temp);
        }
        // fill table by college & type filters .
        else if (selectedCollegeValue !== "0" && selectedExamPlanValue === "0" && selectedExamTypeValue !== "0" && selectedSexTypeValue === "0") {
            temp = fillTableByCollegeAndType(selectedCollegeValue, selectedExamTypeValue);
            setTBody(temp);
        }
        // fill table by college & gender filters .
        else if (selectedCollegeValue !== "0" && selectedExamPlanValue === "0" && selectedExamTypeValue === "0" && selectedSexTypeValue !== "0") {
            temp = fillTableByCollegeAndSex(selectedCollegeValue, selectedSexTypeValue);
            setTBody(temp);
        }
        // fill table by plan & type filters . 
        else if (selectedCollegeValue === "0" && selectedExamPlanValue !== "0" && selectedExamTypeValue !== "0" && selectedSexTypeValue === "0") {
            temp = fillTableByPlanAndType(selectedExamPlanValue, selectedExamTypeValue);
            setTBody(temp);
        }
        // fill table by plan & gender filters .
        else if (selectedCollegeValue === "0" && selectedExamPlanValue !== "0" && selectedExamTypeValue === "0" && selectedSexTypeValue !== "0") {
            temp = fillTableByPlanAndSex(selectedExamPlanValue, selectedSexTypeValue);
            setTBody(temp);
        }
        // fill table by type & gender filters .
        else if (selectedCollegeValue === "0" && selectedExamPlanValue === "0" && selectedExamTypeValue !== "0" && selectedSexTypeValue !== "0") {
            temp = fillTableByTypeAndSex(selectedExamTypeValue, selectedSexTypeValue);
            setTBody(temp);
        }
        // fill table by college & plan & type filters . 
        else if (selectedCollegeValue !== "0" && selectedExamPlanValue !== "0" && selectedExamTypeValue !== "0" && selectedSexTypeValue === "0") {
            temp = fillTableByCollegeAndPlanAndType(selectedCollegeValue, selectedExamPlanValue, selectedExamTypeValue);
            setTBody(temp);
        }
        // fill table by plan & type & gender filters .
        else if (selectedCollegeValue === "0" && selectedExamPlanValue !== "0" && selectedExamTypeValue !== "0" && selectedSexTypeValue !== "0") {
            temp = fillTableByPlanAndTypeAndSex(selectedExamPlanValue, selectedExamTypeValue, selectedSexTypeValue);
            setTBody(temp);
        }
        // fill table by college & type and gender filters .
        else if (selectedCollegeValue !== "0" && selectedExamPlanValue === "0" && selectedExamTypeValue !== "0" && selectedSexTypeValue !== "0") {
            temp = fillTableByCollegeAndTypeAndSex(selectedCollegeValue, selectedExamTypeValue, selectedSexTypeValue);
            setTBody(temp);
        }
        // fill table by college and plan and gender filters .
        else if (selectedCollegeValue !== "0" && selectedExamPlanValue !== "0" && selectedExamTypeValue === "0" && selectedSexTypeValue !== "0") {
            temp = fillTableByCollegeAndPlanAndSex(selectedCollegeValue, selectedExamPlanValue, selectedSexTypeValue);
            setTBody(temp);
        }
        // fill table without any filter .
        else {
            temp = examRequests.map((ele, index) => {
                return (<tr key={index}>
                    <td>{ele.college_name}</td>
                    <td>{ele.plan}</td>
                    <td>{ele.exam_pattern}</td>
                    <td>{ele.exam_section}</td>
                    <td>{ele.date}</td>
                    <td><button type="button" className="btn btn-info" onClick={getStudent}>إحجز</button></td>
                </tr>)
            })
            setTBody(temp);
        }
    }
    useEffect(() => {
        if (selectedCollegeValue === '0' && selectedExamPlanValue === '0' && selectedExamTypeValue === '0' && selectedSexTypeValue === '0') {
            return;
        }
        if (flag === !flag) {
            return;
        } else {
            //insertExamRequestRecord();
            // updateExamRequestsTable();
        }
        console.log('did update');
    }, [selectedCollegeValue, selectedExamPlanValue, selectedExamTypeValue, selectedSexTypeValue, flag])
    useEffect(() => {
        if (props == null) {
            return;
        }
        getExamRequests();
    }, [props]);
    async function getExamRequests() {
        let { data } = await axios.get('http://localhost/multaqa/api/Exam_requests_display.php');
        setExamRequests(data.Exam_Request_display);
        setFlag(!flag);
        console.log(examRequests);
    }
    async function insertExamRequestRecord() {
        let { data } = await axios.put('http://localhost/multaqa/api/put_supervisor_to_student_exam.php', examinatorRecord);
        console.log(data.insert_supervisor.message);
    }
    function getStudent(ele) {
        Swal.fire({
            title: 'معلومات الإمتحان',
            html: `
            <p class="mb-1">إسم الطالب : <br>${ele.Student_name} </p><br>
            <p class="mb-1">رقم الطالب : <br>${ele.phone}</p><br>
            `,
            confirmButtonText: 'تم التواصل ، إحجز',
            focusConfirm: false
        }).then((result) => {
            if (result.isConfirmed) {
                let examinatorRecordTemp = examinatorRecord;
                examinatorRecordTemp['serial_no'] = ele.serial_no;
                examinatorRecordTemp['student_id'] = ele.student_id;
                examinatorRecordTemp['supervisor_id'] = props.user;
                setExaminatorRecord(examinatorRecordTemp);
                console.log(examRequests);
                console.log(examinatorRecord);
                insertExamRequestRecord();
                setFlag(!flag);
                Swal.fire(
                    'تم الحجز!',
                    'تم نقل المعلومات إلى ملفك الشخصي',
                    'success'
                )
            }
        })
    }
    return (
        <>
            <section className={style.backimg + " overflow-hidden d-flex align-items-center"} >
                <div className="container  ">
                    <div className=" mb-3  align-items-center m-auto row">
                        <select id="college" onChange={fillTableAfterChoice}  className="select col-5 mt-3 me-3 p-3 overflow-hidden">
                            <option value={"0"}>الكلية</option>
                            <option value={"الهندسة"}>الهندسة</option>
                            <option value={"الطب"}>الطب</option>
                            <option value={"الإقتصاد"}>الإقتصاد</option>
                            <option value={"الآداب"}>الآداب</option>
                            <option value={"العلوم"}>العلوم</option>
                            <option value={"الفنون"}>الفنون</option>
                            <option value={"التربية"}>التربية</option>
                            <option value={"الشريعة"}>الشريعة</option>
                            <option value={"القانون"}>القانون</option>
                        </select>
                        <select id="examPlan" onChange={fillTableAfterChoice} className="col-5 select mt-3 me-3 p-3 overflow-hidden">
                            <option value={"0"}>الخطة</option>
                            <option value={"عادي"}>عادي</option>
                            <option value={"مكثف"}>مكثف</option>
                            <option value={"تثبيت"}>تثبيت</option>
                        </select>
                        <select id="examType" onChange={fillTableAfterChoice} className="col-5 select mt-3 me-3 p-3 overflow-hidden">
                            <option value={"0"}>النمط</option>
                            <option value={"1"}>1</option>
                            <option value={"5"}>5</option>
                            <option value={"10"}>10</option>
                            <option value={"15"}>15</option>
                            <option value={"30"}>30</option>
                        </select>
                        <select id="sexType" onChange={fillTableAfterChoice} className="col-5 select mt-3 me-3 p-3 overflow-hidden">
                            <option value={"0"}>الجنس</option>
                            <option value={"ذكر"}>طالب</option>
                            <option value={"أنثى"}>طالبة</option>
                        </select>
                    </div>
                    <table className="table   table-sm overflow-hidden ">
                        <thead className="table table-dark">
                            <tr>
                                <th>الكلية</th>
                                <th>الخطة</th>
                                <th>النمط</th>
                                <th>تجريبي/رسمي</th>
                                <th>التاريخ</th>
                                <th>إحجز</th>
                            </tr>
                        </thead>
                        <tbody id="table-body" className="table-group-divider table-success">
                            {
                                tBody != null ?
                                    tBody : examRequests!=null?examRequests.map((ele, index) => {
                                        return (<tr key={index}>
                                            <td>{ele.college_name}</td>
                                            <td>{ele.plan}</td>
                                            <td>{ele.exam_pattern}</td>
                                            <td>{ele.exam_section}</td>
                                            <td>{ele.date}</td>
                                            <td><button type="button" className="btn btn-info" onClick={getStudent}>إحجز</button></td>
                                        </tr>)
                                    }):null
                            }
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    )
}