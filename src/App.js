import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./component/navbar/Navbar";
import Login from "./component/login_section/Login";
import Footer from "./component/footer/Footer";
import Home from "./component/home/Home";
import { useEffect, useState } from "react";
import ProtectedRoute from "./component/protect/ProtectedRoute";

function App() {
  let navigate = useNavigate();
  let [userData, setUserData] = useState(null);
  function getUserData() {
    let decode = localStorage.getItem("userToken");
    setUserData(decode);
  }

  useEffect(() => {
    if (localStorage.getItem("userToken")) getUserData();
  }, []);

  function logout() {
    localStorage.removeItem("userToken");
    setUserData(null);
    navigate("/login");
  }
  return (
    <div className="App">
      <Navbar user={userData} logout={logout} />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
        </Route>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="login"
          element={<Login getUserData={getUserData} />}
        ></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
