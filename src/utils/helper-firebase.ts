import {UserService} from './../store/user-store';
import storage from '@react-native-firebase/storage';
import vision from '@react-native-firebase/ml-vision';
import auth from '@react-native-firebase/auth';
import {User} from '../models/user';

const uploadImage = (path: string, imageName: string): Promise<string> => {
  return new Promise((res, rej) => {
    storage()
      .ref(`/images/${imageName}`)
      .putFile(path)
      .on('state_changed', taskSnapshot => {
        if (taskSnapshot.state === 'success') {
          res(taskSnapshot.ref.getDownloadURL());
        } else if (taskSnapshot.state !== 'running') {
          rej();
        }
      });
  });
};

const recognizeText = async (imagePath: string) => {
  console.log('text recognizing...');

  try {
    const result = await vision().textRecognizerProcessImage(imagePath);
    return result.text;
  } catch (error) {
    console.log(error);
  }
};

const subscribeAuth = (userService: UserService) => {
  const unSubscribe = auth().onAuthStateChanged(res => {
    console.log('onAuthStateChanged:', res);
    const user: User | undefined = !res
      ? undefined
      : {
          _id: res.uid,
          email: !!res.email ? res.email : '',
          emailVerified: res.emailVerified,
          isAnonymous: res.isAnonymous,
        };
    userService.setUser(user);
  });
  return unSubscribe;
};

const signInAnonymously = async () => {
  console.log('signInAnonymously...');
  try {
    await auth()
      .signInAnonymously()
      .then(res => {
        console.log('signInAnonymously:', res);
      })
      .catch(err => {
        console.log('signInAnonymously err:', err);
      });
  } catch (e) {
    console.error(e);
  }
};

export const authHelper = {
  subscribeAuth,
  signInAnonymously,
};

export const firebaseHelper = {
  uploadImage,
  recognizeText,
};
