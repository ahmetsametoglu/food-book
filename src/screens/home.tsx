import React, {Fragment, useState, useEffect} from 'react';
import {Text, StyleSheet, ViewStyle, TouchableHighlight} from 'react-native';
import {colors} from '../utils/helper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ScanBarcode from '../components/scan-barcode';
import {useReduxContextValue} from '../context/redux-context';
import ScanResult from '../components/scan-result';
import {NavigationPages} from '../navigation/navigation-pages';
import {NavigationProp} from '../models/props.model';
import {useNavigationContextValue} from '../context/navigation-context';

type Props = {} & NavigationProp;

const Home = (props: Props) => {
  console.log('[Home Screen]: init');
  const {setNavigation, navigation} = useNavigationContextValue();
  const [openScanner, setOpenScanner] = useState(false);
  const {services, store} = useReduxContextValue();
  const {productState} = store;

  useEffect(() => {
    setNavigation(props.navigation);
  }, []);

  const handleOpenScanner = () => {
    console.log('handleOpenScanner');

    setOpenScanner(true);
  };

  const handleAddProduct = () => {
    if (productState.lastScannedBarcode) {
      navigation.push(NavigationPages.AddProduct);

      // services.productService.addProduct({
      //   barcode: productState.lastScannedBarcode,
      //   ingredientImageURL: 'ingredientImageURL',
      //   productImageURL: 'productImageURL',
      // });
    }
  };

  const handleReadBarcode = async (code: string) => {
    setOpenScanner(false);
    console.log('barcode:', code);
    if (!!code) {
      services.appService.showLoading('product searching...');
      services.productService
        .getProductWithBarcode(code)
        .then(_ => {
          services.appService.hideLoading();
        })
        .catch(_ => {
          services.appService.hideLoading();
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

  let view = defaultView;

  if (openScanner) {
    view = <ScanBarcode handleReadBarcode={handleReadBarcode} />;
  } else if (productState.lastScannedBarcode) {
    view = <ScanResult onAddProduct={handleAddProduct} onOpenScanner={handleOpenScanner} />;
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
