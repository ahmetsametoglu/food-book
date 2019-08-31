import React, {useState, Fragment} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextStyle,
  ViewStyle,
  Image,
  TouchableHighlight,
} from 'react-native';
import {useReduxContextValue} from '../context/redux-context';
import {mainStyles, colors} from '../utils/helper-style';
import CardFlip from 'react-native-card-flip';
import ProductCamera from '../components/product-camera';
import {useNavigationContextValue} from '../context/navigation-context';

const AddProduct = () => {
  const [takingImage, setTakingImage] = useState<'product' | 'ingredient'>('product');
  const [productImagePath, setProductImagePath] = useState('');
  const [ingredientImagePath, setIngredientImagePath] = useState('');
  const [ingredients, setIngredients] = useState('');
  const {store, services} = useReduxContextValue();
  const {navigation} = useNavigationContextValue();
  const {lastScannedBarcode} = store.productState;
  let flipCard: any;

  const isImagesOK = (): boolean => {
    return productImagePath !== '' && ingredientImagePath !== '';
  };

  const handleProductImagePath = (imagePath: string) => {
    setProductImagePath(imagePath);
    setTakingImage('ingredient');
    flipCard.flip();
  };

  const handleIngredientImagePath = (imagePath: string, ingredientText: string) => {
    console.log(productImagePath);
    setIngredientImagePath(imagePath);
    setIngredients(ingredientText);
  };

  const getImageComponent = (
    <View style={styles.cardContainer}>
      <CardFlip style={styles.flipCard} ref={(card: any) => (flipCard = card)}>
        <View style={styles.card}>
          <ProductCamera
            isCameraActive={takingImage === 'product'}
            description="Tap screen for take a product image"
            handleImagePath={handleProductImagePath}
            enableRecognizeText={false}
          />
        </View>
        <View style={styles.card}>
          <ProductCamera
            isCameraActive={takingImage === 'ingredient'}
            description="Tap screen for take a ingredient image"
            handleImagePath={handleIngredientImagePath}
            enableRecognizeText={true}
          />
        </View>
      </CardFlip>
    </View>
  );

  const imageViewComponent = (
    <View style={styles.imageContainer}>
      <View style={styles.imageView}>
        <Image
          source={{uri: productImagePath}}
          style={{flex: 1, height: '100%', width: '100%', borderRadius: 10}}
          resizeMode="cover"
        />
      </View>
      <View style={styles.imageView}>
        <Image
          source={{uri: ingredientImagePath}}
          style={{flex: 1, height: '100%', width: '100%', borderRadius: 10}}
          resizeMode="cover"
        />
      </View>
    </View>
  );

  const actionButtons = (
    <View style={styles.actionButtons}>
      <TouchableHighlight
        style={[styles.actionButton, {backgroundColor: colors.error}]}
        onPress={() => {
          console.log('cancel button clicked');
          navigation.pop();
        }}>
        <Text style={{color: colors.white}}>Cancel</Text>
      </TouchableHighlight>

      {isImagesOK() && (
        <TouchableHighlight
          style={[styles.actionButton, {backgroundColor: colors.success}]}
          onPress={() => {
            services.appService.showLoading();
            services.productService
              .addProduct({
                barcode: lastScannedBarcode,
                ingredientImageURL: ingredientImagePath,
                productImageURL: productImagePath,
                ingredients: ingredients,
              })
              .then(() => {
                navigation.pop();
                services.appService.hideLoading();
              })
              .catch(() => {
                services.appService.hideLoading();
              });
          }}>
          <Text style={{color: colors.white}}>Send Product</Text>
        </TouchableHighlight>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.barcodeContainer}>
        <Text style={styles.barcodeText}>{lastScannedBarcode}</Text>
      </View>
      {isImagesOK() ? imageViewComponent : getImageComponent}
      {actionButtons}
    </View>
  );
};

const styles = StyleSheet.create<{
  container: ViewStyle;
  barcodeContainer: ViewStyle;
  barcodeText: TextStyle;
  cardContainer: ViewStyle;
  flipCard: ViewStyle;
  card: ViewStyle;
  imageView: ViewStyle;
  imageContainer: ViewStyle;
  actionButtons: ViewStyle;
  actionButton: ViewStyle;
}>({
  container: {
    ...mainStyles.view_centralize_col,
    backgroundColor: colors.primary,
  },
  barcodeContainer: {
    padding: 10,
  },
  barcodeText: {color: colors.light, fontSize: 25},
  cardContainer: {
    flex: 5,
    flexDirection: 'row',
    margin: 20,
  },
  flipCard: {
    height: '100%',
    width: '100%',
  },
  card: {
    flex: 1,
    height: '100%',
    width: '100%',
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
  },
  imageContainer: {
    ...mainStyles.view_centralize_row,
    flex: 5,
    justifyContent: 'space-evenly',
  },
  imageView: {
    height: 200,
    width: 140,
    borderWidth: 1,
    borderRadius: 10,
  },
  actionButtons: {
    ...mainStyles.view_centralize_row,
    justifyContent: 'space-evenly',
  },
  actionButton: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 35,
    borderRadius: 5,
    margin: 5,
    padding: 5,
  },
});

export default AddProduct;
