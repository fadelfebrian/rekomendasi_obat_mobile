import React, {useEffect} from 'react';
import {LogBox, BackHandler, Alert} from 'react-native';
import {AuthProvider} from './src/context/AuthContext';
import AppNav from './src/navigation/AppNav';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  NotificationListener,
  requestUserPermission,
} from './src/utils/firebase-util';
// LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const App = () => {
  useEffect(() => {
    requestUserPermission();
    NotificationListener();
    const backAction = () => {
      Alert.alert('Perhatian!', 'Apakah ingin keluar dari aplikasi ini?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'YES',
          onPress: async () => {
            AsyncStorage.removeItem('userToken');
            BackHandler.exitApp();
          },
        },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  });
  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
};

export default App;
