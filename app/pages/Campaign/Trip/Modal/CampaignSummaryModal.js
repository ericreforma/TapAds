import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import Modal from 'react-native-modal';
import { RFValue } from 'react-native-responsive-fontsize';

import NavigationService from '../../../../services/navigation';
import theme from '../../../../styles/theme.style';

const CampaignSummaryModal = ({
  campaignDistance,
  campaignContent,
  isVisible
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setModalVisible(isVisible);
  }, [isVisible]);

  const closeButton = () => {
    setModalVisible(false);
    NavigationService.back();
  }

  return (
    <Modal isVisible={modalVisible}>
      <CampaignSummaryContainer>
        <CampaignSummaryCard>
          <CampaignSummaryHeader
            text="Trip Summary"
            campaign="Campaign Name" />

          <CampaignSummaryBody>
            {campaignContent.map((c, cIdx) =>
              <CampaignSummaryBodyRow
                key={cIdx}
                left={c.left}
                right={c.right} />
            )}
            
            <CampaignSummaryDistance
              content={campaignDistance} />

            <CampaignSummaryExitButton
              onPress={closeButton}
              text="Exit" />
          </CampaignSummaryBody>
        </CampaignSummaryCard>
      </CampaignSummaryContainer>
    </Modal>
  );
};

const CampaignSummaryContainer = ({children}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center'
      }}
    >{children}</View>
  );
}

const CampaignSummaryCard = ({children}) => {
  return (
    <View
      style={{
        borderRadius: theme.PAGE_CARD_RADIUS,
        backgroundColor: theme.COLOR_WHITE,
        overflow: 'hidden',
        elevation: 5
      }}
    >{children}</View>
  );
}

const CampaignSummaryHeader = ({text, campaign}) => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        backgroundColor: theme.COLOR_GRAY_LIGHT
      }}
    >
      <CampaignSummaryText.Header
        text={text} />
      
      <CampaignSummaryText.Label
        text={campaign} />
    </View>
  );
}

const CampaignSummaryBody = ({children}) => {
  return (
    <View
      style={{
        paddingTop: 13,
        paddingBottom: 15,
        paddingHorizontal: 15
      }}
    >{children}</View>
  );
}

const CampaignSummaryDistance = ({content}) => {
  return (
    <View
      style={{
        marginTop: 10,
        borderTopColor: theme.COLOR_LIGHT_BLUE,
        borderTopWidth: 3
      }}
    >
      <View
        style={{
          marginVertical: 10
        }}
      >
        <CampaignSummaryText.RowHeader
          text="Distance" />
      </View>

      <View
        style={{
          flexDirection: 'row',
        }}
      >
        {content.map((c, cIdx) =>
          <View
            key={cIdx}
            style={{
              flex: 1,
            }}
          >
            <CampaignSummaryText.Label
              text={c.label}
              textAlign={c.textAlign} />
              
            <CampaignSummaryText.Common
              text={c.value}
              textAlign={c.textAlign} />
          </View>
        )}
      </View>
    </View>
  );
}

const CampaignSummaryBodyRow = ({left, right}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginVertical: 3
      }}
    >
      <View
        style={{
          alignItems: 'flex-start',
          paddingRight: 10
        }}
      >
        <CampaignSummaryText.Label
          text={left} />
      </View>
      
      <View
        style={{
          flex: 1,
          alignItems: 'flex-end',
          paddingLeft: 10
        }}
      >
        {right.toString().split('-').map((r, rIdx) =>
          <CampaignSummaryText.Common key={rIdx} text={r} />
        )}
      </View>
    </View>
  );
}

const CampaignSummaryExitButton = ({text, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        marginTop: 25,
        alignSelf: 'center',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: theme.PAGE_CARD_RADIUS,
        backgroundColor: theme.COLOR_BLUE
      }}
      onPress={onPress}
    >
      <CampaignSummaryText.Button
        text={text} />
    </TouchableOpacity>
  );
}

const CampaignSummaryText = {
  Header: ({text}) => {
    return (
      <Text
        style={{
          fontFamily: 'Montserrat-Bold',
          fontSize: RFValue(15),
          color: theme.COLOR_LIGHT_BLUE,
        }}
      >{text}</Text>
    );
  },
  RowHeader: ({text}) => {
    return (
      <Text
        style={{
          fontFamily: 'Montserrat-Bold',
          fontSize: RFValue(14),
          color: theme.COLOR_BLACK,
          textAlign: 'center'
        }}
      >{text}</Text>
    );
  },
  Label: ({text, textAlign = 'left'}) => {
    return (
      <Text
        style={{
          fontFamily: 'Montserrat-Medium',
          fontSize: RFValue(11),
          color: theme.COLOR_NORMAL_FONT,
          lineHeight: RFValue(14),
          textAlign
        }}
      >{text}</Text>
    );
  },
  Common: ({text, textAlign = 'right'}) => {
    return (
      <Text
        style={{
          fontFamily: 'Montserrat-Bold',
          fontSize: RFValue(11),
          color: theme.COLOR_NORMAL_FONT,
          lineHeight: RFValue(14),
          textAlign
        }}
      >{text}</Text>
    );
  },
  Button: ({text}) => {
    return (
      <Text
        style={{
          fontFamily: 'Montserrat-Medium',
          fontSize: RFValue(11),
          color: theme.COLOR_WHITE
        }}
      >{text}</Text>
    );
  }
};

export default CampaignSummaryModal;