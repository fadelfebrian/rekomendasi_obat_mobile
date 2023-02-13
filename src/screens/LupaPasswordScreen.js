import React, {useState} from 'react';
import {SafeAreaView, ScrollView, View, Text, Alert} from 'react-native';

import InputField from '../components/InputField';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import RegistrationSVG from '../assets/images/misc/registration.svg';
import CustomButton from '../components/CustomButton';
import api from '../api';

const RegisterScreen = ({navigation}) => {
  const [email, setEmail] = useState('');

  const validation = () => {
    if (email === '') {
      return Alert.alert('Error', 'Email harus diisi');
    }
    return true;
  };

  const submitRegister = async () => {
    const isValid = validation();

    if (isValid) {
      const payload = {
        email,
      };
      try {
        const {status, data} = await api.forgetPassword(payload);
        if (status) {
          Alert.alert('Success', 'Berhasil reset password');
          navigation.navigate('Login');
        } else {
          Alert.alert('Error', 'Gagal reset password');
        }
        return data;
      } catch (err) {
        Alert.alert('Error', 'Gagal reset password');
        return err;
      }
    }
  };

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: 25}}>
        <View style={{alignItems: 'center'}}>
          <RegistrationSVG height={250} width={250} />
        </View>

        <Text
          style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            // marginBottom: 10,
          }}>
          Lupa Password
        </Text>
        <Text
          style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 10,
            fontWeight: '500',
            color: 'red',
            marginBottom: 30,
          }}>
          *Password akan tereset dengan format tanggal lahir YYYYMMDD yang
          terdaftar
        </Text>

        <InputField
          label={'Masukkan Email Terdaftar'}
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

        <CustomButton label={'Submit'} onPress={() => submitRegister()} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
