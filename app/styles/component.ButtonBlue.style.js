import { StyleSheet } from 'react-native';
import theme from './theme.style';

export default StyleSheet.create({
    buttonStyle: {
        backgroundColor: theme.COLOR_BLUE,
        borderRadius: 20,
        marginVertical: 7,
        paddingHorizontal: 20,
        maxWidth: 200,
        height: 56,
        flexDirection: 'row',
    },
    buttonJustifyContent: {
        justifyContent: 'space-between',
    },
    buttonCenterContent: {
        justifyContent: 'center',
    },
    buttonLabel: {
        color: theme.COLOR_WHITE,
        fontSize: theme.FONT_SIZE_MEDIUM,
        fontFamily: 'Montserrat-Medium',
        paddingVertical: 13,
    },
    buttonIcon: {
        marginVertical: 18,
        height: 18
    }
});