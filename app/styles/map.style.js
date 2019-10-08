import { StyleSheet } from 'react-native';
import theme from './theme.style';

export default StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    overflow: "hidden",
    borderTopLeftRadius: theme.PAGE_CARD_RADIUS,
    borderTopRightRadius: theme.PAGE_CARD_RADIUS

  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  loader: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
