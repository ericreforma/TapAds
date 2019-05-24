import { StyleSheet, Dimensions } from 'react-native';
import theme from './theme.style';


export default StyleSheet.create({
    homePageBackgroundImage: {
        width: '100%',
        minHeight: Dimensions.get('window').height,
        position: 'absolute'
    },
    homePageScrollView: {
        marginBottom: 60,
    },
    homePageSectionVerticalMargin: {
        marginVertical: 10
    },
    homePageContainer: {
        paddingVertical: 20,
    },
    homePageRecommendedContainer: {
        flexDirection: 'column'
    },
    homePageRecommendedLabel: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: theme.PAGE_PADDING_HORIZONTAL
    },
    homePageViewAll: {
        fontFamily: 'Montserrat-Regular',
        color: theme.COLOR_PINK
    },
    homePageContentPadding: {
        paddingVertical: 20
    },
    homePageCategoryLabel: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    homePageCategoryLabelLine: {
        flex: 1,
        height: 2,
        backgroundColor: theme.COLOR_WHITE,
    },
    homePageCategoryLabelText: {
        paddingHorizontal: 20
    },
    homePageCampaignContainer: {
        marginVertical: 10,
        paddingHorizontal: theme.PAGE_PADDING_HORIZONTAL
    },
    homePageCampaignLabel: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    homePageCampaignCardContainer: {
        marginVertical: 5
    },
    homePageCampaignCardInfoWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    homePageCampaignCardInfoLabel: {
        flex: 1,
        textAlign: 'left',
        fontFamily: 'Montserrat-Regular',
        fontSize: theme.FONT_SIZE_SMALL,
        color: theme.COLOR_NORMAL_FONT,
        paddingRight: 1.5
    },
    homePageCampaignCardInfoValue: {
        flex: 1,
        textAlign: 'right',
        fontFamily: 'Montserrat-Bold',
        fontSize: theme.FONT_SIZE_SMALL,
        color: theme.COLOR_NORMAL_FONT,
        paddingLeft: 1.5
    },
    homePageLabelText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 16
    },
    homePageCommonText: {
        fontSize: theme.FONT_SIZE_SMALL,
        fontFamily: 'Montserrat-Regular',
    },
    homePageTextBlack: {
        color: theme.COLOR_BLACK,
    },
    homePageTextWhite: {
        color: theme.COLOR_WHITE,
    },
    homePageTextCommonColor: {
        color: theme.COLOR_NORMAL_FONT
    },
    homePageDescriptionText: {
        lineHeight: 18,
        height: Dimensions.get('window').height * 0.115
    },
    homePageOfTextBlack: {
        fontFamily: 'Montserrat-Regular',
        color: theme.COLOR_BLACK,
        fontSize: 16,
        marginHorizontal: 5
    },
    homePageRecommendedCampaignInfoContainer: {
        backgroundColor: theme.COLOR_WHITE,
        borderRadius: 15
    },
    homePageRecommendedCampaignBody: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginBottom: 10
    },
    homePageRecommendedCampaignFirstCol: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-start'
    },
    homePageAlignCenter: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    homePageAlignRight: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    homePageAlignLeft: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    homePageCategoryDescriptionContainer: {
        height: 3,
        width: 25,
        backgroundColor: theme.COLOR_WHITE,
        marginVertical: 10
    },
    homePageCategoryDescriptionWrapper: {
        height: 35
    }
});