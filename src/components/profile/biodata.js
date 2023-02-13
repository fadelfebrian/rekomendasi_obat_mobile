import React, {useContext, useState, useEffect} from 'react';
import {Text, View, SafeAreaView, ScrollView, Alert} from 'react-native';
import InputField from '../InputField';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {AuthContext} from '../../context/AuthContext';
import CustomButton from '../CustomButton';
import api from '../../api';
import ChartBmi from './chart_bmi';
import {Picker} from '@react-native-picker/picker';

const Biodata = ({navigation}) => {
  const {dataUser, fetchDetailUserById} = useContext(AuthContext);
  const [kadarGula, setKadarGula] = useState('');
  const [nilaiHba, setNilaiHba] = useState('');
  const [gdp, setGdp] = useState('');
  const [tinggiBadan, setTinggiBadan] = useState('');
  const [beratBadan, setBeratBadan] = useState('');
  const [aktifitasFisik, setAktifitasFisik] = useState('');
  const [stressMetabolik, setStressMetabolik] = useState('');

  useEffect(() => {
    fetchDetailUserById();
    const willFocusSubscription = navigation.addListener('focus', () => {
      fetchDetailUserById();
    });
    return willFocusSubscription;
  }, []);

  const validation = () => {
    if (kadarGula === '') {
      return Alert.alert('Error', 'Kadar Gula Darah harus diisi');
    }
    // else if (nilaiHba === '') {
    //   return Alert.alert('Error', 'Nilai HbA1C harus diisi');
    // }
    else if (tinggiBadan === '') {
      return Alert.alert('Error', 'Tinggi Badan harus diisi');
    } else if (gdp === '') {
      return Alert.alert('Error', 'Gdp harus diisi');
    } else if (beratBadan === '') {
      return Alert.alert('Error', 'Berat Badan harus diisi');
    }

    return true;
  };
  const submitRegister = async () => {
    const isValid = validation();

    if (isValid) {
      const payload = {
        id_user: dataUser?.id,
        kadar_gula_darah: kadarGula,
        nilai_hba: nilaiHba,
        berat_badan: beratBadan,
        tinggi_badan: tinggiBadan,
        jenis_kelamin: dataUser?.jenis_kelamin,
        umur: dataUser?.umur,
        aktifitas_fisik: aktifitasFisik,
        tingkat_stress: stressMetabolik,
        gdp,
      };
      try {
        const {status, data} = await api.postDetailUser(payload);

        if (status) {
          Alert.alert('Success', 'Berhasil menyimpan data');
          resetState();
          navigation.navigate('Graph Profile');
        } else {
          Alert.alert('Error', 'Gagal menyimpan data');
        }
        return data;
      } catch (err) {
        Alert.alert('Error', 'Gagal menyimpan data');
        return err;
      }
    }
  };
  const resetState = () => {
    setKadarGula('');
    setNilaiHba('');
    setGdp('');
    setTinggiBadan('');
    setBeratBadan('');
    setAktifitasFisik('');
    setStressMetabolik('');
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        marginBottom: 50,
        padding: 20,
      }}>
      <ScrollView>
        <View>
          <>
            <Text
              style={{
                fontFamily: 'Roboto-Medium',
                fontSize: 15,
                fontWeight: '500',
                color: '#333',
                marginBottom: 30,
              }}>
              Biodata Diri
            </Text>
            <InputField
              label={'Nama'}
              icon={
                <AntDesign
                  name="user"
                  size={20}
                  color="#666"
                  style={{marginRight: 5}}
                />
              }
              keyboardType="email-address"
              value={dataUser?.full_name}
              isEditable={false}
            />
            <InputField
              label={'Usia'}
              icon={
                <AntDesign
                  name="contacts"
                  size={20}
                  color="#666"
                  style={{marginRight: 5}}
                />
              }
              keyboardType="email-address"
              value={`${dataUser?.umur} Tahun`}
              isEditable={false}
            />
            <InputField
              label={'Jenis Kelamin'}
              icon={
                <AntDesign
                  name="heart"
                  size={20}
                  color="#666"
                  style={{marginRight: 5}}
                />
              }
              keyboardType="email-address"
              value={dataUser?.jenis_kelamin}
              isEditable={false}
            />
            <InputField
              label={'Kadar Gula Darah Sewaktu(GDS)'}
              icon={
                <AntDesign
                  name="table"
                  size={20}
                  color="#666"
                  style={{marginRight: 5}}
                />
              }
              keyboardType="number-pad"
              value={kadarGula}
              onChangeFunc={text => setKadarGula(text)}
            />
            <InputField
              label={'Nilai HbA1C'}
              icon={
                <AntDesign
                  name="exception1"
                  size={20}
                  color="#666"
                  style={{marginRight: 5}}
                />
              }
              keyboardType="number-pad"
              value={nilaiHba}
              onChangeFunc={text => setNilaiHba(text)}
            />
            <InputField
              label={'Glukosa Darah Puasa'}
              icon={
                <AntDesign
                  name="exception1"
                  size={20}
                  color="#666"
                  style={{marginRight: 5}}
                />
              }
              keyboardType="number-pad"
              value={gdp}
              onChangeFunc={text => setGdp(text)}
            />
            <InputField
              label={'Berat Badan (kg)'}
              icon={
                <AntDesign
                  name="dashboard"
                  size={20}
                  color="#666"
                  style={{marginRight: 5}}
                />
              }
              keyboardType="number-pad"
              value={beratBadan}
              onChangeFunc={text => setBeratBadan(text)}
            />
            <InputField
              label={'Tinggi Badan (cm)'}
              icon={
                <AntDesign
                  name="dashboard"
                  size={20}
                  color="#666"
                  style={{marginRight: 5}}
                />
              }
              keyboardType="number-pad"
              value={tinggiBadan}
              onChangeFunc={text => setTinggiBadan(text)}
            />
            <View
              style={{
                borderBottomColor: '#ccc',
                borderBottomWidth: 1,
                marginBottom: 25,
              }}>
              <Text>Aktifitas Fisik</Text>
              <Picker
                selectedValue={aktifitasFisik}
                onValueChange={(itemValue, itemIndex) =>
                  setAktifitasFisik(itemValue)
                }>
                <Picker.Item label="--Pilih--" value="" />
                <Picker.Item
                  label="Istirahat (Pensiunan,Tidak Bekerja)"
                  value="10"
                />
                <Picker.Item
                  label="Ringan (Pegawai Kantor,Guru, IRT)"
                  value="20"
                />
                <Picker.Item
                  label="Sedang (Pegawai Industri,Mahasiswa)"
                  value="30"
                />
                <Picker.Item label="Berat (Petani,Buruh,Atlet)" value="40" />
                <Picker.Item
                  label="Sangat Berat (Tukang Becak,Tukang Galian)"
                  value="50"
                />
              </Picker>
            </View>
            <View
              style={{
                borderBottomColor: '#ccc',
                borderBottomWidth: 1,
                marginBottom: 25,
              }}>
              <Text>Stress Metabolik</Text>
              <Picker
                selectedValue={stressMetabolik}
                onValueChange={(itemValue, itemIndex) =>
                  setStressMetabolik(itemValue)
                }>
                <Picker.Item label="--Pilih--" value="" />
                <Picker.Item label="Tidak Ada" value="0" />
                <Picker.Item label="Sepsis" value="10" />
                <Picker.Item label="Operasi" value="20" />
                <Picker.Item label="Trauma" value="30" />
              </Picker>
            </View>
            <CustomButton
              label={'Simpan'}
              onPress={() => {
                submitRegister();
              }}
            />
          </>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Biodata;
