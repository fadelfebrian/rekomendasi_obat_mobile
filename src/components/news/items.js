import React from 'react';
import {StyleSheet, TouchableOpacity, Image, View, Text} from 'react-native';
import {colors} from '../../config/theme';
import TextComponent from '../text';
const Items = ({
  image,
  title,
  avatar,
  date,
  author,
  navigation,
  content,
  ...props
}) => {
  let activeColors = colors;
  const mode = 'DEV';
  const imageDir =
    mode === 'DEV'
      ? 'http://10.0.2.2:3001/uploads/images'
      : 'http://10.0.2.2:3001/uploads/images';

  const uri = `${imageDir}/${image}`;
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate('Detail', {
          image,
          title,
          avatar,
          date,
          author,
          content,
          uri,
        })
      }>
      <Image source={{uri: uri}} style={styles.image} />
      <View style={styles.bottomSection}>
        <TextComponent
          numberOfLines={3}
          bold
          style={[
            {
              color: colors.tint,
            },
            styles.title,
          ]}
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
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: 350,
    width: 300,
    borderRadius: 25,
    marginRight: 20,
    backgroundColor: '#f3f4f6',
  },
  image: {
    width: 300,
    height: 190,
    borderRadius: 25,
  },
  title: {
    fontSize: 16,
  },
  bottomSection: {
    padding: 20,
    flex: 1,
    justifyContent: 'space-between',
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
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  date: {
    textAlign: 'right',
    flex: 2,
  },
});

export default Items;
