import React,{
    useContext,
    useState,
    useEffect
} from "react";
import {useNavigate} from "react-router-dom"
import { Context } from "./../../Contexts/authContext";
import axios from "axios";

import validator from "validator";

//import css
import './Register.css';

export default function Register(){
    const navigate = useNavigate();
    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(false);
    const { authenticated, handleLogin } = useContext(Context);
    
    useEffect(() => {
        //check if user is logged in
        if (authenticated){
            navigate('/dashboard');
        }
    },[authenticated]);

    const handleRegister = () => {
        console.log(username,email,password)
        //if status is 200, redirect to login
        if (passwordsMatch && validator.isEmail(email)){
            try{
                axios.post("http://192.168.0.12:3000/user/create",{
                    username,
                    email,
                    password
                }).then(response => {
                    if (response.status === 200){
                        alert('Registered');
                        navigate('/');
                    }else{
                        alert('Error');
                    }
                }
                ).catch(err => {
                    console.log(err);
                }
                )
            }
            catch(err){
                console.log(err);
            }
        }
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        if (event.target.value === confirmPassword) {
            setPasswordsMatch(true);
        } else {
            setPasswordsMatch(false);
        }
    }

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
        if (event.target.value === password) {
            setPasswordsMatch(true);
        } else {
            setPasswordsMatch(false);
        }
    }

    return(
        <div className="div-register">
            <form className="form-register">
                <h1>Register</h1>
                <input 
                    type="text" 
                    placeholder="Name"
                    onChange={e => setUsername(e.target.value)}
                /><br/>
                <input 
                    type="email" 
                    placeholder="Email"
                    onChange={e => setEmail(e.target.value)}
                /><br/>
                {validator.isEmail(email) ? null : <p className="error-text" class="warning-message">Invalid email address</p>}
                <input 
                    type="password" 
                    placeholder="Password"
                    onChange={handlePasswordChange}
                /><br/>
                <input 
                    type="password" 
                    placeholder="Confirm Password"
                    onChange={handleConfirmPasswordChange}
                />
                {passwordsMatch ? <p className="match-text">Passwords match</p> : <p class="warning-message" className="error-text">Passwords do not match</p>}
                <button
                    type="button"
                    onClick={handleRegister}
                >
                    Register
                </button>
                <a href="/">Back</a>
            </form>
        </div>
    );
}
