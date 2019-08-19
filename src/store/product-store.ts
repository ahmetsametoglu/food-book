import {ActionType} from './action-types';
import {Reducer, Dispatch} from 'react';

export type ProductStateType = {};

export type ProductActionType = {
  type: ActionType;
  payload: ProductPayloadType;
};

type ProductPayloadType = {};

export class ProductAction {
  constructor(private dispatch: Dispatch<ProductActionType>) {}
}

export const initialProductState: ProductStateType = {};

export const ProductReducer: Reducer<ProductStateType, ProductActionType> = (
  state = initialProductState,
  action,
) => {
  console.log(`[Product Reducer]: ${action.type}`);

  switch (action.type) {
    default:
      return {...state};
  }
};
