import { StyleSheet, Dimensions } from 'react-native';
import theme from './theme.style';
import { RFValue } from "react-native-responsive-fontsize";

export default StyleSheet.create({
	headerNavContainer: {
		flexDirection: 'column',
		flex: 1,
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
	headerNavTopAppNameButton: {
		marginRight: 20
	},
	headerNavTopAppName: {
		color: theme.COLOR_LABEL,
		justifyContent: 'flex-start',
		fontFamily: 'Montserrat-Bold',
		fontSize: RFValue(20)
	},
	headerNavTopButtons: {
		flexDirection: 'row',
		justifyContent: 'flex-end'
	},
	headerNavTopNotification: {
		width: RFValue(25)
	},
	headerNavTopMenu: {
		width: RFValue(27)
	},
	headerNavProfilePicture: {
		backgroundColor: '#fff',
		height: (Dimensions.get('window').width / 3.5) / 2,
		width: Dimensions.get('window').width,
		borderBottomLeftRadius: 15,
		borderBottomRightRadius: 15,
		position: 'absolute'
	},
	headerNavProfilePictureImage: {
		width: Dimensions.get('window').width / 3.5,
		height: Dimensions.get('window').width / 3.5,
		borderRadius: (Dimensions.get('window').width / 3.5) / 2,
		borderWidth: 3,
		borderColor: theme.COLOR_MEDIUM_BLUE,
		backgroundColor: theme.COLOR_WHITE
	},
	headerNavUserContainer: {
		marginTop: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	headerNavUserName: {
		color: '#fff',
		fontFamily: 'Montserrat-Regular',
		fontSize: RFValue(theme.FONT_SIZE_MEDIUM),
		marginVertical: 3
	},
	headerNavUserRating: {
		color: theme.COLOR_BLACK,
		marginVertical: 3,
		fontFamily: 'Montserrat-Regular',
		fontSize: RFValue(theme.FONT_SIZE_MEDIUM),
	},
	headerNavUserStarContainer: {
		flexDirection: 'row',
		marginHorizontal: 7,
	},
	headerNavUserStar: {
		height: RFValue(theme.FONT_SIZE_MEDIUM),
		width: RFValue(theme.FONT_SIZE_MEDIUM),
		marginHorizontal: 3,
	},
	headerNavUserTotalRating: {
		color: theme.COLOR_BLACK,
		marginVertical: 4,
		fontFamily: 'Montserrat-Regular',
		fontSize: RFValue(theme.FONT_SIZE_SMALL),
	},
	headerNavNotificationContainer: {
		position: 'absolute',
		backgroundColor: theme.COLOR_BLUE,
		height: RFValue(20),
		width: RFValue(20),
		borderRadius: 20,
		top: 0,
		right: -10,
		alignItems: 'center',
		justifyContent: 'center'
	},
	headerNavNotificationText: {
		color: theme.COLOR_WHITE,
		fontSize: RFValue(theme.FONT_SIZE_XSMALL),
	}
});