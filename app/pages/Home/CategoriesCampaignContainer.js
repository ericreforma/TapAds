import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Text,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";

import { HomePageRowContainer } from './HomePageRowContainer';
import CampaignContainer from './Modal/CampaignContainer';
import { CampaignAction } from '../../redux/actions/campaign.action';

import { getTotalPay, getSlotAvailable } from '../../config/functions';
import { VEHICLE } from '../../config/variables';
import theme from '../../styles/theme.style';

const carClassification = id => Object.values(VEHICLE.CLASS).find(i => i.id === id);
const carType = Object.values(VEHICLE.TYPE);
const vehicleCategories = Object.values(VEHICLE.CLASS);
const defaultSelectedCategory = vehicleCategories.map(v => v.id === 0 ? true : false);
const cHeight = theme.SCREEN_HEIGHT * 0.18;
const cWidth = theme.SCREEN_WIDTH / 3.5;
const activeCampaignGradient = require('../../assets/image/active_campaign_gradient2.png');
const campaignImage = require('../../assets/image/test_campaign_category.png');

const CategoriesCampaignContainer = props => {
  const categorySelectionRef = useRef();
  const [descHeight, setDescHeight] = useState(false);
  const [catPressLoading, setCatPressLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(defaultSelectedCategory);

  useEffect(() => {
    if(!props.isRequesting) {
      setCatPressLoading(false);
    }
  }, [props.isRequesting])

  const CategoryCampaignBody = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={{
          paddingHorizontal: 5,
          paddingVertical: 10
        }}
        onPress={e => {
          setCatPressLoading(!catPressLoading);
          props.CampaignChangeCategory(index);
          props.CampaignListRequest();
          setSelectedCategory(selectedCategory.map((s, sInd) => sInd === index ? true : false));
        }}
      >
        <View
          style={{
            borderRadius: 10,
            overflow: 'hidden',
            width: cWidth,
            backgroundColor: theme.COLOR_WHITE,
            elevation: selectedCategory[index] ? 5 : 0
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
              backgroundColor: selectedCategory[index] ? theme.COLOR_GRAY_HEAVY : theme.COLOR_GRAY_MEDIUM,
            }}
            onLayout={e => {
              const { height } = e.nativeEvent.layout;
              if(!descHeight) {
                setDescHeight(height);
              } else if(height > descHeight) {
                setDescHeight(height);
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

            {item.description.map((d, dIdx) =>
              <CategoryFont.Selection.Common key={dIdx} text={d} />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  const CategoryCampaignSelection = () => {
    return (
      <FlatList
        ref={categorySelectionRef}
        data={vehicleCategories}
        renderItem={({item, index}) =>
          <CategoryCampaignBody
            item={item}
            index={index}
          />
        }
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}
        overScrollMode="never"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: RFPercentage(2) - 5
        }}
      />
    );
  }

  const CategoryCampaignContent = () => {
    if(catPressLoading) {
      return (
        <View
          style={{
            marginTop: 15,
          }}
        >
          <ActivityIndicator color="#fff" />
        </View>
      );
    } else if(props.campaigns.length === 0) {
      return (
        <View
          style={{
            paddingVertical: 20,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <CategoryFont.Selection.Label text="-- no campaigns available --" />
        </View>
      );
    } else {
      return (
        <View>
          {props.campaigns.map(c =>
            <CampaignContainer
              key={c.id}
              style={{
                paddingVertical: 8,
                paddingHorizontal: RFPercentage(2) - 2
              }}
              activeOpacity={0.9}
              onPress={e => props.viewDetails(c.id)}
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
          )}

          {!props.isRequesting ?
            props.current_page < props.total_page ?
              <TouchableOpacity
                style={{
                  marginTop: 15,
                  alignSelf: 'center'
                }}
                onPress={() => { props.CampaignListRequest(); }}
              >
                <CategoryFont.Content.CarType text="load more" />
              </TouchableOpacity>
            : false
          : (
            <View
              style={{
                marginTop: 15,
              }}
            >
              <ActivityIndicator color="#fff" />
            </View>
          )}
        </View>
      );
    }
  }

  const CategoryCampaignContentImage = ({c}) => {
    const contentWidth = cWidth + 5;
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
          source={campaignImage}
          resizeMode="center"
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
          justifyContent: 'space-between'
        }}
      >
        <View
          style={{
            paddingRight: 5
          }}
        >
          <CategoryFont.Content.Common text={label} />
        </View>

        <View
          style={{
            paddingLeft: 5
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
            lineHeight: RFValue(10)
          }}
          numberOfLines={1}
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
      {/* categories section */}
      <HomePageRowContainer
        headerCenterText="Categories"
      >
        <CategoryCampaignSelection />
      </HomePageRowContainer>

      <HomePageRowContainer
        headerLeftText="Campaigns"
        headerRightText="Latest"
      >
        <CategoryCampaignContent />
      </HomePageRowContainer>
    </View>
  );
};

const mapStateToProps = state => ({
  campaigns: state.campaignReducer.list,
  isRequesting: state.campaignReducer.isRequesting,
	total_page: state.campaignReducer.total_page,
	current_page: state.campaignReducer.current_page,
});

const mapDispatchToProps = dispatch => ({
  CampaignChangeCategory: (category) => dispatch(CampaignAction.changeCategory(category)),
  CampaignListRequest: (newBatch = false, callback) => dispatch(CampaignAction.list(newBatch, callback)),
  viewDetails: (id) => dispatch(CampaignAction.selected(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesCampaignContainer);