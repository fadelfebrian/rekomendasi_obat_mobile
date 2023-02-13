import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import api from '../api';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [dataUser, setDataUser] = useState(null);
  const [detailUser, setDetailUser] = useState(null);
  const [state, setState] = useState({
    listRekomendasiObat: [],
    selectedObatDm: '',
    selectedKeluhan: '',
  });

  const fetchDetailUserById = async () => {
    try {
      const {data, status} = await api.fetchDetailUserById(dataUser?.id);
      setDetailUser(data);
      return status;
    } catch (err) {
      return err;
    }
  };

  const login = async payload => {
    try {
      setIsLoading(true);
      const {status, data} = await api.loginUser(payload);
      if (status) {
        Alert.alert('Success', 'Berhasil login');
        setIsLogin(true);
        setUserToken(data?.token);
        setDataUser(data?.user);
        await AsyncStorage.setItem('userToken', data?.token);
      } else {
        setUserToken(null);
        setDataUser(null);
        Alert.alert('Error', 'Gagal login');
      }
      setIsLoading(false);
      return data;
    } catch (err) {
      setIsLoading(false);
      setUserToken(null);
      setDataUser(null);
      Alert.alert('Error', 'Gagal login');
      return err;
    }
  };
  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    setDataUser(null);
    AsyncStorage.removeItem('userToken');
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userToken = await AsyncStorage.getItem('userToken');
      setUserToken(userToken);
      setIsLoading(false);
    } catch (err) {
      console.log('there is error', err);
      setIsLoading(false);
    }
  };

  const updateState = (key, value) => {
    const copy = {...state, [key]: value};
    setState(copy);
  };
  useEffect(() => {
    isLoggedIn();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        isLogin,
        isLoading,
        userToken,
        login,
        logout,
        dataUser,
        updateState,
        state,
        setIsLoading,
        setDataUser,
        fetchDetailUserById,
        detailUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
