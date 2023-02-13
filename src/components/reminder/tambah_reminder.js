import React, {useState, useContext} from 'react';
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import CustomButton from '../CustomButton';
import {AuthContext} from '../../context/AuthContext';
import api from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FormReminder = ({navigation}) => {
  const {dataUser} = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [openTime, setOpenTime] = useState(false);
  const [dobLabel, setDobLabel] = useState('Tanggal Pertama Minum');
  const [timeLabel, setTimeLabel] = useState('Jam Pertama Minum');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [namaObat, setNamaObat] = useState('');
  const [jmlObat, setJmlObat] = useState('');
  const [aturanPakai, setAturanPakai] = useState('');
  const [jenisObat, setJenisObat] = useState('');
  const [totalSekaliPakai, setTotalSekaliPakai] = useState('');

  const validation = () => {
    if (namaObat === '') {
      return Alert.alert('Error', 'Nama Obat harus diisi');
    } else if (jenisObat === '') {
      return Alert.alert('Error', 'Type Obat harus diisi');
    } else if (jmlObat === '') {
      return Alert.alert('Error', 'Jumlah Obat harus diisi');
    } else if (aturanPakai === '') {
      return Alert.alert('Error', 'Aturan/Jumlah sekali pakai harus diisi');
    } else if (totalSekaliPakai === '' && jenisObat === '2') {
      return Alert.alert('Error', 'Total sekali pakai harus diisi');
    }

    return true;
  };

  const submitReminder = async () => {
    const isValid = validation();
    if (isValid) {
      const payload = {
        tgl_mulai: date,
        jam: time,
        nama_obat: namaObat,
        jml_obat: jmlObat,
        aturan_pakai: aturanPakai,
        id_user: dataUser?.id,
        jenis_obat: jenisObat,
        aturan_pakai_inject: totalSekaliPakai,
        token: await AsyncStorage.getItem('fcmtoken'),
      };
      try {
        const {status, data} = await api.createReminderObat(payload);
        if (status) {
          Alert.alert('Success', 'Berhasil menambahkan data');
          navigation.navigate('Jadwal Minum Obat');
          resetState();
        } else {
          Alert.alert('Error', 'Gagal menambahkan data');
        }
        return data;
      } catch (err) {
        Alert.alert('Error', 'Gagal menambahkan data');
        return err;
      }
    }
  };

  const resetState = () => {
    setTime(new Date());
    setDate(new Date());
    setNamaObat('');
    setAturanPakai('');
    setJmlObat('');
    setDobLabel('Tanggal Pertama Minum');
    setTimeLabel('Jam Pertama Minum');
    setJenisObat('');
    setTotalSekaliPakai('');
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
            Form Tambah Data Pengingat Obat
          </Text>
          <View>
            <InputField
              label={'Nama Obat yang digunakan'}
              icon={
                <AntDesign
                  name="question"
                  size={20}
                  color="#666"
                  style={{marginRight: 5}}
                />
              }
              keyboardType="email-address"
              value={namaObat}
              onChangeFunc={text => setNamaObat(text)}
            />
          </View>
          <View
            style={{
              borderBottomColor: '#ccc',
              borderBottomWidth: 1,
              marginBottom: 10,
            }}>
            <Text>Type Obat</Text>
            <Picker
              selectedValue={jenisObat}
              onValueChange={(itemValue, itemIndex) => setJenisObat(itemValue)}>
              <Picker.Item label="--Pilih--" value="" />
              <Picker.Item label="Oral" value="1" />
              <Picker.Item label="Inject" value="2" />
            </Picker>
          </View>
          {jenisObat !== '' && (
            <View>
              <InputField
                label={`Jumlah Obat ${
                  jenisObat === '1' ? '(Unit)' : '(Total Mili)'
                }`}
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
          {jenisObat === '2' && (
            <View>
              <InputField
                label={`Total Sekali Pakai`}
                icon={
                  <AntDesign
                    name="star"
                    size={20}
                    color="#666"
                    style={{marginRight: 5}}
                  />
                }
                keyboardType="number-pad"
                value={totalSekaliPakai}
                onChangeFunc={text => setTotalSekaliPakai(text)}
              />
            </View>
          )}
          <View
            style={{
              borderBottomColor: '#ccc',
              borderBottomWidth: 1,
              marginBottom: 10,
            }}>
            <Text>Aturan Pakai</Text>
            {jenisObat === '2' && (
              <Picker
                selectedValue={aturanPakai}
                onValueChange={(itemValue, itemIndex) =>
                  setAturanPakai(itemValue)
                }>
                <Picker.Item label="--Pilih--" value="" />
                <Picker.Item label="6 x 1 hari" value="6" />
                <Picker.Item label="5 x 1 hari" value="5" />
                <Picker.Item label="4 x 1 hari" value="4" />
                <Picker.Item label="3 x 1 hari" value="3" />
                <Picker.Item label="2 x 1 hari" value="2" />
                <Picker.Item label="1 x 1 hari" value="1" />
              </Picker>
            )}
            {jenisObat === '1' && (
              <Picker
                selectedValue={aturanPakai}
                onValueChange={(itemValue, itemIndex) =>
                  setAturanPakai(itemValue)
                }>
                <Picker.Item label="--Pilih--" value="" />
                <Picker.Item label="3 x 1 hari" value="3" />
                <Picker.Item label="2 x 1 hari" value="2" />
                <Picker.Item label="1 x 1 hari" value="1" />
              </Picker>
            )}
          </View>
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
