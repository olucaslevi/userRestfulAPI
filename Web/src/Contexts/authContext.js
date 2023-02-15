import React,{
    createContext,
    useState,
    useEffect
} from "react";

import axios from "axios";
const Context = createContext();

function AuthPhovider({children}){
    const [authenticated,setAuthenticated] = useState(false);
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token){
            setAuthenticated(true);
        }else{
            setAuthenticated(false);
        }
    },[]);

    async function handleLogin(email,password){
        try{
            const response = await axios.post("http://localhost:3000/user/login",{
                email,
                password
            });

            const { token } = response.data;
            if (token){
                localStorage.setItem('token',token);
                localStorage.setItem('user',JSON.stringify(response.data.user));
                setAuthenticated(true);
            }else{
                setAuthenticated(false);
                alert('Email ou senha incorretos');
            }

        }catch(err){
            console.log(err);
        }
        return { authenticated }};


    
    return(
        <Context.Provider value={{ authenticated, handleLogin }}>
            {children}
        </Context.Provider>
    )
}

export { Context, AuthPhovider };