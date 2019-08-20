import React, {Fragment, ReactChild} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {useReduxContextValue} from '../../context/redux-context';
import {colors} from '../../utils/helper';

type Props = {
  children: ReactChild;
};

const Loading = (props: Props) => {
  const {showLoading, loadingText} = useReduxContextValue().store.appState;

  if (!showLoading) {
    return <Fragment>{props.children}</Fragment>;
  } else {
    return (
      <Fragment>
        {props.children}
        <View
          style={{
            zIndex: 50,
            position: 'absolute',
            flex: 1,
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.loadingBackgroundColor,
          }}>
          <ActivityIndicator size={50} color={colors.primary} />
          {!!loadingText && (
            <Text style={{fontSize: 20, color: colors.secondary, marginTop: 10}}>
              {loadingText}
            </Text>
          )}
        </View>
      </Fragment>
    );
  }
};

export default Loading;
