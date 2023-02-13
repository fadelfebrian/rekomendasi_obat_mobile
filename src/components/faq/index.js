import React, {useEffect, useState} from 'react';
import {Text, ScrollView, SafeAreaView, View} from 'react-native';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import api from '../../api';

const FaqComponent = () => {
  const [faq, setFaq] = useState([]);

  const fetchAllfaq = async () => {
    try {
      const {data, status} = await api.fetchAllfaq();
      console.log('data', data);
      setFaq(data);
      return status;
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    fetchAllfaq();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center', padding: 20}}>
      <ScrollView>
        {faq?.map(val => (
          <Collapse>
            <CollapseHeader style={{backgroundColor: '#E6E6E6', padding: 10}}>
              <View>
                <Text style={{fontWeight: 'bold'}}>{val?.question}</Text>
              </View>
            </CollapseHeader>
            <CollapseBody style={{backgroundColor: '#EDEDED', padding: 10}}>
              <Text style={{textAlign: 'justify'}}>{val?.answer}</Text>
            </CollapseBody>
          </Collapse>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default FaqComponent;
