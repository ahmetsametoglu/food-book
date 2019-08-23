import firebase, {storage} from 'react-native-firebase';

export const uploadImage = (path: string) => {
  console.log(firebase.app());
  try {
    storage()
      .ref(`tutorials/images/test`)
      .putFile(path)
      .then(result => console.log(result))
      .catch(err => console.error(err));
  } catch (error) {
    console.log(error);
  }
};
