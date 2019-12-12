import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";

import { CampaignAction } from '../../../redux/actions/campaign.action';
import { CAMPAIGN } from '../../../redux/actions/types.action';

import CampaignContainer from './Modal/CampaignContainer';

import { VEHICLE, URL } from '../../../config/variables';
import theme from '../../../styles/theme.style';
import { getTotalPay, getSlotAvailable } from '../../../config/functions';

const carClassification = id => Object.values(VEHICLE.CLASS).find(i => i.id === id);
const carType = Object.values(VEHICLE.TYPE);
const cWidth = theme.SCREEN_WIDTH / 3.5;
const activeCampaignGradient = require('../../../assets/image/active_campaign_gradient2.png');
const campaignImage = require('../../../assets/image/test_campaign_category.png');

const RecommendedCampaignContainer = props => {
  const [campaigns, setCampaign] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCampaign(props.campaigns);
    setLoading(props.loading);
  }, [props.campaigns, props.loading]);

  const CategoryCampaignContentImage = ({c}) => {
    const contentWidth = cWidth + 5;
    const imageSource = c.photo
      ? {uri: `${URL.SERVER_MEDIA}/${c.photo}`}
      : campaignImage;
    return (
      <View
        style={{
          width: contentWidth,
          height: contentWidth,
          borderRadius: theme.PAGE_CARD_RADIUS - 5,
          backgroundColor: theme.COLOR_GRAY_HEAVY,
          overflow: 'hidden'
        }}
      >
        <Image
          source={imageSource}
          resizeMode="cover"
          style={{
            width: contentWidth,
            height: contentWidth,
          }}
        />

        <View
          style={{
            position: 'absolute',
            width: contentWidth,
            height: contentWidth,
            top: 0,
            left: 0,
          }}
        >
          <Image
            source={activeCampaignGradient}
            resizeMode="cover"
            style={{
              width: contentWidth,
              height: contentWidth,
            }}
          />
        </View>

        <View
          style={{
            position: 'absolute',
            top: 10,
            width: contentWidth,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View
            style={{
              backgroundColor: theme.COLOR_BLUE,
              borderTopRightRadius: 20,
              borderBottomRightRadius: 20,
              paddingLeft: 5,
              paddingRight: 10,
              elevation: 10,
              alignSelf: 'flex-start'
            }}
          >
            <Image
              source={carClassification(c.vehicle_classification).icon.white}
              resizeMode="contain"
              style={{
                width: cWidth / 4,
                height: cWidth / 4
              }}
            />
          </View>

          <View
            style={{
              elevation: 10,
              paddingRight: 7
            }}
          >
            <CategoryFont.Content.CarType text={carType[c.vehicle_type].nameOnCaps} />
          </View>
        </View>
      </View>
    );
  }

  const CategoryCampaignContentInfo = ({label, value}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <View
          style={{
            paddingRight: 5,
            alignItems: 'flex-start'
          }}
        >
          <CategoryFont.Content.Common text={label} />
        </View>

        <View
          style={{
            paddingLeft: 5,
            flex: 1,
            alignItems: 'flex-end'
          }}
        >
          <CategoryFont.Content.Value text={value} />
        </View>
      </View>
    );
  }

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
    },
    Content: {
      Label: ({text}) => (
        <Text
          style={{
            fontFamily: 'Montserrat-Bold',
            fontSize: RFValue(13.5),
            color: theme.COLOR_BLACK
          }}
          numberOfLines={1}
        >{text}</Text>
      ),
      Common: ({text}) => (
        <Text
          style={{
            fontFamily: 'Montserrat-Medium',
            fontSize: RFValue(11),
            color: theme.COLOR_NORMAL_FONT,
            lineHeight: RFValue(14)
          }}
          numberOfLines={1}
        >{text}</Text>
      ),
      Value: ({text}) => (
        <Text
          style={{
            fontFamily: 'Montserrat-Bold',
            fontSize: RFValue(11),
            color: theme.COLOR_NORMAL_FONT,
            lineHeight: RFValue(14)
          }}
          numberOfLines={1}
        >{text}</Text>
      ),
      CarType: ({text}) => (
        <Text
          style={{
            fontFamily: 'Montserrat-Bold',
            fontSize: RFValue(11),
            color: theme.COLOR_WHITE,
            lineHeight: RFValue(13)
          }}
          numberOfLines={1}
        >{text}</Text>
      )
    }
  }

  return (
    <View>
      {loading ? (
        campaigns.length !== 0 ? (
          props.campaigns.map(c =>
            <CampaignContainer
              key={c.id}
              style={{
                paddingVertical: 8,
                paddingHorizontal: RFPercentage(2) - 2
              }}
              activeOpacity={0.9}
              onPress={e => props.viewDetails(c)}
              campaign={c}
              homePageInit={props.homePageInit}
            >
              <View
                style={{
                  borderRadius: theme.PAGE_CARD_RADIUS,
                  backgroundColor: theme.COLOR_WHITE,
                  padding: 10,
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <CategoryCampaignContentImage c={c} />
                
                <View
                  style={{
                    flex: 1,
                    flexGrow: 1,
                    paddingLeft: 10,
                    paddingRight: 5,
                  }}
                >
                  <CategoryFont.Content.Label text={c.name} />
                  <CategoryFont.Content.Common text={c.client.business_name} />

                  <View
                    style={{
                      height: 2,
                      marginVertical: 7,
                      backgroundColor: theme.COLOR_LIGHT_BLUE
                    }}
                  ></View>

                  <CategoryCampaignContentInfo label={'Location'} value={c.location} />
                  <CategoryCampaignContentInfo label={'Basic Pay'} value={getTotalPay(c)} />
                  <CategoryCampaignContentInfo label={'Slots Available'} value={getSlotAvailable(c)} />
                </View>
              </View>
            </CampaignContainer>
          )
        ) : (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 20
            }}
          >
            <FontText.NoCampaigns
              text="-- no recommended campaigns --"
            />
          </View>
        )
      ) : (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 20
          }}
        >
          <ActivityIndicator color="#fff" />
        </View>
      )}
    </View>
  );
};

const mapDispatchToProps = dispatch => ({
  viewDetails: campaign => dispatch({ type: CAMPAIGN.SELECTED, campaign })
});

export default connect(null, mapDispatchToProps)(RecommendedCampaignContainer);