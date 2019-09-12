import { StyleSheet, Dimensions } from 'react-native';
import theme from './theme.style';

export default StyleSheet.create({
    notifPageBackgroundImage: {
        width: '100%',
        minHeight: Dimensions.get('window').height,
        position: 'absolute'
    },
    notifPageScrollView: {
        marginBottom: 60,
    },
    notifPageContentMargin: {
        marginVertical: 20
    },
    notifPageContentLabelWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    notifPageContentLabelText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 16,
        color: theme.COLOR_WHITE
    },
    notifPageContentContainer: {
        paddingHorizontal: theme.PAGE_PADDING_HORIZONTAL
    },
    notifPageContentBodyWrapper: {
        borderRadius: 15,
        backgroundColor: theme.COLOR_WHITE,
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
    notifPageNoNotif: {
        alignItems: 'center',
        justifyContent: 'center',
    }
});