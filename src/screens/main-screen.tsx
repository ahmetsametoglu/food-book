import React, {useEffect} from 'react';
import {useReduxContextValue} from '../context/redux-context';
import {authHelper} from '../utils/helper-firebase';
import Loading from '../components/hocs/loading';
import StackNav from '../navigation/stack-nav';

const MainScreen = () => {
  const {services, store} = useReduxContextValue();

  useEffect(() => {
    console.log('[MainScreen]: useEffect auth');
    const subscription = authHelper.subscribeAuth(services.userService);
    authHelper.signInAnonymously();
    return subscription;
  }, []);

  return (
    <Loading>
      <StackNav />
    </Loading>
  );
};

export default MainScreen;
