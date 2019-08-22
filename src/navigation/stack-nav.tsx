import {createAppContainer, createStackNavigator} from 'react-navigation';
import {colors} from '../utils/helper-style';
import Home from '../screens/home';
import AddProduct from '../screens/add-product';

const StackNav = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        header: null,
      },
    },
    AddProduct: {
      screen: AddProduct,
      navigationOptions: ({}) => ({}),
    },
  },
  {
    defaultNavigationOptions: {
      headerTintColor: colors.white,
      headerStyle: {
        height: 40,
        backgroundColor: colors.primary,
        borderBottomColor: colors.secondary,
      },
      headerBackTitle: null,
    },
  },
);

export default createAppContainer(StackNav);
