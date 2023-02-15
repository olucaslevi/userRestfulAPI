import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../Contexts/authContext';
import deviceStorage from '../services/deviceStorage';
import { Avatar } from 'react-native-elements';
import Navbar from '../pages/Components/Navbar.js';
import { Ionicons } from '@expo/vector-icons';

const colors = {
  background: '#FFFFFF',
  primary: '#9624c4',
  secondary: '#444444',
  accent: '#9624c4',
  lightGrey: '#DDDDDD',
};

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    if (!user?.photo) {
      user.photo = 'https://www.w3schools.com/w3images/avatar2.png';
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Avatar
          rounded
          source={{ uri: user.photo }}
          size={80}
          containerStyle={{ marginVertical: 20 }}
        />
        <Text style={styles.nameText}>{user.username}</Text>
        <Text style={styles.welcomeText}>Welcome!</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.text}>Welcome to your dashboard!</Text>
        <Button
          title="Logout"
          onPress={() => {
            deviceStorage.deleteItem('token');
            deviceStorage.deleteItem('user');
            navigation.navigate('Login');
          }}
          icon={{ name: 'logout', type: 'antdesign', color: colors.secondary }}
          buttonStyle={styles.logoutButton}
        />
      </View>
      <Navbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  welcomeText: {
    fontSize: 18,
    color: colors.secondary,
    marginVertical: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#9624c4',
    marginTop: 20,
    width: '80%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.lightGrey,
  },
});
