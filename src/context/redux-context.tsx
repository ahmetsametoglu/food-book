import React, {createContext, useContext, ReactChild} from 'react';
import {ReduxValueType, getReduxContextValue} from './redux-value';

export const ReduxContext = createContext<ReduxValueType>({} as ReduxValueType);
export const useReduxContextValue = () => useContext(ReduxContext);

type Props = {
  children: ReactChild;
};

const ReduxContextProvider = (props: Props) => {
  const appReduxValue = getReduxContextValue();

  return <ReduxContext.Provider value={appReduxValue}>{props.children}</ReduxContext.Provider>;
};

export default ReduxContextProvider;
