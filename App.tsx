import React, {useState, useEffect} from 'react';
import {StatusBar, View} from 'react-native';
import SplashScreen from './src/screens/splash-screen';
import ReduxContextProvider from './src/context/redux-context';
import NavigationContextProvider from './src/context/navigation-context';
import MainScreen from './src/screens/main-screen';

const App = () => {
  console.log('[App]: init');
  const splashScreen = <SplashScreen />;

  const homeContent = (
    <NavigationContextProvider>
      <ReduxContextProvider>
        <MainScreen></MainScreen>
      </ReduxContextProvider>
    </NavigationContextProvider>
  );

  const [mainContent, setMainContent] = useState(splashScreen);

  useEffect(() => {
    console.log('[App]: useEffect');
    setTimeout(() => {
      setMainContent(homeContent);
    }, 1000);
  }, []);

  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="dark-content" />
      {mainContent}
    </View>
  );
};

export default App;
