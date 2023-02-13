import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import CustomHeader from '../components/CustomHeader';
import FormReminder from '../components/reminder/tambah_reminder';
import ListJadwalMinum from '../components/jadwal_minum';

const JadwalObatScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView >
        <CustomHeader navigation={navigation} />
        <ListJadwalMinum navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default JadwalObatScreen;
