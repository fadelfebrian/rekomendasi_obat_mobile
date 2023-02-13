import React, {useState} from 'react';
import {SafeAreaView, View, Dimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {ScrollView} from 'react-native-gesture-handler';

const Chart = ({dataBmi}) => {
  const renderData = () => {
    let data = [];

    if (dataBmi.length === 0) {
      data.push(0);
    } else {
      dataBmi.forEach(val => data.push(val));
    }
    return data;
  };
  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <ScrollView>
        <View>
          <LineChart
            data={{
              //   labels: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni'],
              datasets: [
                {
                  data: renderData(),
                },
              ],
            }}
            width={Dimensions.get('window').width - 50} // from react-native
            height={200}
            yAxisLabel={''}
            chartConfig={{
              backgroundColor: '#04AD48',
              backgroundGradientFrom: '#04AD48',
              backgroundGradientTo: '#04AD48',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `white`,
              labelColor: (opacity = 1) => `white`,
              style: {
                borderRadius: 16,
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Chart;
