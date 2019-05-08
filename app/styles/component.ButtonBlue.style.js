import { StyleSheet } from 'react-native';
import theme from './theme.style';

export default StyleSheet.create({
    buttonStyle: {
        backgroundColor: theme.COLOR_BLUE,
        borderRadius: 15,
        paddingHorizontal: 15,
        maxWidth: 200,
        minWidth: 110,
        height: 45,
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
        fontFamily: 'Montserrat-Medium',
        fontSize: 16,
        paddingVertical: 11,
    },
    buttonIcon: {
        marginVertical: 15,
        height: 14
    }
});