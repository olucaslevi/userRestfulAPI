import axios from "axios";
import React,{
    useContext,
    useState,
    useEffect
} from "react";
import {useNavigate} from "react-router-dom"
import { Context } from "../Contexts/authContext";
import logotipo from "./logotipo.png";

import './Home.css';
export default function Login(){
    const navigate = useNavigate();
    const [email,setEmail] = useState('smd@gmail.com');
    const [password,setPassword] = useState('smdsmdsmd');
    const { authenticated, handleLogin } = useContext(Context);
    const [isLoading, setIsLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    
    useEffect(() => {
        //check if user is logged in
        if (authenticated){
            navigate('/dashboard');
        }
    },[authenticated]);

    const handleJoin = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
          await handleLogin(email, password);
        } catch (error) {
          setAlertMessage("Não foi possível entrar. Por favor, verifique seu email e senha e tente novamente.");
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 3000
            );
        }
        setIsLoading(false);
        };
    
    return(
    <div className="div-home-login">
            <form className="form-login" >
                <img
                    src={logotipo}
                ></img>
                <h1>Login</h1>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} /><br/>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} /><br/>
                <button type="button" onClick={handleJoin}>Join</button>
                <a href="/requestpassword">Forget my password</a>
                <a href="/register">Register</a>
            </form>

        </div>
    )
}