import { StyleSheet } from 'react-native';
import theme from './theme.style';


export default StyleSheet.create({
    labelText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 16
    },
    commonText: {
        fontSize: theme.FONT_SIZE_SMALL,
        fontFamily: 'Montserrat-Regular',
    },
    textBlack: {
        color: theme.COLOR_BLACK,
    },
    textWhite: {
        color: theme.COLOR_WHITE,
    },
    textCommonColor: {
        color: theme.COLOR_NORMAL_FONT
    }
});