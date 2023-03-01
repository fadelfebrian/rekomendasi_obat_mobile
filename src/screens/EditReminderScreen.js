import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import CustomHeader from '../components/CustomHeader';
import FormReminder from '../components/reminder/edit_reminder';

const EditReminderScreen = ({navigation, route}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView>
        <CustomHeader navigation={navigation} />
        <FormReminder navigation={navigation} route={route} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditReminderScreen;
