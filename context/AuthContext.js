import React, { createContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import axios from 'axios';
import { API_BASE_URL } from '../constants/config';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

export const AuthContext = createContext();

// Configure how notifications are handled when app is in foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const token = await SecureStore.getItemAsync('userToken');
        const userDataStr = await SecureStore.getItemAsync('userData');
        if (token && userDataStr) {
          setUserToken(token);
          setUserData(JSON.parse(userDataStr));
          setIsLoggedIn(true);
        }
      } catch (e) {
        console.error('Restoring token failed:', e);
      }
      setIsLoading(false);
    };

    bootstrapAsync();
  }, []);

  const registerForPushNotificationsAsync = async (user) => {
    let token;

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        console.log('Failed to get push token for push notification!');
        return;
      }
      try {
        const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId ?? '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d';
        const pushTokenData = await Notifications.getExpoPushTokenAsync({ projectId });
        token = String(pushTokenData.data);
        console.log("Expo Push Token:", token);
        
        // Save token to our DB via PHP backend
        await axios.post('http://172.20.10.2/ois_api/save_token.php', {
          username: user.username || 'suheyp.elahmed',
          token: token
        });
        console.log("Token saved to DB successfully.");

      } catch (error) {
        console.error("Push token error:", error);
      }
    } else {
      console.log('Must use physical device for Push Notifications');
    }
  };

  const login = async (token, user) => {
    try {
      const safeToken = String(token || '');
      await SecureStore.setItemAsync('userToken', safeToken);
      
      const safeUser = user || { KulAdSoyad: 'Öğrenci' };
      await SecureStore.setItemAsync('userData', JSON.stringify(safeUser));
      
      setUserToken(safeToken);
      setUserData(safeUser);
      setIsLoggedIn(true);

      // Register for push notifications without blocking the login flow
      registerForPushNotificationsAsync(safeUser).catch(err => {
        console.error('Push token registration error:', err);
      });

    } catch (e) {
      console.error('Error storing login data:', e);
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync('userToken');
      await SecureStore.deleteItemAsync('userData');
      setUserToken(null);
      setUserData(null);
      setIsLoggedIn(false);
    } catch (e) {
      console.error('Error logging out:', e);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userToken, userData, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
