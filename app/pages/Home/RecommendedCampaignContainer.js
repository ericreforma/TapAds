import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  Image,
  FlatList
} from 'react-native';
import { connect } from 'react-redux';
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";

import CampaignContainer from './Modal/CampaignContainer';
import Loader from '../../components/Loader';
import { IfElse, Then, Else } from '../../components/IfElse';
import AsyncImage from '../../components/AsyncImage';

import { CampaignAction } from '../../redux/actions/campaign.action';
import { VEHICLE, URL } from '../../config/variables';
import theme from '../../styles/theme.style';
import { getTotalPay } from '../../config/functions';

const carClassification = id => Object.values(VEHICLE.CLASS).find(i => i.id === id);
const recCampaignImage = require('../../assets/image/recommended_campaign_image.png');
const cWidth = theme.SCREEN_WIDTH / 2.5;

const RecommendedCampaignContainer = props => {
  const [campaign, setCampaign] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(props.refresh) {
      setLoading(true);
      props.CampaignRecRequest(() => {
        setLoading(false);
        props.loadingDone('loadingRecommended');
      });
    }
  }, [props.refresh]);

  useEffect(() => {
    setCampaign(props.recommendedCampaign);
  }, [props.recommendedCampaign]);

  const RecommendedCampaignBody = ({item}) => {
    const imageSource = item.photo
      ? {uri: `${URL.SERVER_MEDIA}/${item.photo}`}
      : recCampaignImage;

    return (
      <CampaignContainer
        style={{
          padding: 8
        }}
        activeOpacity={1}
        onPress={e => props.viewDetails(item.id)}
        campaign={item}
        homePageInit={props.homePageInit}
      >
        <View
          style={{
            borderRadius: theme.PAGE_CARD_RADIUS,
            width: cWidth,
            overflow: 'hidden',
            backgroundColor: theme.COLOR_WHITE,
            elevation: 5
          }}
        >
          <View
            style={{
              backgroundColor: theme.COLOR_GRAY_HEAVY
            }}
          >
            <AsyncImage
              source={imageSource}
              resizeMode="cover"
              style={{
                width: cWidth,
                height: cWidth
              }}
            />

            <View
              style={{
                position: 'absolute',
                top: 20,
                width: cWidth,
                alignItems: 'flex-end',
              }}
            >
              <View
                style={{
                  backgroundColor: theme.COLOR_BLUE,
                  borderTopLeftRadius: 20,
                  borderBottomLeftRadius: 20,
                  paddingRight: 10,
                  paddingLeft: 15,
                  elevation: 10
                }}
              >
                <Image
                  source={carClassification(item.vehicle_classification).icon.white}
                  resizeMode="contain"
                  style={{
                    width: cWidth / 5,
                    height: cWidth / 5
                  }}
                />
              </View>
            </View>
          </View>

          <View
            style={{
              paddingTop: 10,
              paddingBottom: 12,
              paddingHorizontal: 15,
              borderTopLeftRadius: theme.PAGE_CARD_RADIUS,
              borderTopRightRadius: theme.PAGE_CARD_RADIUS,
              overflow: 'hidden',
              backgroundColor: theme.COLOR_WHITE,
              marginTop: -25
            }}
          >
            <FontText.Label text={item.name} />
            <FontText.Common text={item.location} />
            <FontText.Common text={getTotalPay(item)} />
          </View>
        </View>
      </CampaignContainer>
    );
  }

  const FontText = {
    Label: ({text}) => (
      <Text
        style={{
          fontFamily: 'Montserrat-Medium',
          fontSize: RFValue(11),
          color: theme.COLOR_BLACK,
          marginBottom: 5
        }}
        numberOfLines={1}
      >{text}</Text>
    ),
    Common: ({text}) => (
      <Text
        style={{
          fontFamily: 'Montserrat-Bold',
          fontSize: RFValue(10),
          color: theme.COLOR_NORMAL_FONT,
          lineHeight: RFValue(11)
        }}
        numberOfLines={1}
      >{text}</Text>
    ),
    NoCampaigns: ({text}) => (
      <Text
        style={{
          fontFamily: 'Montserrat-Medium',
          fontSize: RFValue(15),
          color: theme.COLOR_WHITE
        }}
        numberOfLines={1}
      >{text}</Text>
    )
  }

  return (
    <Loader
      loading={loading}
      spinnerStyle={{
        paddingVertical: 20
      }}>
      <IfElse condition={campaign.length !==0}>
        <Then>
          <FlatList
            data={campaign}
            renderItem={data =>
              <RecommendedCampaignBody {...data} />
            }
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            overScrollMode="never"
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: RFPercentage(2) - 8
            }} />
        </Then>

        <Else>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 20
            }}
          >
            <FontText.NoCampaigns
              text="-- no recommended campaigns --" />
          </View>
        </Else>
      </IfElse>
    </Loader>
  );
};

const mapStateToProps = state => ({
	recommendedCampaign: state.campaignReducer.recommended
});

const mapDispatchToProps = dispatch => ({
  CampaignRecRequest: callback => dispatch(CampaignAction.recommended(callback)),
  viewDetails: (id) => dispatch(CampaignAction.selected(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(RecommendedCampaignContainer);