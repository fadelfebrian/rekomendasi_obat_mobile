import React from 'react';
import {StyleSheet, TouchableOpacity, Image, View, Text} from 'react-native';
import {colors} from '../../config/theme';
import TextComponent from '../text';
import {newsData} from './data';
const Detail = ({navigation, route, ...props}) => {
  let activeColors = colors;
  const {image, title, avatar, date, author, content, uri} = route?.params;

  return (
    <View style={{padding: 0}}>
      <Image source={{uri: uri}} style={styles.image} />
      <View
        style={[
          {backgroundColor: activeColors.secondary},
          styles.bottomSection,
        ]}>
        <TextComponent
          numberOfLines={3}
          bold
          style={[
            {
              color: colors.accent,
            },
            styles.title,
          ]}
          big
          title={title}
        />
        <View style={styles.authorRow}>
          <View style={styles.author}>
            <Image style={styles.avatar} source={avatar} />
            <TextComponent title={author} numberOfLines={1} bold />
          </View>
          <TextComponent
            style={[
              {
                color: activeColors.tertiary,
              },
              styles.date,
            ]}
            title={date}
            small
          />
        </View>
        <TextComponent
          style={[
            {
              color: activeColors.tint,
            },
            styles.content,
          ]}
          title={content}
          small
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
    // borderRadius: 25,
  },
  title: {
    marginBottom: 20,
  },
  bottomSection: {
    padding: 20,
    // flex: 1,
    // justifyContent: 'space-between',
    top: -30,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  author: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 25,
    flex: 3,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 25,
  },
  date: {
    textAlign: 'right',
    flex: 2,
  },
  content: {
    marginTop: 15,
    textAlign: 'justify',
  },
});

export default Detail;
