import { StyleSheet, Dimensions } from 'react-native';
import theme from './theme.style';


export default StyleSheet.create({
    navigationContainer: {
        position: 'absolute',
        top: 0
    },
    navigationBackground: {
        backgroundColor: theme.COLOR_BLACK,
    },
    navigationContentContainer: {
        backgroundColor: theme.COLOR_BLUE,
        width: 330,
        position: 'absolute',
        top: 70,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        padding: 15
    },
    navigationCloseButton: {
        alignSelf: 'flex-start',
    },
    navigationCloseText: {
        color: theme.COLOR_WHITE,
        fontFamily: 'Montserrat-Regular'
    },
    navigationContentBody: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        padding: 20
    },
    navigationContentBodyTop: {
        flex: 1,
        alignItems: 'flex-end',
    },
    navigationContentBodyTopWrapper: {
        width: 210,
        borderBottomWidth: 1,
        borderBottomColor: theme.COLOR_WHITE,
        paddingVertical: 10,
    },
    navigationContentBodyTopWrapperFirstChild: {
        borderTopWidth: 1,
        borderTopColor: theme.COLOR_WHITE,
    },
    navigationContentBodyTopSpaceBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    navigationContentBodyBottom: {
        flex: 1,
        width: 150,
        marginTop: 100,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    navigationContentBodyBottomWrapper: {
        borderBottomWidth: 0.5,
        borderBottomColor: theme.COLOR_WHITE,
        paddingVertical: 10
    },
    navigationContentBodyBottomText: {
        fontFamily: 'Montserrat-Regular',
        fontSize: theme.FONT_SIZE_SMALL,
        color: theme.COLOR_WHITE,
        textAlign: 'right'
    },
    navigationContentBodyBottomLogout: {
        paddingVertical: 10
    }
});