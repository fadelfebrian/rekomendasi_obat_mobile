import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import CustomHeader from '../components/CustomHeader';
import Graph from '../components/profile/graph';

const ProfileScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView>
        <CustomHeader navigation={navigation} />
        <Graph navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
