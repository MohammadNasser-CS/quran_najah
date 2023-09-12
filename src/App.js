import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./component/navbar/Navbar";
import Login from "./component/login_section/Login";
import Footer from "./component/footer/Footer";
import Home from "./component/home/Home";
import Profile from "./component/student/profile/Profile";

import { useEffect, useState } from "react";
import ProtectedRoute from "./component/protect/ProtectedRoute";
import Exams from "./component/student/exams/Exams";
import Exam_Requests from "./component/supervisor/exam_request/Exam_Requests";
import Report from "./component/supervisor/report/Report";
import CollegeAdminHome from "./component/college_admin/college_admin_Home/CollegeAdminHome";
import SuperVisorUpgrade from "./component/college_admin/student_promotion_supervisor/SuperVisorUpgrade";
import ChangeStudentSupervisor from "./component/college_admin/change_student_supervisor/ChangeStudentSupervisor";
import DailyReportShow from "./component/college_admin/daily_report_show/DailyReportShow";
import AddStudent from "./component/admin_folder/add_student/AddStudent";
import MoltaqaStatus from "./component/doctor_folder/moltaqa_status/MoltaqaStatus";
import UpdateStudentCollege from "./component/college_admin/update_student_college/UpdateStudentCollege";
import ChangePasswordPage from "./component/change_password_page/ChangePasswordPage";
function App() {
  let navigate = useNavigate();
  let [userPosition, setUserPosition] = useState(null);
  let [userData, setUserData] = useState(null);

  function getUserData() {
    let decode = localStorage.getItem("userToken");
    setUserData(decode);
  }
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      getUserData();
      getUserPosition();
    }
  }, []);
  function logout() {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userPosition");
    setUserData(null);
    setUserPosition(null);
    navigate("/login");
  }

  function getUserPosition() {
    let position = localStorage.getItem("userPosition");
    setUserPosition(position);
  }
  return (
    <div className="App">
      <Navbar user={userData} userPosition={userPosition} logout={logout} />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route
            path="/profile"
            element={<Profile user={userData} userPosition={userPosition} />}
          ></Route>
          <Route path="/exams" element={<Exams />}></Route>
          <Route
            path="/exam_requests"
            element={<Exam_Requests user={userData} />}
          />
          <Route path="/report" element={<Report user={userData} />} />
        </Route>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />}></Route>
        <Route
          path="login"
          element={
            <Login
              getUserData={getUserData}
              getUserPosition={getUserPosition}
            />
          }
        />
        <Route path="/college_admin" element={<CollegeAdminHome />} />
        <Route path="/supervisor_upgrade" element={<SuperVisorUpgrade />} />
        <Route
          path="/change_student_supervisor"
          element={<ChangeStudentSupervisor />}
        />
        <Route path="/reports_page_show" element={<DailyReportShow />} />
        <Route path="/upate_college_page" element={<UpdateStudentCollege />} />
        <Route path="/change_password" element={<ChangePasswordPage user={userData} userPosition={userPosition}/>} />
        <Route path="/add_student" element={<AddStudent />} />
        <Route path="/moltaqa_status" element={<MoltaqaStatus />} />
      </Routes>
      <Footer></Footer>
    </div>
  );
}
export default App;
