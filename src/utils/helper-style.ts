import {StyleSheet, ViewStyle} from 'react-native';
export const colors = {
  primary: '#007991',
  secondary: '#409985',
  third: '#BAD6C2',
  error: '#C42847',
  success: '#2D8652',
  light: '#BAD6C2',
  dark: '#202A4F',
  solid: '#E8D784',
  loadingBackgroundColor: '#80B3E5C8',
  transparentBlack: '#000000ad',
  white: '#ffff',
};

type mainStylesType = {
  view_centralize: ViewStyle;
  view_centralize_col: ViewStyle;
  view_centralize_row: ViewStyle;
  view_borderControl: ViewStyle;
};
export const mainStyles = StyleSheet.create<mainStylesType>({
  view_centralize: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  view_centralize_col: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100%',
  },
  view_centralize_row: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  view_borderControl: {
    borderWidth: 1,
    borderColor: colors.error,
    backgroundColor: colors.solid,
  },
});
