import React,{
    useContext,
    useState,
    useEffect
} from "react";
import { useNavigate } from "react-router-dom"
import { Context } from "./../../Contexts/authContext";
import axios from "axios";

//import css
import './Requestpassword.css';

export default function RequestPassword(){
    const navigate = useNavigate();
    const [email,setEmail] = useState('');
    const { authenticated, handleLogin } = useContext(Context);
    
    useEffect(() => {
        //check if user is logged in
        if (authenticated){
            navigate('/dashboard');
        }
    },[authenticated]);

    const handleRecovery = () => {
        try{
            axios.post("http://localhost:3000/user/recovery",{
                email
            }).then(response => {
                if (response.status === 200){
                    alert('Email enviado');
                }else{
                    alert('Erro ao enviar email');
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

    return(<div className="div-home-request">
        <form className="form-recovery">
            <h1>Recovery</h1>
            <p>Please tell us your register e-mail:</p><br/>
            <input type="email"
                placeholder="Email"
                onChange={e => setEmail(e.target.value)}
                /><br/>
            <button type="button" onClick={handleRecovery}>Recovery</button>
            <a href="/">Back</a>
        </form>
    </div>
    );
}
