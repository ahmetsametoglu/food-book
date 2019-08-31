import {firebaseHelper} from './../utils/helper-firebase';
import firestore, {Firestore} from '@react-native-firebase/firestore';
import {Product} from './../models/product';
import {ActionType} from './action-types';
import {Reducer, Dispatch} from 'react';

export type ProductStateType = {
  lastScannedBarcode: string;
  lastScannedProduct?: Product;
};

export type ProductActionType = {
  type: ActionType;
  payload: ProductPayloadType;
};

type ProductPayloadType = {
  lastScannedBarcode: string;
  lastScannedProduct?: Product;
};

export class ProductService {
  productsRef: Firestore.CollectionReference;

  constructor(private dispatch: Dispatch<ProductActionType>) {
    this.productsRef = firestore().collection('products');
  }

  async getProductWithBarcode(barcode: string): Promise<void> {
    try {
      const result = await this.productsRef.doc(barcode).get();
      const product =
        !!result && result.exists ? <Product>{_id: result.id, ...result.data()} : undefined;
      this.dispatch({
        type: 'ScanProduct',
        payload: {
          lastScannedBarcode: barcode,
          lastScannedProduct: product,
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  async addProduct(data: {
    barcode: string;
    productImageURL: string;
    ingredientImageURL: string;
    ingredients: string;
  }) {
    const imageUpload1 = firebaseHelper.uploadImage(data.productImageURL, `p-${data.barcode}`);
    const imageUpload2 = firebaseHelper.uploadImage(data.ingredientImageURL, `i-${data.barcode}`);
    const [productImageURL, ingredientImageURL] = await Promise.all([imageUpload1, imageUpload2]);

    data.productImageURL = productImageURL;
    data.ingredientImageURL = ingredientImageURL;
    const result = await this.productsRef.doc(data.barcode).set({
      _id: data.barcode,
      ...data,
      description: '',
      isHalal: undefined,
      verifiedBy: undefined,
    } as Product);
  }
}

export const initialProductState: ProductStateType = {
  lastScannedBarcode: 'test',
  lastScannedProduct: undefined,
};

export const ProductReducer: Reducer<ProductStateType, ProductActionType> = (
  state = initialProductState,
  action,
) => {
  console.log(`[Product Reducer]: ${action.type}`);

  switch (action.type) {
    case 'ScanProduct':
      return {
        ...state,
        lastScannedBarcode: action.payload.lastScannedBarcode,
        lastScannedProduct: action.payload.lastScannedProduct,
      };
    default:
      return {...state};
  }
};
