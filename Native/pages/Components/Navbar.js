import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet } from 'react-native';

const Navbar = () => {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity style={styles.button}>
        <Icon name="home" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Icon name="search" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Icon name="settings" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Icon name="notifications" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 60,
    backgroundColor: '#333333',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
  },
});

export default Navbar;
