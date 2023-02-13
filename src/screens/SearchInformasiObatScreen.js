import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import CustomHeader from '../components/CustomHeader';
import InformasiObatComponent from '../components/informasi_obat';

const SearchInformasiObatScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView style={{padding: 20}}>
        <CustomHeader navigation={navigation} />
        <InformasiObatComponent navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchInformasiObatScreen;
