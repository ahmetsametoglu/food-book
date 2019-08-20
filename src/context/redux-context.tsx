import React, {createContext, useContext, useReducer, ReactChild} from 'react';
import {ReduxValueType, getReduxContextValue} from './redux-value';

export const ReduxContext = createContext<ReduxValueType>({} as ReduxValueType);
export const useReduxContextValue = () => useContext(ReduxContext);

type Props = {
  children: ReactChild;
};

const ReduxContextProvider = (props: Props) => {
  console.log('[ReduxContext]: init');
  const appReduxValue = getReduxContextValue();

  return <ReduxContext.Provider value={appReduxValue}>{props.children}</ReduxContext.Provider>;
};

export default ReduxContextProvider;
