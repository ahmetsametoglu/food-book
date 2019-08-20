import {CollectionReference} from 'react-native-firebase/firestore';
import {firestore} from 'react-native-firebase';
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
  products: CollectionReference;

  constructor(private dispatch: Dispatch<ProductActionType>) {
    this.products = firestore().collection('products');
  }

  async getProductWithBarcode(barcode: string): Promise<void> {
    const result = await this.products.doc(barcode).get();
    console.log('result:', result);

    const product = result.exists ? <Product>{_id: result.id, ...result.data()} : undefined;
    console.log('getProductWithBarcode:', product);

    this.dispatch({
      type: 'ScanProduct',
      payload: {
        lastScannedBarcode: barcode,
        lastScannedProduct: product,
      },
    });
  }

  async addProduct(data: {barcode: string; productImageURL: string; ingredientImageURL: string}) {
    const result = await this.products.doc(data.barcode).set({
      _id: data.barcode,
      ...data,
      description: '',
      isHalal: undefined,
      verifiedBy: undefined,
    } as Product);

    console.log(result);
  }
}

export const initialProductState: ProductStateType = {
  lastScannedBarcode: '',
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
