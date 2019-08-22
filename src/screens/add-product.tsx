import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useReduxContextValue} from '../context/redux-context';

const AddProduct = () => {
  const {store, services} = useReduxContextValue();

  const {lastScannedBarcode} = store.productState;

  return (
    <View>
      <Text>{lastScannedBarcode}</Text>
    </View>
  );
};

const style = StyleSheet.create<{}>({});

export default AddProduct;
