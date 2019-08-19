import React, {Fragment} from 'react';
import {StatusBar, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const App = () => {
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#007991',
        }}>
        <Icon name="food" size={120} color="#BAD6C2" />
        <Text style={{color: '#BAD6C2', fontSize: 40}}>food book</Text>
      </View>
    </Fragment>
  );
};

export default App;
