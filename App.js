import React, {useEffect} from 'react';
import {LogBox} from 'react-native';
import {AuthProvider} from './src/context/AuthContext';
import AppNav from './src/navigation/AppNav';
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
  });
  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
};

export default App;
