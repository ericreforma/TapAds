import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';

import theme from '../../../styles/theme.style';
import { IMAGES } from '../../../config/variables';
import { getTotalEarnings, timeStamp } from '../../../config/functions';

const CampaignCompleted = ({campaign}) => {
  return (
    <CampaignCompletedContainer>
      <CampaignCompletedCard>
        <CampaignCompletedRow icon={IMAGES.ICONS.mail_icon} notif={2} button>
          <CampaignCompletedText.Campaign text={campaign.campaignDetails.name} />
          <CampaignCompletedText.Date text={timeStamp(campaign.created_at, true).date} />
        </CampaignCompletedRow>

        <CampaignCompletedRow icon={IMAGES.ICONS.favorite_icon}>
          <CampaignCompletedText.StatusDate text={timeStamp(campaign.end_timestamp, true).date} />
          <CampaignCompletedText.Status text="Completed" />
        </CampaignCompletedRow>

        <CampaignCompletedFooter>
          <CampaignCompletedText.FooterLabel text={`P${getTotalEarnings(campaign).split('.')[0]}`} />
          <CampaignCompletedText.FooterCommon text="Total Earnings" />
        </CampaignCompletedFooter>
      </CampaignCompletedCard>
    </CampaignCompletedContainer>
  );
}

const CampaignCompletedContainer = ({children}) => {
  return (
    <View>{children}</View>
  )
}

const CampaignCompletedCard = ({children}) => {
  return (
    <View
      style={{
        borderRadius: theme.PAGE_CARD_RADIUS,
        overflow: 'hidden',
        backgroundColor: theme.COLOR_WHITE,
        elevation: 5
      }}
    >{children}</View>
  )
}

const CampaignCompletedRow = props => {
  return (
    <View
      style={{
        flexDirection: 'row'
      }}
    >
      <CampaignCompletedRowInfo {...props} />
      <CampaignCompletedRowIcon {...props} />
    </View>
  )
}

const CampaignCompletedRowInfo = ({children}) => {
  return (
    <View
      style={{
        flex: 1,
        borderBottomColor: theme.COLOR_DIRTY_WHITE,
        borderBottomWidth: 1,
        paddingHorizontal: 20,
        justifyContent: 'center'
      }}
    >{children}</View>
  )
}

const CampaignCompletedRowIcon = ({icon, notif, button = false}) => {
  const cWidth = theme.SCREEN_WIDTH / 6.5;
  const imageWidth = theme.SCREEN_WIDTH / 16;
  const notifWidth = RFValue(14);

  return (
    <View
      style={{
        width: cWidth,
        height: cWidth,
        borderBottomWidth: 1,
        borderBottomColor: theme.COLOR_WHITE,
        backgroundColor: theme.COLOR_DIRTY_WHITE,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <CampaignCompletedRowIconIsButton
        button={button}
        style={{
          width: imageWidth,
          height: imageWidth,
        }}
      >
        <Image
          source={icon}
          style={{
            width: imageWidth,
            height: imageWidth,
          }}
          resizeMode="contain"
        />

        {notif ? (
          <View
            style={{
              position: 'absolute',
              top: -(notifWidth / 6),
              right: -(notifWidth / 2),
              backgroundColor: theme.COLOR_BLUE,
              height: notifWidth,
              width: notifWidth,
              borderRadius: notifWidth,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <CampaignCompletedText.Notif text={notif > 9 ? '9+' : notif} />
          </View>
        ) : null}
      </CampaignCompletedRowIconIsButton>
    </View>
  )
}

const CampaignCompletedRowIconIsButton = props => {
  if(props.button) {
    return <TouchableOpacity {...props}>{props.children}</TouchableOpacity>
  } else {
    return <View {...props}>{props.children}</View>
  }
}

const CampaignCompletedFooter = ({children}) => {
  const cWidth = theme.SCREEN_WIDTH / 6.5;
  const imageWidth = theme.SCREEN_WIDTH / 16;

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: theme.COLOR_GRAY_HEAVY
      }}
    >
      <View
        style={{
          flex: 1,
          paddingLeft: 20,
        }}
      >
        <CampaignCompletedDashboardButton
          text="View dashboard" />
      </View>
      
      <View
        style={{
          flex: 1,
          paddingHorizontal: (cWidth - imageWidth) / 2,
          alignItems: 'flex-end'
        }}
      >{children}</View>
    </View>
  )
}

const CampaignCompletedDashboardButton = ({text}) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: theme.COLOR_BLUE,
        borderRadius: theme.PAGE_CARD_RADIUS,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15
      }}
    >
      <CampaignCompletedText.FooterButton text={text} />
    </TouchableOpacity>
  )
}

const CampaignCompletedText = {
  Campaign: ({text}) => {
    return (
      <Text
        style={{
          fontFamily: 'Montserrat-Medium',
          fontSize: RFValue(14),
          color: theme.COLOR_BLACK,
          lineHeight: RFValue(16)
        }}
        numberOfLines={1}
      >{text}</Text>
    )
  },
  Date: ({text}) => {
    return (
      <Text
        style={{
          fontFamily: 'Montserrat-Medium',
          fontSize: RFValue(10),
          color: theme.COLOR_GRAY_HEAVY,
          lineHeight: RFValue(12)
        }}
        numberOfLines={1}
      >{text}</Text>
    )
  },
  Status: ({text}) => {
    return (
      <Text
        style={{
          fontFamily: 'Montserrat-Bold',
          fontSize: RFValue(10),
          color: theme.COLOR_GRAY_HEAVY,
          lineHeight: RFValue(12)
        }}
        numberOfLines={1}
      >{text}</Text>
    )
  },
  StatusDate: ({text}) => {
    return (
      <Text
        style={{
          fontFamily: 'Montserrat-Bold',
          fontSize: RFValue(14),
          color: theme.COLOR_BLACK,
          lineHeight: RFValue(16)
        }}
        numberOfLines={1}
      >{text}</Text>
    )
  },
  FooterLabel: ({text}) => {
    return (
      <Text
        style={{
          fontFamily: 'Montserrat-Bold',
          fontSize: RFValue(19),
          color: theme.COLOR_LIGHT_BLUE,
          lineHeight: RFValue(19),
          textAlign: 'right'
        }}
        numberOfLines={1}
      >{text}</Text>
    )
  },
  FooterCommon: ({text}) => {
    return (
      <Text
        style={{
          fontFamily: 'Montserrat-Bold',
          fontSize: RFValue(10),
          color: theme.COLOR_WHITE,
          lineHeight: RFValue(12),
          textAlign: 'right'
        }}
        numberOfLines={1}
      >{text}</Text>
    )
  },
  FooterButton: ({text}) => {
    return (
      <Text
        style={{
          fontFamily: 'Montserrat-Medium',
          fontSize: RFValue(12),
          color: theme.COLOR_WHITE,
          lineHeight: RFValue(14)
        }}
        numberOfLines={1}
      >{text}</Text>
    )
  },
  Notif: ({text}) => {
    return (
      <Text
        style={{
          fontFamily: 'Montserrat-Medium',
          fontSize: RFValue(10),
          color: theme.COLOR_WHITE,
          lineHeight: RFValue(11)
        }}
      >{text}</Text>
    )
  }
}

export default CampaignCompleted;