import React, {useState, useRef} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, ViewStyle, Image, FlexStyle} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {colors, mainStyles} from '../utils/helper-style';

type Props = {
  description: string;
  handleImagePath: Function;
  isCameraActive: boolean;
};
const ProductCamera = (props: Props) => {
  const [takenImagePath, setTakenImagePath] = useState('');
  const camera = useRef({} as RNCamera);

  const handleOkButton = () => {
    console.log('click OK');
    props.handleImagePath(takenImagePath);
  };

  const handleRefreshButton = () => {
    console.log('click refresh button');
    setTakenImagePath('');
  };

  const cameraPreview = (
    <View style={styles.cameraPreview}>
      {!!props.isCameraActive && (
        <RNCamera ref={camera} style={styles.camera}>
          <TouchableOpacity
            style={{...mainStyles.view_centralize_col, width: '100%'}}
            onPress={() => {
              camera.current
                .takePictureAsync({fixOrientation: true, width: 400})
                .then((photo: any) => {
                  console.log('photo:', photo);
                  if (!!photo) {
                    setTakenImagePath(photo.uri);
                  }
                });
            }}
          />
        </RNCamera>
      )}
      <View style={styles.descriptionView}>
        <Text
          style={{
            color: colors.white,
            backgroundColor: 'transparent',
            fontWeight: 'bold',
          }}>
          {props.description}
        </Text>
      </View>
    </View>
  );

  const actionButton = (buttonText: string, onPress: Function) => {
    return (
      <TouchableOpacity style={styles.actionButton} onPress={() => onPress()}>
        <Text style={{color: colors.white}}>{buttonText}</Text>
      </TouchableOpacity>
    );
  };

  const actionButtons = (
    <View style={styles.actionButtons}>
      {actionButton('Refresh', handleRefreshButton)}
      {actionButton('OK', handleOkButton)}
    </View>
  );

  const imageView = (
    <View style={styles.imageView}>
      <Image
        style={{flex: 1, height: '100%', width: '100%', borderRadius: 10}}
        resizeMode="cover"
        source={{uri: takenImagePath}}
      />
      {actionButtons}
    </View>
  );

  return !!takenImagePath ? imageView : cameraPreview;
};

const styles = StyleSheet.create<{
  cameraPreview: ViewStyle;
  camera: ViewStyle;
  imageView: ViewStyle;
  descriptionView: ViewStyle & FlexStyle;
  actionButtons: ViewStyle & FlexStyle;
  actionButton: ViewStyle;
}>({
  cameraPreview: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    height: '100%',
    width: '100%',
    overflow: 'hidden',
  },
  camera: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  imageView: {
    ...mainStyles.view_centralize_col,
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
  },
  descriptionView: {
    ...mainStyles.view_centralize_row,
    backgroundColor: colors.transparentBlack,
    padding: 10,
    position: 'absolute',
    bottom: 0,
  },
  actionButtons: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: colors.transparentBlack,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  actionButton: {
    margin: 5,
    padding: 5,
  },
});

export default ProductCamera;
