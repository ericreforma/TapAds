import {StyleSheet, Dimensions} from 'react-native';
import theme from './theme.style';
import {RFValue} from 'react-native-responsive-fontsize';
const width = Dimensions.get('window').width;

export default StyleSheet.create({
  scrollView: {
    marginBottom: 60
  },
  viewProfileButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5
  },
  pinkButton: {
    fontSize: RFValue(13),
    fontFamily: 'Montserrat-Medium',
    color: theme.COLOR_PINK
  },
  cardContainer: {
    marginVertical: 20,
    marginHorizontal: theme.PAGE_PADDING_HORIZONTAL
  },
  cardHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cardBodyContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  earningWrapper: {
    marginTop: 15,
    marginBottom: 5
  },
  earningText: {
    fontSize: RFValue(45),
    color: theme.COLOR_NORMAL_FONT,
    fontFamily: 'Montserrat-Bold'
  },
  historyContainer: {
    marginTop: 10
  },
  historyCardContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  historyDateContainer: {
    width: width / 4.5,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  historyEarningsContainer: {
    width: width / 4,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  contentFlex: {
    flex: 1
  }
});