import React, {Fragment, useState} from 'react';
import {View, Text, StyleSheet, ViewStyle, TouchableHighlight} from 'react-native';
import {colors} from '../utils/helper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ScanBarcode from '../components/scan-barcode';

const Home = () => {
  const [scanProduct, setScanProduct] = useState(false);
  const [lastScannedBarcode, setLastScannedBarcode] = useState('');

  const handleStartScanProduct = () => {
    setScanProduct(true);
  };

  const handleReadBarcode = (code: string) => {
    setScanProduct(false);
    console.log('barcode:', code);
    setLastScannedBarcode(!!code ? code : '');

    // TODO: check is product exist
  };

  const defaultView = (
    <TouchableHighlight
      underlayColor={colors.secondary}
      style={[styles.centralize, {backgroundColor: colors.primary}]}
      onPress={handleStartScanProduct}>
      <Fragment>
        <Icon name="barcode-scan" size={120} color={colors.light} />
        <Text style={{color: colors.light, fontSize: 20, marginTop: 10}}>
          tab to screen for scan product
        </Text>
      </Fragment>
    </TouchableHighlight>
  );

  return scanProduct ? <ScanBarcode handleReadBarcode={handleReadBarcode} /> : defaultView;
};

export default Home;

const styles = StyleSheet.create<{centralize: ViewStyle}>({
  centralize: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
