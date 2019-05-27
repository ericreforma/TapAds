import { StyleSheet, Dimensions } from 'react-native';
import theme from './theme.style';

export default StyleSheet.create({
    headerNavContainer: {
        flexDirection: 'column'
    },
    headerNavRowDirection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerNavCenter: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerNavTopContainer: {
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 25
    },
    headerNavTopAppName: {
        color: theme.COLOR_LABEL,
        justifyContent: 'flex-start',
        fontFamily: 'Montserrat-Bold',
        fontSize: 20
    },
    headerNavTopButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    headerNavTopNotification: {
        width: 25
    },
    headerNavTopMenu: {
        width: 27
    },
    headerNavProfilePicture: {
        backgroundColor: '#fff',
        height: (Dimensions.get('window').width / 3.5) / 2,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15
    },
    headerNavProfilePictureImage: {
        width: Dimensions.get('window').width / 3.5,
        height: Dimensions.get('window').width / 3.5,
        borderRadius: (Dimensions.get('window').width / 3.5) / 2,
        marginTop: (Dimensions.get('window').width / 3.5) / 2,
        borderWidth: 3,
        borderColor: theme.COLOR_MEDIUM_BLUE,
        backgroundColor: theme.COLOR_WHITE
    },
    headerNavUserContainer: {
        marginTop: ((Dimensions.get('window').width / 3.5) / 2) + 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerNavUserName: {
        color: '#fff',
        fontFamily: 'Montserrat-Regular',
        fontSize: theme.FONT_SIZE_MEDIUM,
        marginVertical: 3
    },
    headerNavUserRating: {
        color: theme.COLOR_BLACK,
        marginVertical: 3,
        fontFamily: 'Montserrat-Regular',
        fontSize: theme.FONT_SIZE_MEDIUM,
    },
    headerNavUserStarContainer: {
        flexDirection: 'row',
        marginHorizontal: 7,
    },
    headerNavUserStar: {
        height: theme.FONT_SIZE_MEDIUM,
        width: theme.FONT_SIZE_MEDIUM,
        marginHorizontal: 3,
    },
    headerNavUserTotalRating: {
        color: theme.COLOR_BLACK,
        marginVertical: 4,
        fontFamily: 'Montserrat-Regular',
        fontSize: theme.FONT_SIZE_SMALL,
    }
});