import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import CustomHeader from '../components/CustomHeader';
import FormReminder from '../components/reminder/tambah_reminder';

const ReminderScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView>
        <CustomHeader navigation={navigation} />
        <FormReminder navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReminderScreen;
