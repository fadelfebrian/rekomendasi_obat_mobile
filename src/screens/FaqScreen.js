import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import CustomHeader from '../components/CustomHeader';
import FaqComponent from '../components/faq';

const Faq = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView>
        <CustomHeader navigation={navigation} />
        <FaqComponent navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Faq;
