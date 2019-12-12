import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  PermissionsAndroid
} from 'react-native';
import { connect } from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import { RFValue } from "react-native-responsive-fontsize";

import { CampaignAction } from '../../redux/actions/campaign.action';
import { URL } from '../../config/variables';

import theme from '../../styles/theme.style';

const testCampaignImage = require('../../assets/image/test_campaign_image.png');
const activeCampaignGradient = require('../../assets/image/active_campaign_gradient.png');
const startTripButton = require('../../assets/image/icons/start_trip_button.png');
const cWidth = theme.SCREEN_WIDTH / 1.9;
const cHeight = cWidth - (cWidth / 3.5);

const ActiveCampaignContainer = props => {
  const [campaign, setCampaign] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCampaign(props.activeCampaign);
    setLoading(props.loading);
  }, [props.activeCampaign, props.loading]);

  const requestCameraPermission = async(id, location_id) => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'TapAds',
          message: `TapAds reuires your location`,
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if(granted === PermissionsAndroid.RESULTS.GRANTED) {
        props.campaignSelected(id, false, () => {
          props.checkCampaignLocation(location_id, () => {
            props.dispatchTrip();
          });
        });
      } else {

      }
    } catch (err) {
      console.warn(err);
    }
  }
  
  const ActiveCampaignBody = ({item}) => {
    return (
      <View
        style={{
          padding: 5
        }}
      >
        <View
          style={{
            borderRadius: theme.PAGE_CARD_RADIUS,
            backgroundColor: theme.COLOR_WHITE,
            overflow: 'hidden',
            elevation: 5
          }}
        >
          <ActiveCampaignHeader item={item} />
          <ActiveCampaignFooter item={item} />
        </View>
      </View>
    );
  }
  
  const ActiveCampaignHeader = ({item}) => {
    const imageSource = item.campaignDetails.photo
      ? {uri: `${URL.SERVER_MEDIA}/${item.campaignDetails.photo}`}
      : testCampaignImage;
    return (
      <View
        style={{
          backgroundColor: theme.COLOR_GRAY_HEAVY,
          height: cHeight,
          width: cWidth,
          overflow: 'hidden'
        }}
      >
        <Image
          source={imageSource}
          resizeMode="cover"
          style={{
            height: cHeight,
            width: cWidth,
          }}
        />

        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: cHeight,
            width: cWidth,
            overflow: 'hidden'
          }}
        >
          <Image
            source={activeCampaignGradient}
            resizeMode="cover"
            style={{
              height: cHeight,
              width: cWidth,
            }}
          />

          <View
            style={{
              position: 'absolute',
              top: 10,
              left: 0,
              width: cWidth - 15,
              paddingHorizontal: 15
            }}
          >
            <ActiveCampaignText.Label text={item.campaignDetails.name} />
            <ActiveCampaignText.Common text={item.campaignDetails.location} />
          </View>
        </View>
      </View>
    );
  }
  
  const ActiveCampaignFooter = ({item}) => {
    const { vehicle, id, campaignDetails } = item;
    const [loadingFooter, setLoadingFooter] = useState(false);

    return (
      <View
        style={{
          paddingHorizontal: 15,
          paddingVertical: 5,
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        {loadingFooter ? (
          <View
            style={{
              flex: 1,
              marginVertical: (theme.SCREEN_WIDTH / 21) - 10,
              paddingVertical: 10,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: theme.COLOR_BLUE,
              borderRadius: 10
            }}
          >
            <ActivityIndicator color={theme.COLOR_WHITE} />
          </View>
        ) : (
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: 'flex-start'
            }}
            onPress={() => {
              setLoadingFooter(!loadingFooter);
              requestCameraPermission(id, campaignDetails.location_id);
            }}
          >
            <Image
              source={startTripButton}
              resizeMode="contain"
              style={{
                width: '100%'
              }}
            />
          </TouchableOpacity>
        )}
        
        <View
          style={{
            flex: 1,
            paddingLeft: 10,
            alignItems: 'flex-end'
          }}
        >
          <ActiveCampaignText.Common text={vehicle.manufacturer} black />
          <ActiveCampaignText.Common text={vehicle.plate_number} black />
        </View>
      </View>
    );
  }

  const ActiveCampaignText = {
    Label: props => {
      return (
        <Text
          style={{
            fontFamily: 'Montserrat-Bold',
            fontSize: RFValue(16),
            color: theme.COLOR_WHITE
          }}
          numberOfLines={1}
        >{props.text}</Text>
      )
    },
    Common: props => {
      return (
        <Text
          style={{
            fontFamily: 'Montserrat-Regular',
            fontSize: RFValue(12),
            color: props.black ? theme.COLOR_NORMAL_FONT : theme.COLOR_WHITE
          }}
          numberOfLines={1}
        >{props.text}</Text>
      );
    }
  }

  return (
    <View
      style={{
        backgroundColor: theme.COLOR_GRAY_MEDIUM,
        paddingVertical: 20,
        marginTop: 5
      }}
    >
      {loading ? (
        campaign.length !== 0 ? (
          <Carousel
            data={campaign}
            renderItem={({item}) =>
              <ActiveCampaignBody item={item} />
            }
            layout={'default'}
            sliderWidth={theme.SCREEN_WIDTH}
            itemWidth={cWidth}
            firstItem={campaign.length > 2 ? 1 : 0}
          />
        ) : (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <ActiveCampaignText.Common
              text="-- no active campaigns --"
            />
          </View>
        )
      ) : (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <ActivityIndicator color="#fff" />
        </View>
      )}
    </View>
  );
};

const mapStateToProps = state => ({
	activeCampaign: state.campaignReducer.activeCampaign
});

const mapDispatchToProps = (dispatch) => ({
  campaignSelected: (id, navigate = false, callback = false) =>
    dispatch(
      CampaignAction.mylistSelected(id, navigate, callback)
    ),
  dispatchTrip: () =>
    dispatch(
      CampaignAction.startTrip()
    ),
  checkCampaignLocation: (id, callback) =>
    dispatch(
      CampaignAction.checkCampaignLocation(id, callback)
    )
});

export default connect(mapStateToProps, mapDispatchToProps)(ActiveCampaignContainer);