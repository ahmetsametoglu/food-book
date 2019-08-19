import React, {Fragment, useState} from 'react';
import {StatusBar} from 'react-native';
import Home from './src/screens/home';
import SplashScreen from './src/components/splash-screen';

const App = () => {
  const splashScreen = <SplashScreen />;
  setTimeout(() => {
    const homeContent = <Home />;
    setMainContent(homeContent);
  }, 1000);

  const [mainContent, setMainContent] = useState(splashScreen);

  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      {mainContent}
    </Fragment>
  );
};

export default App;
