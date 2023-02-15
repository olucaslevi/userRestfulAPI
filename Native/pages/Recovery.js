import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

const Recovery = () => {
  const [email, setEmail] = useState('');

  const handleRecovery = async () => {
    try {
      const response = await axios.post('http://192.168.0.12:3000/user/recovery', { email });
      Alert.alert('Sucesso', 'Um token com um link de verificação será enviado para seu e-mail');
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>E-mail:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu e-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={handleRecovery}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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

export default Recovery;
  