import { StyleSheet } from 'react-native';
import theme from './theme.style';


export default StyleSheet.create({
    labelText: {
        fontFamily: 'Montserrat-Bold',
    },
    commonText: {
        fontFamily: 'Montserrat-Regular',
    },
    commonFontSize: {
        fontSize: theme.FONT_SIZE_SMALL,
    },
    xsmallFontSize: {
        fontSize: theme.FONT_SIZE_XSMALL,
    },
    textBold: {
        fontFamily: 'Montserrat-Bold',
        fontSize: theme.FONT_SIZE_SMALL,
    },
    textBlack: {
        color: theme.COLOR_BLACK,
    },
    textWhite: {
        color: theme.COLOR_WHITE,
    },
    textGray: {
        color: theme.COLOR_GRAY_BUTTON,
    },
    textBlue: {
        color: theme.COLOR_LIGHT_BLUE,
    },
    textPink: {
        color: theme.COLOR_PINK,
    },
    textCommonColor: {
        color: theme.COLOR_NORMAL_FONT
    },
    textDefault: {
        fontSize: 16
    },
    textLarge: {
        fontSize: theme.FONT_SIZE_MEDIUM
    }
});