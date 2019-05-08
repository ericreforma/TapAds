import { StyleSheet, Dimensions } from 'react-native';
import theme from './theme.style';


export default StyleSheet.create({
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
        flexDirection: 'row',
        marginBottom: 10
    },
    homePageRecommendedCampaignInfoView: {
        flex: 1,
        justifyContent: 'flex-end',
    }
});