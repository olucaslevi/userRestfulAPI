import React,{
    createContext,
    useState,
} from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import deviceStorage from '../services/deviceStorage';

export const AuthContext = createContext({});

export default function AuthProvider({children}) {
    const [user,setUser] = useState(null);
    const navigation = useNavigation();

    function Login(email,password){
        const data = {
            email,
            password
        }
        try{
            axios
                .post('http://192.168.0.12:3000/user/login', data)
                .then((res) => {
                    console.log(res.data);
                    //save in device storage
                    deviceStorage.saveItem('token', res.data.token);
                    deviceStorage.saveItem('user', res.data.user);
                    if (res.data.user) {
                        setUser(res.data.user);
                        navigation.navigate('Dashboard');
                    }
                }
                ).catch((err) => {
                    console.log(err);
                    alert('Erro', 'Email ou senha incorretos');
                }
                )
        }catch(err){
            console.log(err);

        }
    }
    return(
        <AuthContext.Provider value={{Login,user}}>
            {children}
        </AuthContext.Provider>
    )
}