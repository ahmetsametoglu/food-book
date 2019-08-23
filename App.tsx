import React, {useState, useEffect} from 'react';
import {StatusBar, View} from 'react-native';
import SplashScreen from './src/screens/splash-screen';
import ReduxContextProvider from './src/context/redux-context';
import Loading from './src/components/hocs/loading';
import StackNav from './src/navigation/stack-nav';
import NavigationContextProvider from './src/context/navigation-context';

const App = () => {
  const splashScreen = <SplashScreen />;

  const homeContent = (
    <NavigationContextProvider>
      <ReduxContextProvider>
        <Loading>
          <StackNav />
        </Loading>
      </ReduxContextProvider>
    </NavigationContextProvider>
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
