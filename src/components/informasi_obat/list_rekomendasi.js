import React, {useContext} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {AuthContext} from '../../context/AuthContext';

const ListRekomendasi = () => {
  const {state} = useContext(AuthContext);

  const renderTextRekomendasi = val => {
    let text = '';
    if (val === 1) {
      text = 'Obat yang aman digunakan :';
    } else if (val === 2) {
      text = 'Obat harus dengan resep dokter :';
    } else {
      text = 'Obat yang tidak boleh digunakan :';
    }
    return text;
  };
  const renderTextDiminum = (jml, cara_minum) => {
    return `Diminum ${jml} x sehari ${cara_minum}`;
  };
  const conditionalColor = val => {
    let color = '';
    if (val === 1) {
      color = '#68B984';
    } else if (val === 2) {
      color = '#FBDF07';
    } else {
      color = '#B93160';
    }
    return color;
  };
  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <ScrollView>
        <View>
          <Text
            style={{
              fontFamily: 'Roboto-Medium',
              fontSize: 15,
              fontWeight: '500',
              color: '#333',
              marginBottom: 5,
            }}>
            Obat DM yang digunakan
          </Text>
          <Text
            style={{
              fontFamily: 'Roboto-Medium',
              fontSize: 15,
              fontWeight: 'bold',
              color: '#333',
              marginBottom: 10,
            }}>
            - {state?.selectedObatDm}
          </Text>
          <Text
            style={{
              fontFamily: 'Roboto-Medium',
              fontSize: 15,
              fontWeight: '500',
              color: '#333',
              marginBottom: 5,
            }}>
            Jenis Keluhan
          </Text>
          <Text
            style={{
              fontFamily: 'Roboto-Medium',
              fontSize: 15,
              fontWeight: 'bold',
              color: '#333',
              marginBottom: 10,
            }}>
            - {state?.selectedKeluhan}
          </Text>
          {state?.listRekomendasiObat?.map((val, index) => {
            return (
              <View
                key={index}
                style={{
                  border: 1,
                  borderColor: 'black',
                  borderWidth: 1,
                  borderRadius: 5,
                  padding: 5,
                  marginBottom: 10,
                  backgroundColor: conditionalColor(val.nilai_rekomendasi),
                }}>
                <Text
                  key={`rekomendasi_${index}`}
                  style={{
                    fontFamily: 'Roboto-Medium',
                    fontSize: 15,
                    fontWeight: '500',
                    color: '#333',
                    marginBottom: 5,
                  }}>
                  {renderTextRekomendasi(val.nilai_rekomendasi)}
                </Text>
                <Text
                  key={`namaObat_${index}`}
                  style={{
                    fontFamily: 'Roboto-Medium',
                    fontSize: 15,
                    fontWeight: '500',
                    color: '#333',
                    marginBottom: 5,
                  }}>
                  - {val.nama_obat} {val.dosis}
                </Text>
                <Text
                  key={`diminum_${index}`}
                  style={{
                    fontFamily: 'Roboto-Medium',
                    fontSize: 15,
                    fontWeight: '500',
                    color: '#333',
                    marginBottom: 10,
                  }}>
                  {renderTextDiminum(val.jml_minum, val.cara_minum)}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ListRekomendasi;
