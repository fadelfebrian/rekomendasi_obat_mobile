import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import CustomHeader from '../components/CustomHeader';
import ListMenuDiet from '../components/menu_diet';

const MenuDietScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView>
        <CustomHeader navigation={navigation} />
        <ListMenuDiet navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default MenuDietScreen;
