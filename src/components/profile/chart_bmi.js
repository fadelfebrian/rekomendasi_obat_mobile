import React, {useState} from 'react';
import {SafeAreaView, View, Dimensions, Alert} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {ScrollView} from 'react-native-gesture-handler';
import {Rect, Text as TextSVG, Svg} from 'react-native-svg';

const Chart = ({dataBmi, dataDate}) => {
  let [tooltipPos, setTooltipPos] = useState({
    x: 0,
    y: 0,
    visible: false,
    value: 0,
  });
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
              labels: dataDate,
              datasets: [
                {
                  data: renderData(),
                  strokeWidth: 2, // optional
                },
              ],
            }}
            width={Dimensions.get('window').width - 50} // from react-native
            height={430}
            yAxisLabel={''}
            bezier
            chartConfig={{
              // verticalLabelRotation: 360,
              backgroundColor: '#04AD48',
              backgroundGradientFrom: '#04AD48',
              backgroundGradientTo: '#04AD48',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `white`,
              labelColor: (opacity = 1) => `white`,
              style: {
                borderRadius: 16,
              },
              onDataPointClick: ({value, dataset, getColor}) => {
                Alert(value);
              },
            }}
            spacing={0.8}
            spacingInner={0.8}
            verticalLabelRotation={90}
            withInnerLines={true}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
            decorator={() => {
              return tooltipPos.visible ? (
                <View>
                  <Svg>
                    <Rect
                      x={tooltipPos.x - 15}
                      y={tooltipPos.y + 10}
                      width="50"
                      height="30"
                      fill="black"
                    />
                    <TextSVG
                      x={tooltipPos.x + 5}
                      y={tooltipPos.y + 30}
                      fill="white"
                      fontSize="16"
                      fontWeight="bold"
                      textAnchor="middle">
                      {tooltipPos.value}
                    </TextSVG>
                  </Svg>
                </View>
              ) : null;
            }}
            onDataPointClick={data => {
              let isSamePoint =
                tooltipPos.x === data.x && tooltipPos.y === data.y;

              isSamePoint
                ? setTooltipPos(previousState => {
                    return {
                      ...previousState,
                      value: data.value,
                      visible: !previousState.visible,
                    };
                  })
                : setTooltipPos({
                    x: data.x,
                    value: data.value,
                    y: data.y,
                    visible: true,
                  });
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Chart;
