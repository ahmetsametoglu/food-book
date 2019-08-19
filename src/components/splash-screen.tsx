import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../utils/helper';

const SplashScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
      }}>
      <Icon name="food" size={120} color={colors.light} />
      <Text style={{color: colors.light, fontSize: 40}}>food book</Text>
    </View>
  );
};

export default SplashScreen;
