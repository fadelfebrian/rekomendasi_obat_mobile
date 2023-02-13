import React, {useContext} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import CustomDrawer from '../components/CustomDrawer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ProfileScreen from '../screens/ProfileScreen';
import SearchInformasiObatScreen from '../screens/SearchInformasiObatScreen';
import ReminderScreen from '../screens/ReminderScreen';
import TabNavigator from './TabNavigator';
import MenuDietScreen from '../screens/MenuDietScreen';
import JadwalObatScreen from '../screens/JadwalObatScreen';
import GraphProfileScreen from '../screens/GraphProfileScreen';
import Kuesioner from '../screens/Kuesioner';
import FAQ from '../screens/FaqScreen';
import {AuthContext} from '../context/AuthContext';

const Drawer = createDrawerNavigator();

const AppStack = () => {
  const {dataUser} = useContext(AuthContext);

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#04AD48',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          marginLeft: -25,
          fontFamily: 'Roboto-Medium',
          fontSize: 15,
        },
      }}>
      <Drawer.Screen
        name="Home"
        component={TabNavigator}
        options={{
          drawerIcon: ({color}) => (
            <AntDesign name="profile" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Update Profile"
        component={ProfileScreen}
        options={{
          drawerIcon: ({color}) => (
            <AntDesign name="smileo" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Graph Profile"
        component={GraphProfileScreen}
        options={{
          drawerIcon: ({color}) => (
            <AntDesign name="smileo" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Menu Diet"
        component={MenuDietScreen}
        options={{
          drawerIcon: ({color}) => (
            <AntDesign name="rest" size={22} color={color} />
          ),
        }}
      />

      {/* <Drawer.Screen
        name="Informasi Obat"
        component={SearchInformasiObatScreen}
        options={{
          drawerIcon: ({color}) => (
            <AntDesign name="info" size={22} color={color} />
          ),
        }}
      /> */}
      <Drawer.Screen
        name="Reminder"
        component={ReminderScreen}
        options={{
          drawerIcon: ({color}) => (
            <AntDesign name="notification" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Jadwal Minum Obat"
        component={JadwalObatScreen}
        options={{
          drawerIcon: ({color}) => (
            <AntDesign name="clockcircleo" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Kuesioner"
        component={Kuesioner}
        options={{
          drawerIcon: ({color}) => (
            <AntDesign name="save" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="FAQ"
        component={FAQ}
        options={{
          drawerIcon: ({color}) => (
            <AntDesign name="question" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default AppStack;
