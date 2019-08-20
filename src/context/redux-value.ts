import {UserStateType, UserService, UserReducer, initialUserState} from './../store/user-store';
import {AppStateType, AppService, AppReducer, initialAppState} from '../store/app-store';
import {
  ProductReducer,
  initialProductState,
  ProductStateType,
  ProductService,
} from './../store/product-store';
import {useReducer} from 'react';

export type ReduxValueType = {
  store: {
    appState: AppStateType;
    productState: ProductStateType;
    userState: UserStateType;
  };
  services: {
    appService: AppService;
    productService: ProductService;
    userService: UserService;
  };
};

export const getReduxContextValue = (): ReduxValueType => {
  const [appState, appDispatch] = useReducer(AppReducer, initialAppState);
  const appService = new AppService(appDispatch);

  const [productState, productDispatch] = useReducer(ProductReducer, initialProductState);
  const productService = new ProductService(productDispatch);

  const [userState, userDispatch] = useReducer(UserReducer, initialUserState);
  const userService = new UserService(userDispatch);

  const value: ReduxValueType = {
    store: {appState, productState, userState},
    services: {appService: appService, productService: productService, userService: userService},
  };

  return value;
};
