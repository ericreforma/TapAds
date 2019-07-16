import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    View,
    Image,
    ScrollView,
    Dimensions,
    Text
} from 'react-native';

import UserInfo from '../components/UserInfo';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
} from '../components/Card';
import { LabelText, CommonText } from '../components/Text';
import { VehicleType } from '../components/VehicleType';
import ButtonBlue from '../components/ButtonBlue';
import { Page } from './Page';
import { VEHICLE } from '../config/variables';
import theme from '../styles/theme.style';
import styles from '../styles/page.Home.style';
import { CampaignAction } from '../redux/actions/campaign.action';

class CampaignPage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        vehicleType: Object.values(VEHICLE.TYPE)
      };
    }

    render() {
        return (
            <Page>

                <ScrollView
                    style={styles.homePageScrollView}
                    overScrollMode='never'
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={this.state.scrollEnable}
                >

                    <UserInfo />

                    <View
                        style={styles.homePageContainer}
                    >
                        <View
                            style={{
                                marginHorizontal: theme.PAGE_PADDING_HORIZONTAL,
                                backgroundColor: theme.COLOR_WHITE,
                                borderRadius: 15
                            }}
                        >
                            <Card>
                                <CardHeader active={true}>
                                    <LabelText>
                                        {this.props.campaign.name}
                                    </LabelText>
                                    <CommonText>
                                        {this.props.campaign.client[0].business_name}
                                    </CommonText>
                                </CardHeader>

                                <CardBody divider={true}>
                                    <Text
                                        style={[
                                            styles.homePageCommonText,
                                            styles.homePageTextCommonColor,
                                            {
                                                lineHeight: 18,
                                                marginBottom: 10
                                            }
                                        ]}
                                    >
                                        {this.props.campaign.description}
                                    </Text>
                                </CardBody>

                                <CardBody>
                                    <View
                                        style={styles.homePageRecommendedCampaignBody}
                                    >
                                        <View
                                            style={styles.homePageRecommendedCampaignFirstCol}
                                        >
                                            <LabelText>{this.props.campaign.location}</LabelText>
                                            <CommonText>Location</CommonText>
                                        </View>

                                        <View
                                            style={styles.homePageAlignCenter}
                                        >
                                            <VehicleType
                                                vehicleType={this.props.campaign.vehicle_classification}
                                                vehicleColor="black"
                                            />

                                            <CommonText>{this.state.vehicleType[this.props.campaign.vehicle_type].name}</CommonText>
                                        </View>

                                        <View
                                            style={styles.homePageAlignRight}
                                        >
                                            <View style={{flexDirection: 'row'}}>
                                                <LabelText>{this.props.campaign.slots_used}</LabelText>

                                                <Text
                                                    style={styles.homePageOfTextBlack}
                                                >
                                                    of
                                                </Text>

                                                <LabelText>{this.props.campaign.slots}</LabelText>
                                            </View>

                                            <CommonText>Slots available</CommonText>
                                        </View>
                                    </View>

                                    <View
                                        style={{
                                            marginVertical: 10
                                        }}
                                    >
                                        <View
                                            style={{
                                                marginVertical: 10,
                                                paddingVertical: 15,
                                                flexDirection: 'row',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                backgroundColor: theme.COLOR_WHITE,
                                                borderRadius: theme.PAGE_CARD_RADIUS,
                                                elevation: 3
                                            }}
                                        >
                                            <CommonText>Additional</CommonText>

                                            <View style={{width: 5}}></View>

                                            <LabelText>P{this.props.campaign.pay_additional}</LabelText>

                                            <View style={{width: 5}}></View>

                                            <CommonText>every</CommonText>

                                            <View style={{width: 5}}></View>

                                            <LabelText>{this.props.campaign.pay_additional_km}km</LabelText>
                                        </View>

                                        <View
                                            style={{
                                                marginVertical: 10,
                                                paddingVertical: 15,
                                                flexDirection: 'row',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                backgroundColor: theme.COLOR_WHITE,
                                                borderRadius: theme.PAGE_CARD_RADIUS,
                                                elevation: 3
                                            }}
                                        >
                                            <CommonText>Basic Pay</CommonText>

                                            <View style={{width: 5}}></View>

                                            <LabelText>P{this.props.campaign.pay_basic}</LabelText>
                                        </View>
                                    </View>

                                    <View
                                        style={{
                                            marginVertical: 10,
                                            paddingHorizontal: 20
                                        }}
                                    >
                                        <Image
                                            style={{
                                                width: '100%',
                                                height: this.state.height / 5
                                            }}
                                            resizeMode="contain"
                                            source={require('../assets/image/car_sticker_placement_front.png')}
                                        />
                                    </View>
                                </CardBody>

                                <CardFooter
                                    active={true}
                                >
                                    <View
                                        style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            paddingHorizontal: 10
                                        }}
                                    >
                                        <ButtonBlue
                                            label="I'm interested"
                                            onPress={() => { this.props.interestedCampaign(); }}
                                        />
                                    </View>
                                </CardFooter>
                            </Card>
                        </View>
                    </View>
                </ScrollView>
            </Page>
        );
    }
}

const mapStateToProps = (state) => ({
  campaign: state.campaignReducer.selected
});

const mapDispatchToProps = (dispatch) => ({
  interestedCampaign: () => dispatch(CampaignAction.interested()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CampaignPage);
