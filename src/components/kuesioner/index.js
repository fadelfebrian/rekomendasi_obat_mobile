import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, Text, View, Alert} from 'react-native';
import api from '../../api';
import {AuthContext} from '../../context/AuthContext';
import BouncyCheckboxGroup from 'react-native-bouncy-checkbox-group';
import CustomButton from '../CustomButton';

const Kuesioner = ({navigation}) => {
  const {dataUser, setDataUser} = useContext(AuthContext);
  const [kuesioner, setKuesioner] = useState([]);
  const [jawabanKuesioner, setJawabanKuesioner] = useState([]);

  const fetchAllKuesioner = async () => {
    try {
      const {data, status} = await api.fetchAllKuesioner();
      setKuesioner(data);
      return status;
    } catch (err) {
      return err;
    }
  };
  useEffect(() => {
    fetchAllKuesioner();
    setJawabanKuesioner([]);
    const willFocusSubscription = navigation.addListener('focus', () => {
      fetchAllKuesioner();
      setJawabanKuesioner([]);
    });
    return willFocusSubscription;
  }, []);

  const onChangeJawaban = data => {
    let findIndex = jawabanKuesioner.findIndex(
      val => val.id_kuesioner === data.id_kuesioner,
    );
    let copy = [...jawabanKuesioner];
    if (findIndex === -1) {
      copy.push({
        jawaban: data.text,
        nilai: data.id,
        id_user: dataUser?.id,
        id_kuesioner: data?.id_kuesioner,
      });
    } else {
      copy[findIndex] = {
        jawaban: data.text,
        nilai: data.id,
        id_user: dataUser?.id,
        id_kuesioner: data?.id_kuesioner,
      };
    }
    setJawabanKuesioner(copy);
  };

  const submitKuesioner = async () => {
    try {
      const payload = {
        bulk: jawabanKuesioner,
      };
      const {status, data} = await api.createJawabanKuesioner(
        payload,
        dataUser?.id,
      );
      if (status) {
        Alert.alert('Success', 'Berhasil menyimpan kuesioner');
        setDataUser({...dataUser, send_kuesioner: true});
        setJawabanKuesioner([]);
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', 'Gagal menyimpan kuesioner', status);
      }
      return data;
    } catch (err) {
      Alert.alert('Error', 'Gagal menyimpan kuesioner');
      return err;
    }
  };

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center', padding: 20}}>
      <ScrollView>
        <View>
          <Text
            style={{
              fontFamily: 'Roboto-Medium',
              fontSize: 15,
              fontWeight: 'bold',
              color: '#333',
              marginBottom: 20,
            }}>
            Kuesioner
          </Text>

          {kuesioner?.map((val, index) => {
            return (
              <>
                <View
                  key={index}
                  style={{
                    border: 1,
                    borderColor: 'black',
                    borderWidth: 1,
                    borderRadius: 5,
                    padding: 5,
                    marginBottom: 10,
                    backgroundColor: '#68B984',
                  }}>
                  <Text
                    key={`pertanyaan_${index}`}
                    style={{
                      fontFamily: 'Roboto-Medium',
                      fontSize: 15,
                      fontWeight: 'bold',
                      color: '#333',
                      marginBottom: 5,
                    }}>
                    - {val.pertanyaan?.toUpperCase()}
                  </Text>
                  <View
                    style={{
                      // height: 50,
                      flexWrap: 'wrap',
                      justifyContent: 'space-evenly',
                      flexDirection: 'column',
                    }}>
                    <BouncyCheckboxGroup
                      key={`checkbox_${index}`}
                      data={val?.list_jawaban}
                      verr
                      style={{flexDirection: 'column'}}
                      onChange={selectedItem => {
                        onChangeJawaban(selectedItem);
                      }}
                    />
                  </View>
                </View>
              </>
            );
          })}
          <CustomButton label={'Simpan'} onPress={() => submitKuesioner()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Kuesioner;
