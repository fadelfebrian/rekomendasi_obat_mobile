import React, {useContext, useState, useEffect} from 'react';
import {Text, View, SafeAreaView, ScrollView, Alert} from 'react-native';
import {AuthContext} from '../../context/AuthContext';
import CustomButton from '../CustomButton';
import api from '../../api';
import {Picker} from '@react-native-picker/picker';

const SearchInformasiObat = ({navigation}) => {
  const {updateState} = useContext(AuthContext);
  const [selectedKeluhan, setSelectedKeluhan] = useState('');
  const [selectedObat, setSelectedObat] = useState('');
  const [jenisKeluhan, setArrJenisKeluhan] = useState([]);
  const [obatDm, setArrObatDm] = useState([]);

  const fetchAllJenisKeluhan = async () => {
    try {
      const {data, status} = await api.fetchAllJenisKeluhan();
      if (status) {
        setArrJenisKeluhan(data);
      }
      return data;
    } catch (err) {
      return err;
    }
  };
  const fetchAllObatDm = async () => {
    try {
      const {data, status} = await api.fetchAllObatDm();
      if (status) {
        setArrObatDm(data);
      }
      return data;
    } catch (err) {
      return err;
    }
  };
  useEffect(() => {
    fetchAllJenisKeluhan();
    fetchAllObatDm();
  }, []);

  const validation = () => {
    if (selectedObat === '') {
      return Alert.alert('Error', 'Jenis Obat harus diisi');
    } else if (selectedKeluhan === '') {
      return Alert.alert('Error', 'Keluhan harus diisi');
    }
    return true;
  };
  const searchRekomendasi = async () => {
    const isValid = validation();

    if (isValid) {
      try {
        const {status, data} = await api.fetchRekomendasiObatByObatAndKeluhan(
          selectedObat,
          selectedKeluhan,
        );
        if (status && data.length > 0) {
          updateState('listRekomendasiObat', data);
          navigation.navigate('InformasiObat');
        } else if (status && data.length === 0) {
          Alert.alert('Error', 'Data tidak ditemukan');
        } else {
          Alert.alert('Error', 'Data tidak ditemukan');
        }
        // return data;
      } catch (err) {
        Alert.alert('Error', 'Data tidak ditemukan');
        return err;
      }
    }
  };
  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <ScrollView>
        <View style={{padding: 8}}>
          <View>
            <Text
              style={{
                fontFamily: 'Roboto-Medium',
                fontSize: 15,
                fontWeight: '500',
                color: '#333',
                marginBottom: 10,
              }}>
              Obat Diabetes yang digunakan
            </Text>
            <Picker
              selectedValue={selectedObat}
              onValueChange={(itemValue, itemIndex) => {
                setSelectedObat(itemValue);
                const find = obatDm?.find(val => val.id === itemValue);
                updateState(
                  'selectedObatDm',
                  `${find?.nama_obat}/${find?.golongan_obat?.nama_golongan}`,
                );
              }}>
              <Picker.Item label="--Pilih--" value="" />
              {obatDm?.map(val => {
                return (
                  <Picker.Item
                    label={`${val.nama_obat} / ${val?.golongan_obat?.nama_golongan}`}
                    value={val.id}
                    key={val.id}
                  />
                );
              })}
            </Picker>
          </View>
          <View>
            <Text
              style={{
                fontFamily: 'Roboto-Medium',
                fontSize: 15,
                fontWeight: '500',
                color: '#333',
                marginBottom: 10,
              }}>
              Keluhan yang dirasakan
            </Text>
            <Picker
              selectedValue={selectedKeluhan}
              onValueChange={(itemValue, itemIndex) => {
                setSelectedKeluhan(itemValue);
                const find = jenisKeluhan?.find(val => val.id === itemValue);
                updateState('selectedKeluhan', `${find?.nama_keluhan}`);
              }}>
              <Picker.Item label="--Pilih--" value="" />
              {jenisKeluhan?.map(val => {
                return (
                  <Picker.Item
                    label={val.nama_keluhan}
                    value={val.id}
                    key={val.id}
                  />
                );
              })}
            </Picker>
          </View>

          <CustomButton
            label={'Proses'}
            onPress={() => {
              searchRekomendasi();
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchInformasiObat;
