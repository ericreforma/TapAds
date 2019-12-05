import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";

import CampaignChooseVehicle from './CampaignChooseVehicle';
import { IMAGES, VEHICLE } from '../../../config/variables';
import {
  getSlotAvailable,
  totalKmDistance,
  numberWithCommas,
  earnUpTo,
  getDate
} from '../../../config/functions';
import theme from '../../../styles/theme.style';

const recCampaignImage = require('../../../assets/image/recommended_campaign_image.png');
const vehicleType = id => Object.values(VEHICLE.TYPE).find(t => t.id === id);
const vehicleClass = id => Object.values(VEHICLE.CLASS).find(c => c.id === id);
const vehicleStickerArea = Object.values(VEHICLE.STICKER_AREA);

const CampaignContainer = props => {
  const { campaign, homePageInit } = props;
  const [modalVisible, setModalVisible] = useState(false);

  const CampaignBody = () => {
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <ScrollView
          overScrollMode='never'
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              marginHorizontal: RFPercentage(1.5),
              marginBottom: RFPercentage(4),
              marginTop: RFPercentage(2),
              borderRadius: theme.PAGE_CARD_RADIUS,
              backgroundColor: theme.COLOR_WHITE,
              overflow: 'hidden',
              elevation: 5
            }}
          >
            <CampaignImage />
            <CampaignInfo />
            
            <View
              style={{
                marginTop: 15,
                marginBottom: 30,
              }}
            >
              <CampaignChooseVehicle
                homePageInit={homePageInit}
                closeCampaignModal={() => setModalVisible(false)}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  const CampaignImage = () => {
    return (
      <View
        style={{
          flex: 1,
          height: theme.SCREEN_HEIGHT / 3.5,
          backgroundColor: theme.COLOR_BLUE
        }}
      >
        <Image
          source={recCampaignImage}
          resizeMode="cover"
          style={{
            width: '100%',
            height: theme.SCREEN_HEIGHT / 3.5,
          }}
        />
      </View>
    );
  }

  const CampaignInfo = () => {
    return (
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 15
        }}
      >
        <CampaignText.Label text={campaign.name} />
        <CampaignText.Common text={campaign.client.business_name} />
        <CampaignDivider color={theme.COLOR_LIGHT_BLUE} />
        <CampaignText.Description text={campaign.description} />
        <CampaignDivider color="#e7e7e7" height={2} />
        <CampaignLVSInfo />
        <CampaignInfoCard
          info={[
            {name: 'common', text: 'From'},
            {name: 'label', text: getDate(campaign.duration_from)},
            {name: 'common', text: 'to'},
            {name: 'label', text: getDate(campaign.duration_to)},
          ]}
        />
        <CampaignInfoCard
          info={[
            {name: 'common', text: 'Earn up to'},
            {name: 'label', text: `P${earnUpTo(campaign, true)}`},
            {name: 'common', text: 'for'},
            {name: 'label', text: `${totalKmDistance(campaign)}km`},
          ]}
        />
        <CampaignInfoCard
          info={[
            {name: 'common', text: 'Bonus'},
            {name: 'label', text: `P${numberWithCommas(campaign.completion_bonus)}`},
            {name: 'common', text: 'for campaign completion'},
          ]}
        />
        <CampaignStickerLocation />
      </View>
    );
  }

  const CampaignLVSInfo = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          paddingVertical: 25,
          paddingTop: 20
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: 'flex-start'
          }}
        >
          <CampaignText.Label text={campaign.location} numberOfLines={2} />
          <CampaignText.CommonLabel text="Location" />
        </View>
        
        <View
          style={{
            paddingHorizontal: 10,
            alignItems: 'center'
          }}
        >
          <View
            style={{
              width: theme.SCREEN_WIDTH / 10,
              height: theme.SCREEN_WIDTH / 15,
            }}
          >
            <Image
              source={vehicleClass(campaign.vehicle_classification).icon.black}
              resizeMode="contain"
              style={{
                width: theme.SCREEN_WIDTH / 10,
                height: theme.SCREEN_WIDTH / 15,
              }}
            />
          </View>
          <CampaignText.CommonLabel text={vehicleType(campaign.vehicle_type).nameOnCaps} />
        </View>
        
        <View
          style={{
            flex: 1,
            alignItems: 'flex-end'
          }}
        >
          <CampaignText.Label text={getSlotAvailable(campaign)} />
          <CampaignText.CommonLabel text="Slots available" />
        </View>
      </View>
    );
  }

  const CampaignInfoCard = props => {
		return (
			<View
				style={{
					marginVertical: 7,
					paddingVertical: 15,
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: theme.COLOR_WHITE,
					borderRadius: theme.PAGE_CARD_RADIUS,
					elevation: 3
				}}
			>
				{props.info.map((i, index) =>
					<View
						key={index}
						style={{
							flexDirection: 'row',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
            {
              i.name === 'common'
              ? <CampaignText.Card.Common text={i.text} />
							: <CampaignText.Card.Label text={i.text} />
						}
					</View>
				)}
			</View>
		);
  }

  const CampaignStickerLocation = () => {
    return (
      <View
        style={{
          marginVertical: 10,
          paddingHorizontal: 20
        }}
      >
        <View
          style={{
            marginTop: 10,
            marginBottom: [3,4,6].indexOf(parseInt(campaign.vehicle_stickerArea)) !== -1 ? 20 : 0,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <CampaignText.Label text={vehicleStickerArea[campaign.vehicle_stickerArea].name} />
        </View>

        {campaign.vehicle_classification === 2 ? (
          <CampaignStickerImageLocation
            source={VEHICLE.STICKER_AREA.motorcycle.image} />
        ) : campaign.vehicle_stickerArea === 1 ? (
            <View>
              <CampaignStickerImageLocation
                source={vehicleStickerArea[campaign.vehicle_stickerArea].imageLeft} />
                
              <CampaignStickerImageLocation
                source={vehicleStickerArea[campaign.vehicle_stickerArea].imageRight} />
            </View>
          ) : (
            <CampaignStickerImageLocation
              source={vehicleStickerArea[campaign.vehicle_stickerArea].image} />
          )
        }
      </View>
    );
  }

  const CampaignStickerImageLocation = ({source}) => {
    return (
      <Image
        style={{
          width: '100%',
          height: theme.SCREEN_HEIGHT / 5
        }}
        resizeMode="contain"
        source={source}
      />
    )
  }

  const CampaignDivider = ({color, height}) => {
    return (
      <View
        style={{
          backgroundColor: color ? color : theme.COLOR_WHITE,
          height: color ? (height ? height : 3) : 0,
          marginVertical: 10
        }}
      />
    );
  }

  const CampaignText = {
    Label: ({text, numberOfLines = false}) => {
      return (
        <Text
          style={{
            fontFamily: 'Montserrat-Bold',
            fontSize: RFValue(15),
            color: theme.COLOR_BLACK
          }}
          numberOfLines={numberOfLines ? numberOfLines : 1}
        >{text}</Text>
      );
    },
    Common: ({text, color = false}) => {
      return (
        <Text
          style={{
            fontFamily: 'Montserrat-Medium',
            fontSize: RFValue(11),
            color: color ? color : theme.COLOR_NORMAL_FONT,
            lineHeight: RFValue(13)
          }}
          numberOfLines={1}
        >{text}</Text>
      )
    },
    CommonLabel: ({text}) => {
      return (
        <Text
          style={{
            fontFamily: 'Montserrat-Bold',
            fontSize: RFValue(12),
            color: theme.COLOR_NORMAL_FONT,
            lineHeight: RFValue(13)
          }}
          numberOfLines={1}
        >{text}</Text>
      );
    },
    Description: ({text}) => {
      return (
        <View
          style={{
            paddingVertical: 5
          }}
        >
          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              fontSize: RFValue(11),
              color: theme.COLOR_NORMAL_FONT
            }}
          >{text}</Text>
        </View>
      );
    },
    Card: {
      Label: ({text}) => {
        return (
          <Text
            style={{
              fontFamily: 'Montserrat-Bold',
              fontSize: RFValue(11),
              color: theme.COLOR_BLACK,
              lineHeight: RFValue(11)
            }}
          >{`${text} `}</Text>
        );
      },
      Common: ({text}) => {
        return (
          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              fontSize: RFValue(11),
              color: theme.COLOR_BLACK,
              lineHeight: RFValue(11)
            }}
          >{`${text} `}</Text>
        );
      }
    }
  }
  
  return (
    <View>
      <TouchableOpacity 
        style={props.style}
        activeOpacity={props.activeOpacity}
        onPress={e => {
          props.onPress(e);
          setModalVisible(true);
        }}
        disabled={modalVisible}
      >
        {props.children}
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        presentationStyle="fullScreen"
      >
        <View
          style={{
            backgroundColor: theme.COLOR_WHITE,
            paddingVertical: RFPercentage(3),
            paddingHorizontal: RFPercentage(1.5),
            // elevation: 5,
          }}
        >
          <TouchableOpacity
            style={{
              alignSelf: 'flex-start'
            }}
            onPress={() => setModalVisible(false)}
          >
            <Image
              source={IMAGES.ICONS.back_icon_black}
              resizeMode="contain"
              style={{
                width: RFPercentage(2.5),
                height: RFPercentage(2.5)
              }}
            />
          </TouchableOpacity>
        </View>
        
        <CampaignBody />
      </Modal>
    </View>
  );
};

export default CampaignContainer;