import React, {useContext, useEffect} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import CustomHeader from '../components/CustomHeader';
import News from '../components/news';
import Graph from '../components/profile/graph';

import {AuthContext} from '../context/AuthContext';

const HomeScreen = ({navigation}) => {
  const {detailUser, fetchDetailUserById} = useContext(AuthContext);
  useEffect(() => {
    fetchDetailUserById();
    const willFocusSubscription = navigation.addListener('focus', () => {
      fetchDetailUserById();
    });
    return willFocusSubscription;
  }, []);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView>
        <CustomHeader navigation={navigation} />
        {/* <Text>Selamat Datang Di Aplikasi S.M.A.R.T DM</Text>
        <Text>Self management for patient Diabetes Mellitus</Text> */}
        <News navigation={navigation} />
        {detailUser?.need_update === false && <Graph navigation={navigation} />}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
