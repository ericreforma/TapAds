import { StyleSheet } from 'react-native';
import theme from './theme.style';


export default StyleSheet.create({
    labelText: {
        fontFamily: 'Montserrat-Bold',
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
    textBlue: {
        color: theme.COLOR_LIGHT_BLUE,
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