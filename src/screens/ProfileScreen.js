import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import CustomHeader from '../components/CustomHeader';
import Biodata from '../components/profile/biodata';

const ProfileScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView>
        <CustomHeader navigation={navigation} />
        <Biodata navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
