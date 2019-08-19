import React, {Fragment, useState} from 'react';
import {StatusBar, View} from 'react-native';
import Home from './src/screens/home';
import SplashScreen from './src/components/splash-screen';
import ReduxContextProvider from './src/context/redux-context';

const App = () => {
  const splashScreen = <SplashScreen />;
  setTimeout(() => {
    const homeContent = (
      <View style={{flex: 1}}>
        <Home />
      </View>
    );
    setMainContent(homeContent);
  }, 1000);

  const [mainContent, setMainContent] = useState(splashScreen);

  return (
    <ReduxContextProvider>
      <Fragment>
        <StatusBar barStyle="dark-content" />
        {mainContent}
      </Fragment>
    </ReduxContextProvider>
  );
};

export default App;
