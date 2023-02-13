import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import CustomHeader from '../components/CustomHeader';
import KuesionerComponent from '../components/kuesioner';

const Kuesioner = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView>
        <CustomHeader navigation={navigation} />
        <KuesionerComponent navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Kuesioner;
