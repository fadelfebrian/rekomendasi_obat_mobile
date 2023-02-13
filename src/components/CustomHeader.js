import React, {useContext} from 'react';
import {View, Text, TouchableOpacity, ImageBackground} from 'react-native';
import {AuthContext} from '../context/AuthContext';

const CustomHeader = ({navigation}) => {
  const {dataUser} = useContext(AuthContext);
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        display: 'flex',
        alignItems: 'center',
      }}>
      <Text style={{fontSize: 18, fontFamily: 'Roboto-Medium'}}>
        Hello {dataUser?.full_name}
      </Text>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <ImageBackground
          source={require('../assets/images/user-profile.jpg')}
          style={{width: 35, height: 35}}
          imageStyle={{borderRadius: 25}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CustomHeader;
