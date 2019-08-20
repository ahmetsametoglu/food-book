import React, {useState, useEffect} from 'react';
import {StatusBar, View} from 'react-native';
import Home from './src/screens/home';
import SplashScreen from './src/components/splash-screen';
import ReduxContextProvider from './src/context/redux-context';
import Loading from './src/components/hocs/loading';

const App = () => {
  const splashScreen = <SplashScreen />;

  const homeContent = (
    <ReduxContextProvider>
      <Loading>
        <Home />
      </Loading>
    </ReduxContextProvider>
  );

  const [mainContent, setMainContent] = useState(splashScreen);

  useEffect(() => {
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
