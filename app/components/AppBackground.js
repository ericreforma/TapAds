import React from 'react';
import { ImageBackground } from 'react-native';
import styles from '../styles/page.Home.style';

export const AppBackground = () => (
  <ImageBackground
      style={styles.homePageBackgroundImage}
      resizeMode="stretch"
      source={require('../assets/image/common_page_background.png')}
  />
);
