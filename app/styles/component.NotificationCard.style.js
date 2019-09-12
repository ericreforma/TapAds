import { StyleSheet, Dimensions } from 'react-native';
import theme from './theme.style';

export default StyleSheet.create({
    cardContainer: {
        marginVertical: 10,
        borderRadius: 15,
        backgroundColor: theme.COLOR_WHITE,
        padding: 20,
        margin: 5,
        elevation: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    cardBodyClientLabel: {
        color: theme.COLOR_BLACK,
        fontFamily: 'Montserrat-Bold',
        fontSize: 16
    },
    cardBodyMessageText: {
        fontFamily: 'Montserrat-Light',
        fontSize: theme.FONT_SIZE_SMALL
    },
    cardBodyIconSize: {
        width: Dimensions.get('window').width / 15
    },
    cardBodyMessageTextApprove: {
        color: theme.COLOR_GREEN
    },
    cardBodyMessageTextReject: {
        color: theme.COLOR_RED,
    },
    cardBodyMessageTextDefault: {
        color: theme.COLOR_NORMAL_FONT,
    }
});