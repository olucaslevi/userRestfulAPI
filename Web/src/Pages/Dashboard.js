import React,{
  useContext,
  useEffect
} from "react";

import { Context } from "../Contexts/authContext";
import { useNavigate } from "react-router-dom";
import Navbar from "./../Pages/Components/Navbar";

//import css
import './Dashboard.css';
export default function Dashboard() {

  const navigate = useNavigate();
  const { authenticated } = useContext(Context);


  useEffect(() => {
    if (!authenticated) {
      navigate("/");
    }
  }, [authenticated]);


  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="root-div">
      <Navbar/>
      <div
        className="user-profile"
        >
        <img src="https://coloradotechnology.org/wp-content/uploads/2019/05/blank-profile-picture-girl-4.jpg" alt="Avatar"></img>
      </div>
            <div
        className="user-info"
      >
        <h2> Welcome, {(JSON.parse(localStorage.getItem("user"))).username}</h2>
        <h3> Description: </h3> <p>Your bios here...</p>
      </div>

      {/* <button
        onClick={() => {
          navigate("/admin");
        }}
      >Admin</button> */}

      {/* <p>Email: {(JSON.parse(localStorage.getItem("user"))).email}</p>
      <p>Token: {localStorage.getItem("token")}</p> */}
      <button
        className="logout-btn"
        onClick={() => {
          handleLogout();
        }}
      >Logout</button>

    </div>
  );
}
