import React from 'react';
import {View, StyleSheet, Vibration} from 'react-native';
import {RNCamera} from 'react-native-camera';
import Icon from 'react-native-vector-icons/FontAwesome';

type Props = {
  handleReadBarcode: Function;
};

const ScanBarcode = (props: Props) => {
  return (
    <View style={styles.container}>
      <Icon.Button name="close" onPress={() => props.handleReadBarcode()} />
      <RNCamera
        style={styles.preview}
        onBarCodeRead={e => {
          Vibration.vibrate(100);
          props.handleReadBarcode(e.data);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default ScanBarcode;
