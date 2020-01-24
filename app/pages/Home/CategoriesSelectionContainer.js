import React, { useState } from 'react';
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";

import { HomePageRowContainer } from './HomePageRowContainer';

import { CampaignAction } from '../../redux/actions/campaign.action';
import { VEHICLE } from '../../config/variables';
import theme from '../../styles/theme.style';

const vehicleCategories = Object.values(VEHICLE.CLASS);
const cWidth = theme.SCREEN_WIDTH / 3.5;

const CategoryFont = {
  Selection: {
    Label: ({text}) => (
      <Text
        style={{
          fontFamily: 'Montserrat-Bold',
          fontSize: RFValue(11),
          color: theme.COLOR_WHITE,
          marginBottom: 5
        }}
        numberOfLines={1}
      >{text}</Text>
    ),
    Common: ({text}) => (
      <Text
        style={{
          fontFamily: 'Montserrat-Medium',
          fontSize: RFValue(8),
          color: theme.COLOR_WHITE,
          lineHeight: RFValue(10),
          textAlign: 'center',
          paddingHorizontal: 20
        }}
      >{text}</Text>
    )
  }
};

const CategoriesSelectionContainer = props => {
  const [descHeight, setDescHeight] = useState(false);
  const [init, setInit] = useState(true);

  const CategoryCampaignBody = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={{
          paddingHorizontal: 5,
          paddingVertical: 10
        }}
        onPress={e => {
          props.CampaignChangeCategory(index);
          props.CampaignListRequest(true);
        }}
        disabled={props.vehicle_classification === index ? true : false}
      >
        <View
          style={{
            borderRadius: 10,
            overflow: 'hidden',
            width: cWidth,
            backgroundColor: theme.COLOR_WHITE,
            elevation: props.vehicle_classification === index ? 5 : 0
          }}
        >
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              source={item.icon.large}
              resizeMode="contain"
              style={{
                width: cWidth - 20
              }}
            />
          </View>

          <View
            style={{
              height: !descHeight ? 'auto' : descHeight,
              paddingVertical: 15,
              paddingHorizontal: 7,
              alignItems: 'center',
              backgroundColor: props.vehicle_classification === index ? theme.COLOR_GRAY_HEAVY : theme.COLOR_GRAY_MEDIUM,
            }}
            onLayout={e => {
              const { height } = e.nativeEvent.layout;
              if(init) {
                if(!descHeight) {
                  setDescHeight(height);
                } else if(height > descHeight) {
                  setDescHeight(height);
                }
              } else if(index === (vehicleCategories.length - 1)) {
                setInit(false);
              }
            }}
          >
            <CategoryFont.Selection.Label text={item.name} />

            <View
              style={{
                height: 3,
                width: 30,
                marginBottom: 7,
                marginTop: 2,
                backgroundColor: theme.COLOR_WHITE,
              }}
            />
              <CategoryFont.Selection.Common text={item.description} />
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <HomePageRowContainer
      headerCenterText="Categories" >
      <ScrollView
        horizontal={true}
        overScrollMode="never"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: RFPercentage(2) - 5
        }}
      >
        {vehicleCategories.map((item, index) =>
          <CategoryCampaignBody
            key={index}
            item={item}
            index={index}
          />
        )}
      </ScrollView>
    </HomePageRowContainer>
  );
};

const mapStateToProps = state => ({
  vehicle_classification: state.campaignReducer.vehicle_classification
});

const mapDispatchToProps = dispatch => ({
  CampaignChangeCategory: (category) => dispatch(CampaignAction.changeCategory(category)),
  CampaignListRequest: (newBatch = false, callback) => dispatch(CampaignAction.list(newBatch, callback))
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesSelectionContainer);