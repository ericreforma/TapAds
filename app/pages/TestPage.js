import React, { Component, useState } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import {
  getRandomPastelColor
} from '../config/functions';
import NavigationService from '../services/navigation';

import theme from '../styles/theme.style';

export default class TestPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeCampaign: [
        {
          campaign: 'Campaign Name',
          location: 'Quezon City',
          url: false,
          vehicle: {
            data: {
              manufacturer: 'Honda',
              model: 'Vios',
              plate_number: 'ASF-001'
            },
            photos: []
          }
        }, {
          campaign: 'Campaign Name',
          location: 'Quezon City',
          url: false,
          vehicle: {
            data: {
              manufacturer: 'Honda',
              model: 'Vios',
              plate_number: 'ASF-002'
            },
            photos: []
          }
        }, {
          campaign: 'Campaign Name',
          location: 'Quezon City',
          url: false,
          vehicle: {
            data: {
              manufacturer: 'Honda',
              model: 'Vios',
              plate_number: 'ASF-003'
            },
            photos: []
          }
        }, {
          campaign: 'Campaign Name',
          location: 'Quezon City',
          url: false,
          vehicle: {
            data: {
              manufacturer: 'Honda',
              model: 'Vios',
              plate_number: 'ASF-004'
            },
            photos: []
          }
        }
      ]
    };
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: theme.COLOR_BLUE,
          justifyContent: 'center'
        }}
      >
        <View>
          <HomePageRowContainer
            headerLeftText="Active Campaigns"
            headerRightText="View All"
            headerRightUrl={'MyCampaign'}
          >
            <View
              style={{
                paddingVertical: 20,
                backgroundColor: theme.COLOR_GRAY_MEDIUM
              }}
            >
              <ActiveCampaignContainer
                campaigns={this.state.activeCampaign} />
            </View>
          </HomePageRowContainer>
        </View>
      </View>
    )
  }
}

const HomePageRowContainer = props => {
  const {
    children,
    headerLeftText,
    headerRightText,
    headerRightUrl
  } = props;

  const [loading, setLoading] = useState(true);
  const [viewAllClick, setViewAllClick] = useState(false);

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          paddingHorizontal: RFPercentage(3)
        }}
      >
        <HeaderText.Left
          text={headerLeftText} />
        
        <HeaderText.Right
          text={headerRightText}
          url={headerRightUrl} />
      </View>

      <View
        style={{
          paddingTop: 20
        }}
      >
        {children}
      </View>
    </View>
  )
}

const HeaderText = {
  Left: props => (
    <Text
      style={{
        fontFamily: 'Montserrat-Bold',
        fontSize: RFValue(19),
        color: theme.COLOR_WHITE
      }}
    >{props.text}</Text>
  ),
  Right: props => {
    const fontColor = props.url ? theme.COLOR_PINK : theme.COLOR_WHITE;
    const buttonDisable = props.url ? false : true;

    return (
      <TouchableOpacity
        disabled={buttonDisable}
        onClick={e => NavigationService.navigate(props.url)}
      >
        <Text
          style={{
            fontFamily: 'Montserrat-Medium',
            fontSize: RFValue(16),
            color: fontColor
          }}
        >{props.text}</Text>
      </TouchableOpacity>
    );
  }
}


const ActiveCampaignContainer = props => {
  return ( 
    <Carousel
      data={props.campaigns}
      renderItem={i => <ActiveCampaignBody item={i.item} />}
      layout={'default'}
      sliderWidth={theme.SCREEN_WIDTH}
      itemWidth={theme.SCREEN_WIDTH / 2}
      firstItem={props.campaigns.length > 2 ? 1 : 0}
    />
  );
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
        <ActiveCampaignHeader
          campaign={item.campaign}
          location={item.location}
        />

        <ActiveCampaignFooter
          vehicle={item.vehicle}
        />
      </View>
    </View>
  );
}

const ActiveCampaignHeader = props => {
  const cHeight = theme.SCREEN_HEIGHT * 0.22;
  const cWidth = theme.SCREEN_WIDTH / 2;

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
        source={require('../assets/image/test_campaign_image.png')}
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
          source={require('../assets/image/active_campaign_gradient.png')}
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
            width: cWidth,
          }}
        >
          <View
            style={{
              paddingTop: 10,
              paddingHorizontal: 15
            }}
          >
            <ActiveCampaignText.Label text={props.campaign} />
            <ActiveCampaignText.Common text={props.location} />
          </View>
        </View>
      </View>
    </View>
  );
}

const ActiveCampaignFooter = props => {
  const [loading, setLoading] = useState(false);

  const {
    vehicle
  } = props;

  return (
    <View
      style={{
        paddingHorizontal: 15,
        paddingVertical: 5,
        flexDirection: 'row',
        alignItems: 'center'
      }}
    >
      {loading ? (
        <View
          style={{
            flex: 1,
            paddingVertical: theme.SCREEN_WIDTH / 21,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <ActivityIndicator color={theme.COLOR_BLUE} />
        </View>
      ) : (
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: 'flex-start'
          }}
          onPress={() => setLoading(!loading)}
        >
          <Image
            source={require('../assets/image/icons/start_trip_button.png')}
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
          alignItems: 'flex-end'
        }}
      >
        <ActiveCampaignText.Common text={vehicle.data.manufacturer} black />
        <ActiveCampaignText.Common text={vehicle.data.plate_number} black />
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
          fontSize: RFValue(18),
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
          fontSize: RFValue(14),
          color: props.black ? theme.COLOR_BLACK : theme.COLOR_WHITE
        }}
        numberOfLines={1}
      >{props.text}</Text>
    );
  }
}