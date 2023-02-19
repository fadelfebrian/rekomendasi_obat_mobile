import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, Text, View, Alert} from 'react-native';
import api from '../../api';
import {AuthContext} from '../../context/AuthContext';

const ListMenuDiet = ({navigation}) => {
  const {dataUser} = useContext(AuthContext);
  const [menuDiet, setMenuDiet] = useState([]);

  const fetchMenuDietById = async () => {
    try {
      const {data, status} = await api.fetchMenuDietById(dataUser?.id);

      setMenuDiet(data);
      return status;
    } catch (err) {
      return err;
    }
  };
  useEffect(() => {
    fetchMenuDietById();
    const willFocusSubscription = navigation.addListener('focus', () => {
      fetchMenuDietById();
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
              marginBottom: 5,
            }}>
            Energi Total : {menuDiet?.ENERGI_TOTAL}
          </Text>
          <Text
            style={{
              fontFamily: 'Roboto-Medium',
              fontSize: 15,
              fontWeight: 'bold',
              color: '#333',
              marginBottom: 5,
            }}>
            Tipe Diet Kalori : {menuDiet?.TIPE_KALORI}
          </Text>
          <Text
            style={{
              fontFamily: 'Roboto-Medium',
              fontSize: 15,
              fontWeight: 'bold',
              color: '#333',
              marginBottom: 5,
            }}>
            Protein : {menuDiet?.PROTEIN}
          </Text>
          <Text
            style={{
              fontFamily: 'Roboto-Medium',
              fontSize: 15,
              fontWeight: 'bold',
              color: '#333',
              marginBottom: 5,
            }}>
            Lemak : {menuDiet?.LEMAK}
          </Text>
          <Text
            style={{
              fontFamily: 'Roboto-Medium',
              fontSize: 15,
              fontWeight: 'bold',
              color: '#333',
              marginBottom: 5,
            }}>
            Karbohidrat : {menuDiet?.KARBOHIDRAT}
          </Text>
          <Text
            style={{
              fontFamily: 'Roboto-Medium',
              fontSize: 15,
              fontWeight: 'bold',
              color: '#333',
              marginBottom: 20,
            }}>
            Klasifikasi : {menuDiet?.BMIKLASIKIKASI}
          </Text>
          <Text
            style={{
              fontFamily: 'Roboto-Medium',
              fontSize: 15,
              fontWeight: 'bold',
              color: '#333',
              marginBottom: 10,
            }}>
            Menu Diet yang direkomendasikan
          </Text>
          {menuDiet?.menu_diet?.map((val, index) => (
            <View
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
                key={`waktumakan_`}
                style={{
                  fontFamily: 'Roboto-Medium',
                  fontSize: 15,
                  fontWeight: 'bold',
                  color: '#333',
                  marginBottom: 5,
                }}>
                Waktu Makan
              </Text>
              <Text
                key={`rekomendasi_`}
                style={{
                  fontFamily: 'Roboto-Medium',
                  fontSize: 15,
                  fontWeight: '500',
                  color: '#333',
                  marginBottom: 5,
                }}>
                - {val?.waktu_makan}
              </Text>
              <Text
                key={`buahpilihan_`}
                style={{
                  fontFamily: 'Roboto-Medium',
                  fontSize: 15,
                  fontWeight: 'bold',
                  color: '#333',
                  marginBottom: 5,
                }}>
                Bahan Makanan
              </Text>
              {val?.bahan_makanans?.map((bhn_makanan, idx_bhn_makanan) => (
                <Text
                  key={`buahpilihan_`}
                  style={{
                    fontFamily: 'Roboto-Medium',
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: '#333',
                    marginBottom: 5,
                  }}>
                  - {bhn_makanan.bahan_makanan} {bhn_makanan.urt}{' '}
                  {bhn_makanan?.satuan}
                </Text>
              ))}
              <Text
                key={`buahpilihan_`}
                style={{
                  fontFamily: 'Roboto-Medium',
                  fontSize: 15,
                  fontWeight: 'bold',
                  color: '#333',
                  marginBottom: 5,
                }}>
                Pilihan Makanan
              </Text>
              {val?.pilihan_makanans?.map((plhn_makanan, idx_plhn_makanan) => (
                <Text
                  key={`buahpilihan_`}
                  style={{
                    fontFamily: 'Roboto-Medium',
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: '#333',
                    marginBottom: 5,
                  }}>
                  - {plhn_makanan.pilihan_makanan} {plhn_makanan.makanan}
                </Text>
              ))}
              <Text
                key={`buahpilihan_`}
                style={{
                  fontFamily: 'Roboto-Medium',
                  fontSize: 15,
                  fontWeight: 'bold',
                  color: '#333',
                  marginBottom: 5,
                }}>
                Bila Masih Lapar
              </Text>
              <Text
                key={`rekomendasi_buah_`}
                style={{
                  fontFamily: 'Roboto-Medium',
                  fontSize: 15,
                  fontWeight: '500',
                  color: '#333',
                  marginBottom: 5,
                }}>
                - {val?.bila_masih_lapar}
              </Text>
              <Text
                key={`buahpilihan_`}
                style={{
                  fontFamily: 'Roboto-Medium',
                  fontSize: 15,
                  fontWeight: 'bold',
                  color: '#333',
                  marginBottom: 5,
                }}>
                Cara Memasak
              </Text>
              <Text
                key={`rekomendasi_buah_`}
                style={{
                  fontFamily: 'Roboto-Medium',
                  fontSize: 15,
                  fontWeight: '500',
                  color: '#333',
                  marginBottom: 5,
                }}>
                - {val?.cara_memasak}
              </Text>
              <Text
                key={`buahpilihan_`}
                style={{
                  fontFamily: 'Roboto-Medium',
                  fontSize: 15,
                  fontWeight: 'bold',
                  color: '#333',
                  marginBottom: 5,
                }}>
                Pantangan
              </Text>
              <Text
                key={`rekomendasi_buah_`}
                style={{
                  fontFamily: 'Roboto-Medium',
                  fontSize: 15,
                  fontWeight: '500',
                  color: '#333',
                  marginBottom: 5,
                }}>
                - {val?.pantangan}
              </Text>
              <Text
                key={`buahpilihan_`}
                style={{
                  fontFamily: 'Roboto-Medium',
                  fontSize: 15,
                  fontWeight: 'bold',
                  color: '#333',
                  marginBottom: 5,
                }}>
                Anjuran Olahraga
              </Text>
              <Text
                key={`olahraga_`}
                style={{
                  fontFamily: 'Roboto-Medium',
                  fontSize: 15,
                  fontWeight: 'bold',
                  color: '#333',
                  marginBottom: 5,
                }}>
                - {val?.anjuran_olahraga}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ListMenuDiet;
