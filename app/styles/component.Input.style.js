import { StyleSheet } from 'react-native';
import theme from './theme.style';

export default StyleSheet.create({
    inputTextArea: {
        backgroundColor: '#ffffff00',
        borderBottomColor: theme.COLOR_WHITE,
        borderBottomWidth: 2,
        paddingVertical: 7,
        marginVertical: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputFont: {
        color: theme.COLOR_NORMAL_FONT,
        fontSize: theme.FONT_SIZE_MEDIUM,
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

