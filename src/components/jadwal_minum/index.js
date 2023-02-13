import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import api from '../../api';
import {AuthContext} from '../../context/AuthContext';
const ListJadwalMinum = ({navigation}) => {
  const {dataUser} = useContext(AuthContext);
  const [jadwalMinum, setJadwalMinum] = useState([]);

  const fetchAllReminderObat = async () => {
    try {
      const {data, status} = await api.fetchAllReminderObat(dataUser?.id);
      setJadwalMinum(data);
      return status;
    } catch (err) {
      return err;
    }
  };
  useEffect(() => {
    fetchAllReminderObat();
    const willFocusSubscription = navigation.addListener('focus', () => {
      fetchAllReminderObat();
    });
    return willFocusSubscription;
  }, []);

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
            Jadwal Minum Obat
          </Text>

          {jadwalMinum?.map((val, index) => {
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
                    key={`waktumakan_${index}`}
                    style={{
                      fontFamily: 'Roboto-Medium',
                      fontSize: 15,
                      fontWeight: 'bold',
                      color: '#333',
                      marginBottom: 5,
                    }}>
                    - {val.nama_obat?.toUpperCase()}
                  </Text>
                  <Text
                    key={`rekomendasi_${index}`}
                    style={{
                      fontFamily: 'Roboto-Medium',
                      fontSize: 15,
                      fontWeight: '500',
                      color: '#333',
                      marginBottom: 5,
                    }}>
                    Jumlah Obat : {val.jml_obat}
                  </Text>
                  <Text
                    key={`tempWaktu_${index}`}
                    style={{
                      fontFamily: 'Roboto-Medium',
                      fontSize: 15,
                      fontWeight: '500',
                      color: '#333',
                      marginBottom: 5,
                    }}>
                    Jam Minum Obat : {val.tempWaktu}
                  </Text>
                  <Text
                    key={`sisaObat_${index}`}
                    style={{
                      fontFamily: 'Roboto-Medium',
                      fontSize: 15,
                      fontWeight: '500',
                      color: '#333',
                      marginBottom: 5,
                    }}>
                    Sisa Obat : {val.sisaObat}
                  </Text>
                </View>
              </>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ListJadwalMinum;
