import React, {useState, useEffect} from 'react';
import {StatusBar, View} from 'react-native';
import SplashScreen from './src/components/splash-screen';
import ReduxContextProvider from './src/context/redux-context';
import Loading from './src/components/hocs/loading';
import StackNav from './src/navigation/stack-nav';

const App = () => {
  const splashScreen = <SplashScreen />;

  const homeContent = (
    <ReduxContextProvider>
      <Loading>
        <StackNav />
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
