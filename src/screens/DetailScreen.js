import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import Detail from '../components/news/detail';

const DetailScreen = ({navigation, route}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <CustomHeader navigation={navigation} /> */}
        {/* <FaqComponent navigation={navigation} /> */}
        <Detail navigation={navigation} route={route} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailScreen;
