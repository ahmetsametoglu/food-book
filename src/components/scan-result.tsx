import React, {ReactChild, Fragment} from 'react';
import {View, Text, TouchableHighlight, StyleSheet, ViewStyle} from 'react-native';
import {colors} from '../utils/helper';
import {Color} from 'csstype';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useReduxContextValue} from '../context/redux-context';

type Props = {
  onOpenScanner: Function;
  onAddProduct: Function;
};
const ScanResult = (props: Props) => {
  const {store} = useReduxContextValue();
  const {productState} = store;

  const reScanButton = (
    <ActionButton
      buttonColor={colors.primary}
      onPress={() => props.onOpenScanner()}
      buttonText="Scan New Product">
      <MaterialCommunityIcons name="barcode-scan" size={30} color={colors.white} />
    </ActionButton>
  );

  const addButton = (
    <ActionButton
      buttonColor={colors.secondary}
      onPress={() => props.onAddProduct()}
      buttonText="Add This Product">
      <Entypo name="add-to-list" size={30} color={colors.white} />
    </ActionButton>
  );

  const productInfo = productState.lastScannedProduct ? (
    <Fragment>
      <Text style={{color: colors.success, fontSize: 34}}>Product Found</Text>
      <Text style={{color: colors.primary, fontSize: 30}}>
        {productState.lastScannedProduct.barcode}
      </Text>
    </Fragment>
  ) : null;

  const notFoundInfo = (
    <Fragment>
      <Text style={{color: colors.error, fontSize: 34}}>Product Not Found</Text>
      <Text style={{color: colors.error, fontSize: 30}}>{productState.lastScannedBarcode}</Text>
    </Fragment>
  );

  return (
    <View style={styles.centralize}>
      <View style={[styles.centralize, {width: '100%', backgroundColor: colors.light}]}>
        {!!productState.lastScannedProduct ? productInfo : notFoundInfo}
      </View>
      {!productState.lastScannedProduct && addButton}
      {reScanButton}
    </View>
  );
};

export default ScanResult;

const ActionButton = (props: {
  onPress: Function;
  children: ReactChild;
  buttonColor: Color;
  buttonText: string;
}) => {
  return (
    <TouchableHighlight
      underlayColor={colors.solid}
      onPress={() => props.onPress()}
      style={{flexDirection: 'row', width: '100%'}}>
      <View style={[styles.actionButton, {backgroundColor: props.buttonColor}]}>
        {props.children}
        <Text style={{color: colors.white, fontSize: 20, marginLeft: 20}}>{props.buttonText}</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create<{
  centralize: ViewStyle;
  actionButton: ViewStyle;
}>({
  centralize: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  actionButton: {
    flexDirection: 'row',
    padding: 5,
    flex: 1,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
