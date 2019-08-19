import { UserStateType, UserAction, UserReducer, initialUserState } from './../store/user-store';
import { AppStateType, AppAction, AppReducer, initialAppState } from '../store/app-store';
import {
  ProductReducer,
  initialProductState,
  ProductStateType,
  ProductAction,
} from './../store/product-store';
import { useReducer } from 'react';

export type ReduxValueType = {
  store: {
    appState: AppStateType;
    productState: ProductStateType;
    userState: UserStateType;
  };
  actions: {
    appAction: AppAction;
    productAction: ProductAction;
    userAction: UserAction;
  };
};

export const getReduxContextValue = (): ReduxValueType => {
  const [appState, appDispatch] = useReducer(AppReducer, initialAppState);
  const appAction = new AppAction(appDispatch);

  const [productState, productDispatch] = useReducer(ProductReducer, initialProductState);
  const productAction = new ProductAction(productDispatch);

  const [userState, userDispatch] = useReducer(UserReducer, initialUserState);
  const userAction = new UserAction(userDispatch);

  const value: ReduxValueType = {
    store: { appState, productState, userState },
    actions: { appAction, productAction, userAction },
  };

  return value;
};
