import { StyleSheet } from 'react-native';
import theme from './theme.style';

export default StyleSheet.create({
    introContainer: {
      flex: 1,
      paddingVertical: 20,
      paddingHorizontal: 40,
      justifyContent: 'flex-end'
    },
    introTextCommon: {
      marginTop: 10,
      color: theme.COLOR_WHITE,

    },
    landingPageHeader: {
      fontSize: 35,
      fontFamily: 'AvenirLTStd-Heavy'
    },
    landingPageText: {
      fontSize: 20,
      fontFamily: 'AvenirLTStd-Medium',
      marginBottom: 30,
    },
});
