import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';

import DatePicker from 'react-native-date-picker';

import InputField from '../components/InputField';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import RegistrationSVG from '../assets/images/misc/registration.svg';
import CustomButton from '../components/CustomButton';
import api from '../api';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = ({navigation}) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [dobLabel, setDobLabel] = useState('Tanggal Lahir');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [jenisKelamin, setJenisKelamin] = useState('');

  const validation = () => {
    if (fullName === '') {
      return Alert.alert('Error', 'Full Name harus diisi');
    } else if (email === '') {
      return Alert.alert('Error', 'Email harus diisi');
    } else if (password === '') {
      return Alert.alert('Error', 'Password harus diisi');
    } else if (confPassword === '') {
      return Alert.alert('Error', 'Conf Password harus diisi');
    } else if (confPassword !== password) {
      return Alert.alert('Error', 'Conf Password tidak sesuai');
    } else if (date === '' || date === null) {
      return Alert.alert('Error', 'Tanggal Lahir tidak sesuai');
    } else if (jenisKelamin === '' || jenisKelamin === null) {
      return Alert.alert('Error', 'Jenis Kelamin harus diisi');
    }
    return true;
  };

  const submitRegister = async () => {
    const isValid = validation();

    if (isValid) {
      const payload = {
        full_name: fullName,
        email,
        password,
        user_type: 2,
        tgl_lahir: date,
        jenis_kelamin: jenisKelamin,
        token: await AsyncStorage.getItem('fcmtoken'),
      };
      try {
        const {status, data} = await api.regisUser(payload);
        if (status) {
          Alert.alert('Success', 'Berhasil mendaftarkan akun');
          navigation.navigate('Login');
        } else {
          Alert.alert('Error', 'Gagal mendaftarkan akun');
        }
        return data;
      } catch (err) {
        Alert.alert('Error', 'Gagal mendaftarkan akun');
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
            marginBottom: 30,
          }}>
          Register
        </Text>

        <InputField
          label={'Full Name'}
          icon={
            <Ionicons
              name="person-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          onChangeFunc={text => setFullName(text)}
          value={fullName}
        />

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
          onChangeFunc={text => setPassword(text)}
          value={password}
        />

        <InputField
          label={'Confirm Password'}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          inputType="password"
          onChangeFunc={text => setConfPassword(text)}
          value={confPassword}
        />

        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: '#ccc',
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 30,
          }}>
          <Ionicons
            name="calendar-outline"
            size={20}
            color="#666"
            style={{marginRight: 5}}
          />
          <TouchableOpacity onPress={() => setOpen(true)}>
            <Text style={{color: '#666', marginLeft: 5, marginTop: 5}}>
              {dobLabel}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderBottomColor: '#ccc',
            borderBottomWidth: 1,
            marginBottom: 25,
          }}>
          <Text>Jenis Kelamin</Text>
          <Picker
            selectedValue={jenisKelamin}
            onValueChange={(itemValue, itemIndex) =>
              setJenisKelamin(itemValue)
            }>
            <Picker.Item label="--Pilih--" value="" />
            <Picker.Item label="Laki-Laki" value="Laki-Laki" />
            <Picker.Item label="Perempuan" value="Perempuan" />
          </Picker>
        </View>

        <DatePicker
          modal
          open={open}
          date={date}
          mode={'date'}
          // maximumDate={new Date('2005-01-01')}
          minimumDate={new Date('1940-01-01')}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
            setDobLabel(date.toDateString());
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        <CustomButton label={'Register'} onPress={() => submitRegister()} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>Already registered?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{color: '#04AD48', fontWeight: '700'}}> Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
