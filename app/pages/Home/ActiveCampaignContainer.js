import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  PermissionsAndroid
} from 'react-native';
import {connect} from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import {RFValue} from "react-native-responsive-fontsize";
import {NavigationEvents} from 'react-navigation';

import {CampaignAction} from '../../redux/actions/campaign.action';
import {URL} from '../../config/variables';

import AsyncImage from '../../components/AsyncImage';
import Loader from '../../components/Loader';
import IfElse from '../../components/IfElse';

import theme from '../../styles/theme.style';

const testCampaignImage = require('../../assets/image/test_campaign_image.png');
const activeCampaignGradient = require('../../assets/image/active_campaign_gradient.png');
const startTripButton = require('../../assets/image/icons/start_trip_button.png');
const cWidth = theme.SCREEN_WIDTH / 1.9;
const cHeight = cWidth - (cWidth / 3.5);

const ActiveCampaignContainer = props => {
  const [campaign, setCampaign] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(props.refresh) {
      setLoading(true);
      props.dispatchMyList(() => {
        setLoading(false);
        props.loadingDone('loadingActive');
      });
    }
  }, [props.refresh]);

  useEffect(() => {
    setCampaign(props.activeCampaign);
  }, [props.activeCampaign]);

  const requestCameraPermission = async(id, location_id, callback) => {
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
        callback();
      }
    } catch (err) {
      console.warn(err);
      callback();
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
        <AsyncImage
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
    const addstyle = loadingFooter ? {
      alignItems: 'center',
      justifyContent: 'center'
    } : {};

    return (
      <View
        style={{
          paddingLeft: RFValue(12),
          paddingRight: RFValue(15),
          paddingVertical: RFValue(15),
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        <Loader
          loading={loadingFooter}
          contentStyle={{
            flex: 1,
            marginHorizontal: 5,
            height: RFValue(33),
            backgroundColor: theme.COLOR_BLUE,
            borderRadius: 5,
            ...addstyle
          }} >
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: 'flex-start'
            }}
            onPress={() => {
              setLoadingFooter(true);
              requestCameraPermission(
                id, campaignDetails.location_id,
                () => setLoadingFooter(false)
              );
            }}
          >
            <View
              style={{
                width: '100%'
              }}
            >
              <Image
                source={startTripButton}
                resizeMode="contain"
                style={{
                  width: '100%',
                  height: RFValue(33)
                }}
              />
            </View>
          </TouchableOpacity>
        </Loader>

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

  const ThenComponent = () => {
    return (
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
    )
  }

  const ElseComponent = () => {
    return (
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
  }

  return (
    <Loader
      loading={loading}
      contentStyle={{
        backgroundColor: theme.COLOR_GRAY_MEDIUM,
        paddingVertical: 20,
        marginTop: 5
      }}
    >
      <IfElse
        condition={campaign.length !== 0}
        then={<ThenComponent />}
        else={<ElseComponent />}
      />
    </Loader>
  );
};

const mapStateToProps = state => ({
	activeCampaign: state.campaignReducer.activeCampaign
});

const mapDispatchToProps = (dispatch) => ({
  campaignSelected: (id, navigate = false, callback = false) =>
    dispatch(CampaignAction.mylistSelected(id, navigate, callback)),
  dispatchTrip: () =>
    dispatch(CampaignAction.startTrip()),
  checkCampaignLocation: (id, callback) =>
    dispatch(CampaignAction.checkCampaignLocation(id, callback)),
  dispatchMyList: callback =>
    dispatch(CampaignAction.mylist(callback))
});

export default connect(mapStateToProps, mapDispatchToProps)(ActiveCampaignContainer);