import React, { useState } from 'react'
import style from "./Exams.module.css";
import axios from 'axios';
export default function Exams() {
    const onePratString = <>
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
    const fivePratString = <>
        <option value={'1 - 5'}>1-5</option>
        <option value={'6 - 10'}>6-10</option>
        <option value={'11 - 15'}>11-15</option>
        <option value={'16 - 20'}>16-20</option>
        <option value={'21 - 25'}>21-25</option>
        <option value={'26 - 30'}>26-30</option>
    </>;
    const tenPratString = <>
        <option value={1 - 10}>1-10</option>
        <option value={11 - 20}>11-20</option>
        <option value={21 - 30}>21-30</option>
    </>;
    const fifteenPratString = <>
        <option value={1 - 15}>1-15</option>
        <option value={16 - 30}>16-30</option>
    </>;
    const thirtyPratString = <>
        <option value={1 - 30}>1-30</option>
    </>;
    let [selectOptions, setSelectOptions] = useState();
    let [errorMessage,setErrorMessage]=useState(null);
    function setOptions(Event) {
        console.log(Event.target.value)
        var onePart = document.getElementById("onePart").checked;
        var fivePart = document.getElementById("fiveParts").checked;
        var tenPart = document.getElementById("tenParts").checked;
        var fifteenPart = document.getElementById("fifteenParts").checked;
        let userTemp = examRequestRecord;
        userTemp[Event.target.name] = Event.target.value;
        console.log(userTemp);
        setExamRequestRecord(userTemp);
        if (Event.target.value==='1') {
            setSelectOptions(onePratString);
        } else if (Event.target.value==='5') {
            setSelectOptions(fivePratString);
        } else if (Event.target.value==='10') {
            setSelectOptions(tenPratString);
        } else if (Event.target.value==='15') {
            setSelectOptions(fifteenPratString);
        } else {
            setSelectOptions(thirtyPratString);
        }
    }
    function setPlan(Event) {
        var normalPlan = document.getElementById("normalPlan").checked;
        var confirmePlan = document.getElementById("confirmePlan").checked;
        if (normalPlan === true) {
            document.getElementById("onePart").removeAttribute("disabled");
            document.getElementById("fiveParts").removeAttribute("disabled");
            document.getElementById("tenPartDiv").style.display = "none";
            document.getElementById("fifteenPartDiv").style.display = "none";
            document.getElementById("thirtyPartDiv").style.display = "none";
        } else if (confirmePlan === true) {
            document.getElementById("onePart").removeAttribute("disabled");
            document.getElementById("fiveParts").removeAttribute("disabled");
            document.getElementById("tenParts").removeAttribute("disabled");
            document.getElementById("fifteenParts").removeAttribute("disabled");
            document.getElementById("thirtyParts").removeAttribute("disabled");
            document.getElementById("fiveParts").removeAttribute("disabled");
            document.getElementById("tenPartDiv").style.display = "inline-block";
            document.getElementById("fifteenPartDiv").style.display = "inline-block";
            document.getElementById("thirtyPartDiv").style.display = "inline-block";

        } else {
            document.getElementById("onePart").removeAttribute("disabled");
            document.getElementById("fiveParts").removeAttribute("disabled");
            document.getElementById("tenPartDiv").style.display = "none";
            document.getElementById("fifteenPartDiv").style.display = "none";
            document.getElementById("thirtyPartDiv").style.display = "none";
        }
    }
    let [examRequestRecord,setExamRequestRecord]=useState({
        Student_id:'',
        exam_section:'',
        exam_pattern:'',
        parts:'',
        date:'',
        time:'',
    })
    async function submitHandling(Event) {
        let { data } = await axios.post('http://localhost/multaqa/api/Request_to_submit_an_exam.php',examRequestRecord);
            console.log(data.request_to_submit_exam.message);
            if (data.request_to_submit_exam.message === 'success'){

            }else{
                setErrorMessage(data.request_to_submit_exam.message);
            }
    }
    function getUserData(Event) {
        let userTemp = examRequestRecord;
        userTemp[Event.target.name] = Event.target.value;
        console.log(userTemp);
        setExamRequestRecord(userTemp);
    }
    function setParts(Event) {
        console.log(Event.target.value)
        let userTemp = examRequestRecord;
        userTemp[Event.target.name] = Event.target.value;
        console.log(userTemp);
        setExamRequestRecord(userTemp);
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
                                    <div className="col-xl-6 ">
                                        <div className="card-body p-md-5 text-black">
                                            <h3 className="mb-5 text-uppercase">تقدم للإمتحان</h3>
                                            {
                                                errorMessage!=null?<div className='alert alert-danger'>{errorMessage}</div>:null
                                            }
                                            <div className="row">
                                                <div className="col-md-12 mb-4">
                                                    <div className="form-outline">
                                                        <input type="text"  onChange={getUserData} name='Student_id' id="superVisorName" className="form-control form-control-lg" />
                                                        <label className="form-label" htmlFor="superVisorName">رقم الطالب الجامعي</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-md-flex justify-content-start align-items-center mb-4 py-2 row ">
                                                <div className="col-md-4 mb-4 m-auto">
                                                    <h6 className="mb-0 me-4">نمط الإمتحان : </h6>
                                                    <div id="onePartDiv" className="form-check form-check-inline mb-0 me-4 col-12 m-auto">
                                                        <input className="form-check-input" type="radio" onClick={setOptions} name="exam_pattern" id="onePart" defaultValue="1" />
                                                        <label className="form-check-label" htmlFor="onePart">1</label>
                                                    </div>
                                                    <div id="fivePartDiv" className="form-check form-check-inline mb-0 me-4 col-12 m-auto">
                                                        <input className="form-check-input" type="radio" onClick={setOptions} name="exam_pattern" id="fiveParts" defaultValue="5" />
                                                        <label className="form-check-label" htmlFor="fiveParts">5</label>
                                                    </div>
                                                    <div id="tenPartDiv" className="form-check form-check-inline mb-0 col-12 m-auto">
                                                        <input onClick={setOptions} className="form-check-input" type="radio" name="exam_pattern" id="tenParts" defaultValue="10" />
                                                        <label className="form-check-label" htmlFor="tenParts">10</label>
                                                    </div>
                                                    <div id="fifteenPartDiv" className="form-check form-check-inline mb-0  col-12 m-auto">
                                                        <input onClick={setOptions} className="form-check-input" type="radio" name="exam_pattern" id="fifteenParts" defaultValue="15" />
                                                        <label className="form-check-label" htmlFor="fifteenParts">15</label>
                                                    </div>
                                                    <div id="thirtyPartDiv" className="form-check form-check-inline mb-0  col-12 m-auto">
                                                        <input className="form-check-input" type="radio" name="exam_pattern" onClick={setOptions} id="thirtyParts" defaultValue="30" />
                                                        <label className="form-check-label" htmlFor="thirtyParts">30</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row overflow-hidden">
                                                <div className="col-md-12 mb-4 m-auto">
                                                    
                                                    <input className="form-check-input me-2" type="radio" name="exam_section" onClick={getUserData} id="truly" defaultValue="رسمي" />
                                                    <label className="form-check-label me-5" htmlFor="truly">رسمي</label>
                                                    <input className="form-check-input me-2" type="radio" name="exam_section" onClick={getUserData} id="testing" defaultValue="تجريبي" />
                                                    <label className="form-check-label me-5" htmlFor="testing">تجريبي</label>
                                                </div>
                                                <div className="col-md-12 mb-4 m-auto">
                                                    <select id="parts" name='parts' onChange={setParts} className="me-5 select">
                                                        {selectOptions}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-outline mb-4 ">
                                                <input type="date" id="daySelect" name='date' onChange={setParts} className="form-control form-control-lg" />
                                                <label className="form-label" htmlFor="daySelect">اليوم المناسب</label>
                                            </div>
                                            <div className="form-outline mb-4">
                                                <input type="time" id="timeSelect" name='time' onChange={setParts} className="form-control form-control-lg" />
                                                <label className="form-label" htmlFor="timeSelect">الموعد المناسب</label>
                                            </div>
                                            <div className="d-flex justify-content-end pt-3">
                                                <button type="button" className="btn btn-warning btn-lg ms-2" onClick={submitHandling}>إرفع إسمي</button>
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