import React, {useState, useContext, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import InputField from '../InputField';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomButton from '../CustomButton';
import api from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-date-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

const FormReminder = ({navigation, route}) => {
  const {itemId} = route.params;
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [jmlObat, setJmlObat] = useState('');
  const [dataReminder, setDataReminder] = useState(null);
  const [dobLabel, setDobLabel] = useState('Tanggal Minum');
  const [timeLabel, setTimeLabel] = useState('Jam Minum');
  const [open, setOpen] = useState(false);
  const [openTime, setOpenTime] = useState(false);

  const fetchReminderObatById = async () => {
    try {
      const {data, status} = await api.fetchReminderObatById(itemId);
      setJmlObat(data?.jml_obat.toString());
      setDataReminder(data);
      return status;
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    fetchReminderObatById();
    const willFocusSubscription = navigation.addListener('focus', () => {
      fetchReminderObatById();
    });
    return willFocusSubscription;
  }, []);

  const validation = () => {
    if (jmlObat === '') {
      return Alert.alert('Error', 'Jumlah Obat harus diisi');
    }

    return true;
  };

  const submitReminder = async () => {
    const isValid = validation();
    if (isValid) {
      const payload = {
        tgl_mulai: date,
        jam: time,
        jml_obat: jmlObat,
        token: await AsyncStorage.getItem('fcmtoken'),
      };
      console.log('payload', payload);
      try {
        const {status, data} = await api.putReminderObat(payload, itemId);
        if (status) {
          Alert.alert('Success', 'Berhasil update data');
          navigation.navigate('Jadwal Minum Obat');
          resetState();
        } else {
          Alert.alert('Error', 'Gagal update data');
        }
        return data;
      } catch (err) {
        Alert.alert('Error', 'Gagal update data');
        return err;
      }
    }
  };

  const resetState = () => {
    setTime(new Date());
    setDate(new Date());
    setJmlObat('');
    setDobLabel('Tanggal Pertama Minum');
    setTimeLabel('Jam Pertama Minum');
  };

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center', padding: 20}}>
      <ScrollView>
        <View>
          <Text
            style={{
              fontFamily: 'Roboto-Medium',
              fontSize: 15,
              fontWeight: '500',
              color: '#333',
              marginBottom: 30,
            }}>
            Form Edit Data Pengingat Obat
          </Text>

          {dataReminder?.jenisObat !== '' && (
            <View>
              <InputField
                label={`Jumlah Obat`}
                icon={
                  <AntDesign
                    name="medicinebox"
                    size={20}
                    color="#666"
                    style={{marginRight: 5}}
                  />
                }
                keyboardType="number-pad"
                value={jmlObat}
                onChangeFunc={text => setJmlObat(text)}
              />
            </View>
          )}
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
          <View>
            <DatePicker
              modal
              open={open}
              date={date}
              mode={'date'}
              //   maximumDate={new Date()}
              // minimumDate={new Date()}
              onConfirm={date => {
                setOpen(false);
                setDate(date);
                setDobLabel(date.toDateString());
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              borderBottomColor: '#ccc',
              borderBottomWidth: 1,
              paddingBottom: 8,
            }}>
            <Ionicons
              name="alarm-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
            <TouchableOpacity onPress={() => setOpenTime(true)}>
              <Text style={{color: '#666', marginLeft: 5, marginTop: 5}}>
                {timeLabel}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginBottom: 30,
            }}>
            <Text style={{color: '#666', marginLeft: 5, marginTop: 5}}>
              *Disarankan dimulai dari jam 6 pagi
            </Text>
          </View>
          <View>
            <DatePicker
              modal
              open={openTime}
              date={date}
              // is24hourSource
              is24hourSource="locale"
              locale="id-ID"
              mode={'time'}
              format="YYYY-MM-DD HH:mm a"
              // maximumDate={new Date('2005-01-01')}
              onConfirm={date => {
                setOpenTime(false);
                setTime(`${date.getHours()}:${date.getMinutes()}`);
                setTimeLabel(`${date.getHours()} ${date.getMinutes()}`);
              }}
              onCancel={() => {
                setOpenTime(false);
              }}
            />
          </View>
          <CustomButton label={'Simpan'} onPress={() => submitReminder()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FormReminder;
