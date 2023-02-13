import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import TextComponent from '../text';
import {newsData} from './data';
import Items from './items';
import api from '../../api/index.js';

const News = ({navigation}) => {
  const [news, setNews] = useState([]);

  const fetchAllNews = async () => {
    try {
      const {data, status} = await api.fetchAllNews();
      // console.log('data', data);
      if (data.length > 0) {
        const map = data.map(val => {
          return {
            ...val,
            avatar: require('../../assets/images/user-profile.jpg'),
          };
        });
        setNews(map);
      } else {
        setNews([]);
      }
      return status;
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    fetchAllNews();
    const willFocusSubscription = navigation.addListener('focus', () => {
      fetchAllNews();
    });
    return willFocusSubscription;
  }, []);
  return (
    <>
      <TextComponent
        title={'Berita Terbaru'}
        numberOfLines={1}
        bold
        style={[
          {
            marginLeft: 20,
          },
        ]}
        big
      />
      <FlatList
        data={news}
        renderItem={({item}) => <Items {...item} navigation={navigation} />}
        keyExtractor={({id}) => id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingLeft: 10,
          paddingTop: 10,
        }}
      />
    </>
  );
};

export default News;
