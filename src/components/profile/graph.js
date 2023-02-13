import React, {useContext, useEffect} from 'react';
import {Text, View, SafeAreaView, ScrollView, Alert} from 'react-native';
import {AuthContext} from '../../context/AuthContext';
import ChartBmi from './chart_bmi';

const Biodata = ({navigation}) => {
  const {fetchDetailUserById, detailUser} = useContext(AuthContext);

  useEffect(() => {
    fetchDetailUserById();
    const willFocusSubscription = navigation.addListener('focus', () => {
      fetchDetailUserById();
    });
    return willFocusSubscription;
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        marginBottom: 50,
        padding: 20,
      }}>
      <ScrollView>
        <View>
          <>
            <Text
              style={{
                fontFamily: 'Roboto-Medium',
                fontSize: 15,
                fontWeight: 'bold',
                color: '#333',
              }}>
              Kadar GDS
            </Text>
            <ChartBmi dataBmi={detailUser?.dataGds} />
            <Text
              style={{
                alignSelf: 'center',
                fontFamily: 'Roboto-Medium',
                fontSize: 15,
                fontWeight: 'bold',
                color: '#333',
              }}>
              Keterangan : {detailUser?.resultGds}
            </Text>
            <Text
              style={{
                fontFamily: 'Roboto-Medium',
                fontSize: 15,
                fontWeight: 'bold',
                color: '#333',
              }}>
              Indeks Masa Tubuh (IMT)
            </Text>
            <ChartBmi dataBmi={detailUser?.dataBmi} />
            <Text
              style={{
                alignSelf: 'center',
                fontFamily: 'Roboto-Medium',
                fontSize: 15,
                fontWeight: 'bold',
                color: '#333',
              }}>
              Keterangan : {detailUser?.resultBmi}
            </Text>
            <Text
              style={{
                fontFamily: 'Roboto-Medium',
                fontSize: 15,
                fontWeight: 'bold',
                color: '#333',
              }}>
              Glukosa Darah Puasa (Gdp)
            </Text>
            <ChartBmi dataBmi={detailUser?.dataGdp} />
            <Text
              style={{
                alignSelf: 'center',
                fontFamily: 'Roboto-Medium',
                fontSize: 15,
                fontWeight: 'bold',
                color: '#333',
              }}>
              Keterangan : {detailUser?.resultGdp}
            </Text>
          </>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Biodata;
