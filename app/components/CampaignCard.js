import React from 'react';
import Carousel from 'react-native-snap-carousel';
import { View, Text, Dimensions, ActivityIndicator } from 'react-native';
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
import { toMoney } from '../utils';


export const CampaignCardList = ({ campaigns, viewDetails }) =>
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
                    <CommonText>{campaign.client[0].business_name}</CommonText>
                </CardColumnContentBody>

                <View style={{ height: 2 }} />

                <CardColumnContentBody>
                  <View style={styles.homePageCampaignCardInfoWrapper}>
                      <Text style={styles.homePageCampaignCardInfoLabel}>
                          Location
                      </Text>

                      <Text style={styles.homePageCampaignCardInfoValue}>
                          {campaign.location}
                      </Text>
                  </View>

                  <View style={styles.homePageCampaignCardInfoWrapper}>
                      <Text style={styles.homePageCampaignCardInfoLabel}>
                          Basic Pay
                      </Text>

                      <Text style={styles.homePageCampaignCardInfoValue}>
                          {toMoney(campaign.pay_basic)}
                      </Text>
                  </View>

                  <View style={styles.homePageCampaignCardInfoWrapper}>
                      <Text style={styles.homePageCampaignCardInfoLabel}>
                          Slots Available
                      </Text>

                      <Text style={styles.homePageCampaignCardInfoValue}>
                          {campaign.slots_used} of {campaign.slots}
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
                    >
                        {campaign.description}
                    </Text>
                </CardColumnContentBody>
            </CardColumnContent>
        </Card>
    </View>
  );

export const CampaignCardRec = ({ campaigns, viewDetails }) => {
  const windowWidth = Dimensions.get('window').width;
  const vehicleTypes = Object.values(VEHICLE.TYPE);

  const campaignBody = (data) => (
    <View style={styles.homePageRecommendedCampaignInfoContainer} >
        <Card>
            <CardHeader active>
                <LabelText>{data.item.name}</LabelText>
                <CommonText>{data.item.client[0].business_name}</CommonText>
            </CardHeader>

            <View key={data.id}>
              <CardBody divider>
                  <Text
                      style={[
                          styles.homePageCommonText,
                          styles.homePageTextCommonColor,
                          styles.homePageDescriptionText
                      ]}
                  >
                      {
                          data.item.description.length <= 200
                          ? data.item.description
                          : `${data.item.description.substring(0, 200)}...`
                      }
                  </Text>
              </CardBody>

              <CardBody>
                  <View style={styles.homePageRecommendedCampaignBody} >
                      <View style={styles.homePageRecommendedCampaignFirstCol} >
                          <LabelText>{data.item.location}</LabelText>
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
                              <LabelText>{data.item.slots_used}</LabelText>

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
                <LabelText color="white">P {toMoney(data.item.pay_basic)}</LabelText>
                <CommonText color="white">BasicPay</CommonText>
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
