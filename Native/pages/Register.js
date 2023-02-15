import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleRegister = () => {
    // Lógica para lidar com o registro do usuário
  };

  const handlePasswordMatch = (passwordValue, confirmPasswordValue) => {
    setPasswordMatch(passwordValue === confirmPasswordValue);
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Register</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={[styles.input, passwordMatch ? {} : styles.inputError]}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(passwordValue) => {
            setPassword(passwordValue);
            handlePasswordMatch(passwordValue, confirmPassword);
          }}
        />
        <TextInput
          style={[styles.input, passwordMatch ? {} : styles.inputError]}
          placeholder="Confirm Password"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={(confirmPasswordValue) => {
            setConfirmPassword(confirmPasswordValue);
            handlePasswordMatch(password, confirmPasswordValue);
          }}
        />
        {!passwordMatch && <Text style={styles.errorMessage}>Passwords do not match</Text>}
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
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
  formContainer: {
    width: '80%',
    backgroundColor: '#F9F9F9',
    borderColor: '#E5E5E5',
    borderWidth: 1,
    borderRadius: 5,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    color: '#3F3D56',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    fontSize: 16,
    padding: 10,
    marginBottom: 20,
  },
  inputError: {
    borderColor: 'red',
    borderWidth: 1,
  },
  errorMessage: {
    color: 'red',
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#9624c4',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});
