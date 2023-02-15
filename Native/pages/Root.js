import React,{useState,useEffect} from 'react';
import { View, StyleSheet, Button } from 'react-native';
import Login from './../pages/Login';
import deviceStorage from '../services/deviceStorage';
import { useNavigation } from '@react-navigation/native';

export default function Root() {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);

    const navigation = useNavigation();
    return(
        <View style={styles.container}>
            <Login/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'grey',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    TextInput: {
        height: 30,
        width:200,
        borderColor: 'gray',
        borderWidth: 1
    }
    
});
