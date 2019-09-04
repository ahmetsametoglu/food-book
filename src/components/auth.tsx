import React, {useState} from 'react';
import {View, Text, StyleSheet, ViewStyle} from 'react-native';
import {mainStyles, colors} from '../utils/helper-style';

const Auth = () => {
  const [viewType, setViewType] = useState<'login' | 'register'>('login');

  const loginView = (
    <View style={styles.card}>
      <Text>login</Text>
    </View>
  );
  const registerView = (
    <View style={styles.card}>
      <Text>register</Text>
    </View>
  );

  return (
    <View style={styles.mainContainer}>{viewType === 'login' ? loginView : registerView}</View>
  );
};

export default Auth;

type styleType = {
  mainContainer: ViewStyle;
  card: ViewStyle;
};

const styles = StyleSheet.create<styleType>({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  card: {
    width: 350,
    height: 400,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.light,
    borderBottomWidth: 0,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 2,
    backgroundColor: colors.white,
  },
});
