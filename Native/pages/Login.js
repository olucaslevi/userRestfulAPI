import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';
import { AuthContext } from './../Contexts/authContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const { Login } = useContext(AuthContext);

  const handleLogin = async () => {
    setLoading(true);
    if (!email) {
      setLoading(false);
      Alert.alert('Email is required.');
      return;
    }
    if (!password) {
      setLoading(false);
      Alert.alert('Password is required.');
      return;
    }

    try {
      await Login(email, password);
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', error.response.data.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image source={require('../assets/logo.png')} style={{ width: 200, height: 200 }} />
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email:</Text>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            placeholder="Your email"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password:</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholder="Your password"
          />
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          {loading ? (
            <Text style={styles.buttonText}>Loading...</Text>
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Recovery')}>
          <Text style={styles.registerText}>Forget password?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2b2b2b',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  content: {
    flex: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    padding: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
    marginVertical: 10,
    height: 50,
    alignContent: 'center',
    justifyContent: 'center',
    /* resize widht but background color is black */
    padding: 10,

  },
  inputLabel: {
    width: '30%',
    fontSize: 18,
  },
  input: {
    width: '70%',
    fontSize: 18,
  },
  loginButton: {
    backgroundColor: '#9624c4',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: 50,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 20,
    },
    registerText: {
    color: '#9624c4',
    fontSize: 18,
    marginTop: 20,
    },
});
