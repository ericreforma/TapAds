import { StyleSheet, Dimensions } from 'react-native';
import theme from './theme.style';

export default StyleSheet.create({
    containerView: {
        flex: 1,
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        paddingHorizontal: 40
    },
    loginCredentialsView: {
        marginRight: 20
    },
    textNormalLabel: {
        color: theme.COLOR_WHITE,
        fontSize: theme.FONT_SIZE_SMALL,
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
        marginTop: 40,
        marginBottom: 7
    },
    loginAlternativeLabel: {
        marginBottom: 10,
        marginTop: 10,
        fontFamily: 'Montserrat-Light',
        color: theme.COLOR_NORMAL_FONT,
        textAlign: 'right'
    },
    loginAlternativeIconView: {
        flexDirection: 'row',
        marginBottom: 30,
        justifyContent: 'flex-end'
    },
    loginAlternativeIconFacebook: {
        marginLeft: 10,
    }
});