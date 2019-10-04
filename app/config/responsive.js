import { Dimensions } from 'react-native';
import { screenSizes } from './variables';
import theme from '../styles/theme.style';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const objValuesHeight = Object.values(screenSizes.height);
const objValuesWidth = Object.values(screenSizes.width);

let styles = {
    login: {
        padding: 0,
        fontSize: 15,
        paddingVertical: 5,
        marginVertical: 2,
        paddingHorizontal: 30,
        marginTop: 25
    },
    notif: {
        padding: 15
    }
};
    
if(height >= objValuesHeight[0] && height <= objValuesHeight[1]) {
    styles.login.padding = 15;
} else if(height > objValuesHeight[1]) {
    styles.login.padding = 30;
}

if(width > objValuesWidth[1]) {
    styles.login.fontSize = theme.FONT_SIZE_MEDIUM;
    styles.login.paddingVertical = 7;
    styles.login.marginVertical = 5;
    styles.login.marginTop = 40;
    styles.login.paddingHorizontal = 40;

    styles.notif.padding = 20;
}

export const loginStyles = () => {
    return styles.login;
}

export const notifStyles = () => {
    return styles.notif;
};