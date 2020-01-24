import { StyleSheet } from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import theme from './theme.style';
 
export default StyleSheet.create({
	labelText: {
		fontFamily: 'Montserrat-Bold',
	},
	commonText: {
		fontFamily: 'Montserrat-Regular',
	},
	commonFontSize: {
		fontSize: RFValue(theme.FONT_SIZE_SMALL),
	},
	xsmallFontSize: {
		fontSize: RFValue(theme.FONT_SIZE_XSMALL),
	},
	textBold: {
		fontFamily: 'Montserrat-Bold',
		fontSize: RFValue(theme.FONT_SIZE_SMALL),
	},
	textBlack: {
		color: theme.COLOR_BLACK,
	},
	textWhite: {
		color: theme.COLOR_WHITE,
	},
	textGray: {
		color: theme.COLOR_GRAY_BUTTON,
	},
	textBlue: {
		color: theme.COLOR_LIGHT_BLUE,
	},
	textPink: {
		color: theme.COLOR_PINK,
	},
	textCommonColor: {
		color: theme.COLOR_NORMAL_FONT
	},
	textDefault: {
		fontSize: RFValue(15)
	},
	textLarge: {
		fontSize: RFValue(theme.FONT_SIZE_MEDIUM)
	}
});