import { StyleSheet, Dimensions } from 'react-native';
import theme from './theme.style';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: theme.COLOR_GRAY_HEAVY
  },

  mapContainer: {
    width: Math.round(Dimensions.get('window').width),
    height: Math.round(Dimensions.get('window').height),
    flex: 1,
  },

  header: {
    backgroundColor: theme.COLOR_DIRTY_WHITE,
    padding: 20,
    zIndex: 1,
    elevation: 3,
    alignSelf: 'stretch'
  },

  headerText: {
    color: theme.COLOR,
    fontSize: 20,
  },

  bottomPanel: {
    backgroundColor: theme.COLOR_DIRTY_WHITE,
    borderRadius: 8,
    margin: 10,
    zIndex: 1,
    elevation: 3,
    alignSelf: 'stretch',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,

  },

  viewCampaignRow: {
    backgroundColor: theme.COLOR_GRAY_LIGHT,
    alignSelf: 'stretch',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 14,
  },

  viewCampaignAlarm: {
    backgroundColor: theme.COLOR_GRAY_LIGHT,
    color: theme.COLOR_BLACK
  },

  textCampaignRow: {
    color: theme.COLOR_BLACK,
    fontSize: 18
  },
  textBrandRow: {
    color: theme.COLOR_GRAY_HEAVY,
    fontSize: 15
  },

  viewCounterRow: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    padding: 14,
  },

  viewColumn: {
    width: '50%'
  },

  textCampaignTraveled: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 23,
    color: theme.COLOR_BLACK
  },

  textCarTraveled: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
    color: theme.COLOR_NORMAL_FONT
  },

  textLocation: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 18,
    textAlign: 'right',
    marginBottom: 4,
    color: theme.COLOR_BLACK
  },

  textTime: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 13,
    textAlign: 'right'
  },

  viewButtonRow: {
    alignItems: 'center',
    alignSelf: 'stretch',
    paddingBottom: 20
  },

  button: {
    fontFamily: 'Montserrat-Regular',
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },

  modalContent: {
    fontFamily: 'Montserrat-Regular',
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    width: 200
  },

  modalSummaryContainer: {
    fontFamily: 'Montserrat-Regular',
    margin: 10,
    borderRadius: 4,
    backgroundColor: 'white',
    padding: 22,
    flex: 1
  },

  modalSummaryTitle: {
    fontFamily: 'Montserrat-Regular',
    alignSelf: 'center',
    fontSize: 18,
    color: theme.COLOR_BLACK,
    marginBottom: 12,

  },
  modalSummaryRow: {
    paddingTop: 5,
    paddingBottom: 5,
    flexDirection: 'row'
  },

  modalSummaryTextKey: {
    fontFamily: 'Montserrat-Regular',
    flex: 1,
    textAlign: 'left',
    color: theme.COLOR_NORMAL_FONT,
    fontSize: 12
  },

  modalSummaryTextValue: {
    fontFamily: 'Montserrat-Regular',
    flex: 1,
    textAlign: 'right',
    fontSize: 14,
    color: theme.COLOR_BLACK,
  }
});
