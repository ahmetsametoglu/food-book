import React, {Fragment, useState} from 'react';
import {View, Text, StyleSheet, ViewStyle, TouchableHighlight} from 'react-native';
import {colors} from '../utils/helper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import ScanBarcode from '../components/scan-barcode';
import {useReduxContextValue} from '../context/redux-context';

const Home = () => {
  console.log('[Home Screen]: init');
  const [openScanner, setOpenScanner] = useState(false);

  const {actions, store} = useReduxContextValue();
  const {productState} = store;
  console.log('productState:', productState);

  const handleOpenScanner = () => {
    setOpenScanner(true);
  };

  const handleAddProduct = () => {
    if (productState.lastScannedBarcode) {
      actions.productAction.addProduct({
        barcode: productState.lastScannedBarcode,
        ingredientImageURL: 'ingredientImageURL',
        productImageURL: 'productImageURL',
      });
    }
  };

  const handleReadBarcode = async (code: string) => {
    setOpenScanner(false);
    console.log('barcode:', code);
    if (!!code) {
      actions.appAction.showLoading('product searching...');
      actions.productAction
        .getProductWithBarcode(code)
        .then(_ => {
          actions.appAction.hideLoading();
        })
        .catch(_ => {
          actions.appAction.hideLoading();
        });
    }
  };

  const defaultView = (
    <TouchableHighlight
      underlayColor={colors.secondary}
      style={[styles.centralize, {backgroundColor: colors.primary}]}
      onPress={handleOpenScanner}>
      <Fragment>
        <MaterialCommunityIcons name="barcode-scan" size={120} color={colors.light} />
        <Text style={{color: colors.light, fontSize: 20, marginTop: 10}}>
          tab to screen for scan product
        </Text>
      </Fragment>
    </TouchableHighlight>
  );

  const reScanButton = (
    <TouchableHighlight
      underlayColor={colors.solid}
      onPress={handleOpenScanner}
      style={{flexDirection: 'row', width: '100%'}}>
      <View style={[styles.actionButton, {backgroundColor: colors.primary}]}>
        <MaterialCommunityIcons name="barcode-scan" size={30} color={colors.white} />
        <Text style={{color: colors.white, fontSize: 20, marginLeft: 20}}>Scan New Product</Text>
      </View>
    </TouchableHighlight>
  );

  const addButton = (
    <TouchableHighlight
      underlayColor={colors.solid}
      onPress={handleAddProduct}
      style={{flexDirection: 'row', width: '100%'}}>
      <View style={[styles.actionButton, {backgroundColor: colors.secondary}]}>
        <Entypo name="add-to-list" size={30} color={colors.white} />
        <Text style={{color: colors.white, fontSize: 20, marginLeft: 20}}>Add This Product</Text>
      </View>
    </TouchableHighlight>
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

  const scanResult = (
    <View style={styles.centralize}>
      <View style={[styles.centralize, {width: '100%', backgroundColor: colors.light}]}>
        {!!productState.lastScannedProduct ? productInfo : notFoundInfo}
      </View>
      {!productState.lastScannedProduct && addButton}
      {reScanButton}
    </View>
  );

  let view = defaultView;

  if (openScanner) {
    view = <ScanBarcode handleReadBarcode={handleReadBarcode} />;
  } else if (productState.lastScannedBarcode) {
    view = scanResult;
  }

  return view;
};

export default Home;

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
