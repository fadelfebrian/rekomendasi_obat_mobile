import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import * as RootNavigation from '../navigation/RootNavigation';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getTokenFCM();
  }
}

async function getTokenFCM() {
  let fcmtoken = await AsyncStorage.getItem('fcmtoken');
  console.log('saved token', fcmtoken);

  if (!fcmtoken) {
    try {
      let fcmtoken = await messaging().getToken();
      if (fcmtoken) {
        console.log('get token', fcmtoken);
        AsyncStorage.setItem('fcmtoken', fcmtoken);
      }
    } catch (err) {
      console.log('error in fcm token', err);
    }
  }
}

export const NotificationListener = () => {
  // Assume a message-notification contains a "type" property in the data payload of the screen to open
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
    RootNavigation.navigate('Home');
  });
  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
        // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
      }
      //   setLoading(false);
    });
  messaging().onMessage(async remoteMessage => {
    console.log('notification on foreground state ....', remoteMessage);
  });
};
