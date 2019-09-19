import { Dimensions } from 'react-native';
import { screenSizes } from './variables';
import theme from '../styles/theme.style';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const objValuesHeight = Object.values(screenSizes.height);
const objValuesWidth = Object.values(screenSizes.width);

export const loginStyles = () => {
    let padding = 0,
        fontSize = 15,
        paddingVertical = 5,
        marginVertical = 2,
        marginTop = 25;
    
    if(height >= objValuesHeight[0] && height <= objValuesHeight[1]) {
        padding = 15;
    } else if(height > objValuesHeight[1]) {
        padding = 30;
    }
    
    if(width > objValuesWidth[1]) {
        fontSize = theme.FONT_SIZE_MEDIUM;
        paddingVertical = 7;
        marginVertical = 5;
        marginTop = 40;
    }

    return {
        padding,
        fontSize,
        paddingVertical,
        marginVertical,
        marginTop
    }
}