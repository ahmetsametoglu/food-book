import React from 'react';
import {View, Text, Image, StyleSheet, ViewStyle, FlexStyle, TextStyle} from 'react-native';
import {Product} from '../models/product';
import {colors} from '../utils/helper-style';

type Props = {
  product: Product;
};
const ProductInfo = (props: Props) => {
  const {product} = props;
  return (
    <View style={styles.mainContainer}>
      <Image
        source={{uri: product.productImageURL}}
        style={{height: '100%', width: '100%'}}
        resizeMode="stretch"
      />
      <View style={styles.productInfo}>
        <Text style={styles.barcodeText}>{product.barcode}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create<{
  mainContainer: ViewStyle;
  productInfo: ViewStyle & FlexStyle;
  barcodeText: TextStyle;
}>({
  mainContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  productInfo: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: colors.transparentBlack,
    minHeight: 100,
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  barcodeText: {
    color: colors.light,
    fontSize: 34,
  },
});

export default ProductInfo;
