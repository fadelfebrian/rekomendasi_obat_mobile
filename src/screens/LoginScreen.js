import React, {useState, useContext} from 'react';
import {SafeAreaView, View, Text, TouchableOpacity, Alert} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import LoginSVG from '../assets/images/misc/login.svg';

import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import {AuthContext} from '../context/AuthContext';

const LoginScreen = ({navigation}) => {
  const {login} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validation = () => {
    if (email === '') {
      return Alert.alert('Error', 'Email harus diisi');
    } else if (password === '') {
      return Alert.alert('Error', 'Password harus diisi');
    }
    return true;
  };

  const submitLogin = async () => {
    const isValid = validation();

    if (isValid) {
      const payload = {
        email,
        password,
        user_type: 2,
      };
      login(payload);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <View style={{paddingHorizontal: 25}}>
        <View style={{alignItems: 'center'}}>
          <LoginSVG height={250} width={250} />
        </View>

        <Text
          style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 30,
          }}>
          Login
        </Text>

        <InputField
          label={'Email ID'}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          keyboardType="email-address"
          onChangeFunc={text => setEmail(text)}
          value={email}
        />

        <InputField
          label={'Password'}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          inputType="password"
          // fieldButtonLabel={'Forgot?'}
          fieldButtonFunction={() => {}}
          onChangeFunc={text => setPassword(text)}
          value={password}
        />

        <CustomButton label={'Login'} onPress={() => submitLogin()} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            // marginBottom: 30,
          }}>
          <Text>Sudah Punya Akun ?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('LupaPassword')}>
            <Text style={{color: '#04AD48', fontWeight: '700'}}>
              {' '}
              Lupa Password
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>New to the app ?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={{color: '#04AD48', fontWeight: '700'}}> Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
