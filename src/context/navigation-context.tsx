import React, {createContext, useContext, ReactChild, useState} from 'react';
import {NavigationScreenProp} from 'react-navigation';

type NavigationValueType = {
  navigation: NavigationScreenProp<any, any>;
  setNavigation: Function;
};

export const NavigationContext = createContext<NavigationValueType>({} as NavigationValueType);
export const useNavigationContextValue = () => useContext(NavigationContext);

type Props = {
  children: ReactChild;
};

const NavigationContextProvider = (props: Props) => {
  const [navigation, setNavigation] = useState({} as NavigationScreenProp<any, any>);

  return (
    <NavigationContext.Provider
      value={{
        navigation: navigation,
        setNavigation: (nav: NavigationScreenProp<any, any>) => {
          setNavigation(nav);
        },
      }}>
      {props.children}
    </NavigationContext.Provider>
  );
};

export default NavigationContextProvider;
