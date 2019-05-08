import { StyleSheet } from 'react-native';
import theme from './theme.style';

export default StyleSheet.create({
    cardContainer: {
        backgroundColor: theme.COLOR_GRAY_HEAVY + '00'
    },
    cardContainerWithShadow: {
        elevation: 5
    },
    cardContainerWithoutShadow: {
        elevation: 0
    },
    cardPadding: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    cardPaddingFooter: {
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    cardBody: {
        backgroundColor: theme.COLOR_WHITE
    },
    cardPaddingBody: {
        paddingHorizontal: 20,
        paddingVertical: 15
    },
    cardBodyDivider: {
        marginHorizontal: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#e7e7e7',
    },
    cardRadiusTop: {
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    cardRadiusBottom: {
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15
    },
    cardHeaderActive: {
        backgroundColor: theme.COLOR_DIRTY_WHITE,
    },
    cardHeaderInactive: {
        backgroundColor: theme.COLOR_GRAY_LIGHT,
    },
    cardFooterActive: {
        backgroundColor: theme.COLOR_GRAY_HEAVY
    },
    cardFooterInactive: {
        backgroundColor: theme.COLOR_GRAY_MEDIUM
    },
    cardFooterJustifyContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    cardFooterCenter: {
        justifyContent: 'center',
    },
    cardJustifyContent: {
        flexDirection: 'row',
    },
    cardCenter: {
        justifyContent: 'center',
    },
    cardColumnContent: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingBottom: 20
    },
    cardColumnContentFirst: {
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
    },
    cardColumnContentLast: {
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
    },
    cardColumnContentDefault: {
        borderRadius: 0
    },
    cardColumnContentCarInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardColumnContentCarInfoImageView: {
        backgroundColor: theme.COLOR_BLUE,
        paddingHorizontal: 12,
        paddingLeft: 15,
        paddingRight: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20
    },
    cardColumnContentCarInfoImage: {
        width: 35
    },
    cardColumnContentCarInfoType: {
        paddingRight: 12,
        color: theme.COLOR_NORMAL_FONT,
        fontFamily: 'Montserrat-Bold'
    },
    cardColumnContentButtonViewInfo: {
        paddingHorizontal: 12,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    cardColumnContentBody: {
        paddingVertical: 12,
        marginHorizontal: 12
    },
    cardBodyContentDivider: {
        backgroundColor: '#e7e7e7',
        height: 2,
        marginHorizontal: 12
    }
});