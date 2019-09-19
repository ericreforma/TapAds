import { StyleSheet, Dimensions } from 'react-native';
import theme from './theme.style';
import { loginStyles } from '../config/responsive';

export default StyleSheet.create({
    inputTextArea: {
        backgroundColor: '#ffffff00',
        borderBottomColor: theme.COLOR_WHITE,
        borderBottomWidth: 2,
        paddingVertical: loginStyles().paddingVertical,
        marginVertical: loginStyles().marginVertical,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputFont: {
        color: theme.COLOR_NORMAL_FONT,
        fontSize: loginStyles().fontSize,
        fontFamily: 'Montserrat-Light',
        paddingHorizontal: 20
    },
    inputText: {
        backgroundColor: '#00000000',
        paddingVertical: 5
    },
    inputIconStyle: {
        backgroundColor: '#00000000',
        width: 22,
    }
});

