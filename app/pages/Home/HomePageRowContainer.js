import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import NavigationService from '../../services/navigation';

import theme from '../../styles/theme.style';

export const HomePageRowContainer = ({
  children,
  headerLeftText,
  headerRightText,
  headerCenterText,
  headerRightUrl,
  visible = true
}) => {
  const HeaderText = {
    Left: () => (
      <Text
        style={{
          fontFamily: 'Montserrat-Bold',
          fontSize: RFValue(15),
          color: theme.COLOR_WHITE
        }}
        numberOfLines={1}
      >{headerLeftText}</Text>
    ),
    Center: () => (
      <Text
        style={{
          fontFamily: 'Montserrat-Bold',
          fontSize: RFValue(15),
          color: theme.COLOR_WHITE
        }}
        numberOfLines={1}
      >{headerCenterText}</Text>
    ),
    Right: () => {
      const fontColor = headerRightUrl ? theme.COLOR_PINK : theme.COLOR_WHITE;
      const buttonDisable = headerRightUrl ? false : true;
      const fontFamily = headerRightUrl ? 'Montserrat-Medium' : 'Montserrat-Bold';
      const fontSize = headerRightUrl ? RFValue(12) : RFValue(15);
  
      return (
        <TouchableOpacity
          disabled={buttonDisable}
          onPress={e => NavigationService.navigate(headerRightUrl)}
        >
          <Text
            style={{
              fontFamily,
              fontSize,
              color: fontColor
            }}
            numberOfLines={1}
          >{headerRightText}</Text>
        </TouchableOpacity>
      );
    }
  }

  const HorizontalHeader = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <View
          style={{
            flex: 1,
            height: 2,
            backgroundColor: theme.COLOR_WHITE
          }}
        />

        <View
          style={{
            paddingHorizontal: 20
          }}
        >
          <HeaderText.Center />
        </View>

        <View
          style={{
            flex: 1,
            height: 2,
            backgroundColor: theme.COLOR_WHITE
          }}
        />
      </View>
    );
  }

  const TwoHeaderText = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          paddingHorizontal: RFPercentage(3.25)
        }}
      >
        <HeaderText.Left />
        <HeaderText.Right />
      </View>
    );
  }

  return visible ? (
    <View
      style={{
        marginVertical: 15
      }}
    >
      {headerCenterText ? (
        <HorizontalHeader />
      ) : (
        <TwoHeaderText />
      )}

      <View
        style={{
          paddingTop: 10
        }}
      >
        {children}
      </View>
    </View>
  ) : null;
}