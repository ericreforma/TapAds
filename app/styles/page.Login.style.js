import { StyleSheet } from 'react-native';
import theme from './theme.style';

export default StyleSheet.create({
    containerView: {
        flex: 1,
        paddingHorizontal: 40,
        justifyContent: 'flex-end'
    },
    loginCredentialsView: {
        marginRight: 20
    },
    textNormalLabel: {
        color: theme.COLOR_WHITE,
        fontFamily: 'Montserrat-Regular'
    },
    textNormalLabelMargin: {
        marginTop: 5
    },
    textSignUp: {
        color: theme.COLOR_WHITE,
        fontFamily: 'Montserrat-Bold',
    },
    loginButton: {
        marginTop: 40
    },
    loginAlternativeLabel: {
        marginBottom: 10,
        fontFamily: 'Montserrat-Light',
        color: theme.COLOR_NORMAL_FONT,
        textAlign: 'right'
    },
    loginAlternativeIconView: {
        flexDirection: 'row',
        marginBottom: 20,
        justifyContent: 'flex-end'
    },
    loginAlternativeIconFacebook: {
        marginLeft: 10,
    }
});