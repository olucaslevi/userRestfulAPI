
import { AsyncStorage } from 'react-native';

const deviceStorage = {
    async saveItem(key, value) {
      const item = { key:key,value:value, timestamp: new Date().getTime()}
      const jwt = JSON.stringify(item);
      try {
        await AsyncStorage.setItem(jwt);
      } catch (error) {
        console.log('AsyncStorage Error: ' + error.message);
      }
    },
    async loadJWT(key) {
      try {
        const value = await AsyncStorage.getItem(key);
        const item = JSON.stringify(value);
        if (item !== null) {
          const now = new Date();
          if (now.getTime() > item.timestamp) {
            await AsyncStorage.removeItem(key);
            return null;
          }
          return item.value;
        }
        return null;
      } catch (error) {
        console.log('AsyncStorage Error: ' + error.message);
      }
    },
    async loadUser(key) {
      try {
        const value = await AsyncStorage.loadJWT(key);
        const item = JSON.stringify(value);
        if (item !== null) {
          const now = new Date();
          if (now.getTime() > item.timestamp) {
            await AsyncStorage.removeItem(key);
            return null;
          }
          return item.valueOf;
        }
        return null;
      } catch (error) {
        console.log('AsyncStorage Error: ' + error.message);
      }
    },
    async deleteItem(key) {
      try {
        await AsyncStorage.removeItem(key);
        return true;
      }
      catch(exception) {
        return false;
      }
    }
  }
  

export default deviceStorage;