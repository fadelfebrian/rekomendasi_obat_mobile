import React from 'react';
import {SafeAreaView, ScrollView, Text} from 'react-native';
import CustomHeader from '../components/CustomHeader';
import ListRekomendasi from '../components/informasi_obat/list_rekomendasi';

const InformasiObatScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView>
        <CustomHeader navigation={navigation} />
        <ListRekomendasi />
      </ScrollView>
    </SafeAreaView>
  );
};

export default InformasiObatScreen;
