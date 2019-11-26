import React, { Component } from 'react';
import Carousel from 'react-native-snap-carousel';
import {
  View,
  Text,
  Dimensions,
  PermissionsAndroid,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardColumnContent,
    CardColumnContentBody
} from '../components/Card';
import { LabelText, CommonText } from '../components/Text';
import styles from '../styles/page.Home.style';
import theme from '../styles/theme.style';
import { VehicleType } from './VehicleType';
import { VEHICLE } from '../config/variables';
import { earnUpTo } from '../config/functions';

const windowWidth = Dimensions.get('window').width;
const vehicleTypes = Object.values(VEHICLE.TYPE);

export const CampaignCardList = ({ campaigns, isRequesting, viewDetails }) => {
  return campaigns.length !== 0 ? (
    campaigns.map((campaign, index) =>
      <View
          key={index}
          style={styles.homePageCampaignCardContainer}
      >
          <Card justifyContent>
              <CardColumnContent
                  firstChild
                  backgroundColor={theme.COLOR_WHITE}
                  carType={campaign.vehicle_type}
                  carSize={campaign.vehicle_classification}
              >
                  <CardColumnContentBody divider >
                      <LabelText>{campaign.name}</LabelText>
                      <CommonText
                          numberOfLines={1}
                      >
                          {campaign.client.business_name}
                      </CommonText>
                  </CardColumnContentBody>

                  <View style={{ height: 2 }} />

                  <CardColumnContentBody>
                    <View style={styles.homePageCampaignCardInfoWrapper}>
                        <Text style={styles.homePageCampaignCardInfoLabel}>
                            Location
                        </Text>

                        <Text style={styles.homePageCampaignCardInfoValue} numberOfLines={2}>
                            {campaign.location}
                        </Text>
                    </View>

                    <View style={styles.homePageCampaignCardInfoWrapper}>
                        <Text style={styles.homePageCampaignCardInfoLabel}>
                            Earn up to
                        </Text>

                        <Text style={styles.homePageCampaignCardInfoValue}>
                            P {earnUpTo(campaign)}
                        </Text>
                    </View>

                    <View style={styles.homePageCampaignCardInfoWrapper}>
                        <Text style={styles.homePageCampaignCardInfoLabel}>
                            Slots Available
                        </Text>

                        <Text style={styles.homePageCampaignCardInfoValue}>
                            {campaign.slots - campaign.slots_used} of {campaign.slots}
                        </Text>
                    </View>
                  </CardColumnContentBody>
              </CardColumnContent>

              <CardColumnContent
                  lastChild
                  backgroundColor={theme.COLOR_GRAY_HEAVY}
                  buttonViewInfo
                  buttonViewOnPress={() => { viewDetails(campaign.id); }}
              >
                  <CardColumnContentBody>
                      <Text
                          style={[
                              styles.homePageCommonText,
                              styles.homePageTextWhite
                          ]}
                          numberOfLines={10}
                      >
                          {campaign.description}
                      </Text>
                  </CardColumnContentBody>
              </CardColumnContent>
          </Card>
      </View>
    )
  ) : (
    !isRequesting ? (
      <View style={styles.homePageCategoriesNoCampaigns}>
        <CommonText color="white">-- no campaigns available --</CommonText>
      </View>
    ) : null
  );
};

export const CampaignCardRec = ({ campaigns, viewDetails }) => {
  const campaignBody = (data) => (
    <View style={styles.homePageRecommendedCampaignInfoContainer}>
        <Card>
            <CardHeader active>
                <LabelText>{data.item.name}</LabelText>
                <CommonText>{data.item.client.business_name}</CommonText>
            </CardHeader>

            <View key={data.id}>
              <CardBody divider>
                  <View
                    style={{
                      height: 75
                    }}
                  >
                    <Text
                      style={[
                          styles.homePageCommonText,
                          styles.homePageTextCommonColor,
                          styles.homePageDescriptionText
                      ]}
                      numberOfLines={4}
                    >
                        {data.item.description}
                    </Text>
                  </View>
              </CardBody>

              <CardBody>
                  <View style={styles.homePageRecommendedCampaignBody} >
                      <View style={styles.homePageRecommendedCampaignFirstCol} >
                          <LabelText numberOfLines={2}>{data.item.location}</LabelText>
                          <CommonText>Location</CommonText>
                      </View>

                      <View style={styles.homePageAlignCenter}>
                          <VehicleType
                              vehicleType={data.item.vehicle_classification}
                              vehicleColor="black"
                          />
                          <CommonText>{
                            vehicleTypes[data.item.vehicle_type].name
                          }</CommonText>
                      </View>

                      <View style={styles.homePageAlignRight} >
                          <View style={{ flexDirection: 'row' }}>
                              <LabelText>{data.item.slots - data.item.slots_used}</LabelText>

                              <Text style={styles.homePageOfTextBlack} >
                                  of
                              </Text>

                              <LabelText>{data.item.slots}</LabelText>
                          </View>

                          <CommonText>Slots available</CommonText>
                      </View>
                  </View>
              </CardBody>
            </View>

            <CardFooter
              active
              justifyContent
              buttonViewInfo
              buttonViewOnPress={() => { viewDetails(data.item.id); }}
            >
                <LabelText color="white">P {earnUpTo(data.item)}</LabelText>
                <CommonText color="white">Earn up to</CommonText>
            </CardFooter>
        </Card>
    </View>
  );

  if (campaigns) {
    return (
      <Carousel
          data={campaigns}
          renderItem={campaignBody}
          layout={'default'}
          sliderWidth={windowWidth}
          itemWidth={(windowWidth - 50)}
      />
    );
  } else {
    return (
      <ActivityIndicator color="#fff" style={{ height: 150 }} />
    );
  }
};

export class CampaignCardActive extends Component {
  state = {
    loader: [],
    activeCampaignList: []
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { mylistRequesting, mylistRequestDone, myList } = nextProps;
    if(!mylistRequestDone && mylistRequesting) {
      return { loader: [] };
    } else if(mylistRequestDone && !mylistRequesting) {
      const activeCampaignList = myList.filter(l => l.request_status === 1 && !l.end);
      var loader = prevState.loader;
      if(prevState.loader.length === 0) loader = Array(activeCampaignList.length).fill(false);
      return { activeCampaignList, loader };
    } else {
      return null;
    }
  }

	async requestCameraPermission(id, location_id, index) {
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
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const { loader } = this.state;
        loader[index] = !loader[index];
        this.setState({loader});

        this.props.campaignSelected(id, false, () => {
          this.props.checkCampaignLocation(location_id, () => {
            this.props.dispatchTrip();
          });
        });
			} else {

			}
		} catch (err) {
			console.warn(err);
		}
  }

  activeCampaignBody = (data) => (
    <View style={styles.homePageRecommendedCampaignInfoContainer}>
      <Card>
        <CardHeader active>
          <LabelText numberOfLines={1}>
            {data.item.campaignDetails.name}
          </LabelText>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <View
              style={{
                flex: 1
              }}
            >
              <CommonText numberOfLines={1}>
                {data.item.client.business_name}
              </CommonText>
            </View>
                                        
            <View
              style={{
                width: 90,
                alignItems: 'flex-end'
              }}
            >
              <TouchableOpacity
                onPress={() => { this.props.campaignSelected(data.item.id); }}
              >
                <Text style={styles.homePageViewAll}>
                  Full details
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </CardHeader>
      
        <CardBody>
          <View style={styles.homePageRecommendedCampaignBody}>
            <View style={styles.homePageRecommendedCampaignFirstCol}>
              <LabelText numberOfLines={1}>{data.item.campaignDetails.location}</LabelText>
              <CommonText>Location</CommonText>
            </View>

            <View style={styles.homePageAlignCenter}>
              <VehicleType
                vehicleType={data.item.campaignDetails.vehicle_classification}
                vehicleColor="black"
              />

              <CommonText>
                {vehicleTypes[data.item.campaignDetails.vehicle_type].name}
              </CommonText>
            </View>

            <View style={styles.homePageAlignRight}>
              <LabelText>P {earnUpTo(data.item.campaignDetails)}</LabelText>
              <CommonText>Earn up to</CommonText>
            </View>
          </View>
        </CardBody>
      
        <CardFooter active>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: theme.COLOR_BLUE,
              borderRadius: 15,
              paddingVertical: 10
            }}
            onPress={() => { this.requestCameraPermission(data.item.id, data.item.campaignDetails.location_id, data.index); }}
            disabled={this.state.loader[data.index]}
          >
            {this.state.loader[data.index] ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <LabelText color="white">Start trip</LabelText>
            )}
          </TouchableOpacity>
        </CardFooter>
      </Card>
    </View>
  );

  render() {
    if(this.state.activeCampaignList.length > 0) {
      return (
        <Carousel
          data={this.state.activeCampaignList}
          renderItem={this.activeCampaignBody}
          layout={'default'}
          sliderWidth={windowWidth}
          itemWidth={(windowWidth - 50)}
        />
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            padding: 20,
            marginHorizontal: 20,
            borderRadius: theme.PAGE_CARD_RADIUS,
            backgroundColor: theme.COLOR_WHITE
          }}
        >
          <View
            style={{
              alignSelf: 'center'
            }}
          >
            <CommonText>-- no active campaigns --</CommonText>
          </View>
        </View>
      );
    }
  }
}