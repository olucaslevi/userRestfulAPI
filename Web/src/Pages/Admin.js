import React,{
  useContext,
  useState,
  useEffect
} from "react";

import { Context } from "../Contexts/authContext";
import { useNavigate } from "react-router-dom";
import Navbar from "./Components/Navbar.js";
import axios from "axios";
//  import css
import "./Admin.css";

export default function Admin() {
  const [userList, setUserList] = useState([]);
  const [ edit , setEdit ] = useState(false);
  const [currentUser,setCurrentUser] = useState({
    username: "",
    email: "",
    photo: "",
  });
  const [editUser,setEditUser] = useState({});

  const navigate = useNavigate();
  const { authenticated } = useContext(Context);

  useEffect(() => {
    try{
      axios.get("http://192.168.0.12:3000/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((response) => {
        setUserList(response.data);
      });
    }catch(error){
      console.log(error);
    }
  }, [authenticated]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setCurrentUser(user);
    console.log(user);
  }, []);


  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };
  const handleEdit = async (id) => {
    let user = userList.find((user) => user.id === id);
    let data = {
      username: "teste"
    }
    try{
      await axios.put(`http://localhost:3000/user/${id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((response) => {
        //reload
        window.location.reload();
        console.log(response);
      }
      );
    }catch(error){
      console.log(error);
    }

  };
  const handleDelete = async (id) => {
    try{
      await axios.delete(`http://192.168.0.12:3000/user/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((response) => {
        //reload
        window.location.reload();
        console.log(response);
      });
    }catch(error){
      console.log(error);
    }
  }

  return (
    <div className="root-admin-div">
      <Navbar/>
      <h1>Admin page</h1>
      <p>Authenticated: {authenticated ? "true" : "false"}</p>
      <p>Name: {(JSON.parse(localStorage.getItem("user"))).username}</p>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => {
            return (
              <tr key={user.id}>
                {edit ? <td><input type="text" placeholder={user.username}/></td> : <td>{user.username}</td>}
                {user.id === currentUser.id ? <button>eh ESSE</button>:null}
                {edit ? <td><input type="email" placeholder={user.email}/></td> : <td>{user.email}</td>}
                {edit ? <td><input type="number" placeholder={user.role}/></td> : <td>{user.role}</td>}
                {edit? <button className="cancel-edit" onClick={()=>{setEdit(false)}}>X</button>:null}
                <button className={edit ? "save-button":"edit-button"}
                
                onClick={
                    ()=>{
                      handleEdit(user.id);
                    }
                  }
                  placeholder={user.id}
                >{edit ? "Save" : "Edit"}</button>
                <button
                  className="delete-button"
                  onClick={()=>{
                    handleDelete(user.id);
                  }
                  }
                >Delete</button>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button
        className="button"
        visible={authenticated}
        onClick={() => {
          navigate("/");
        }}
      >Return</button>
      <button
        className="button"
        onClick={() => {
          handleLogout();
        }}
      >Logout</button>

    </div>
  );
}
