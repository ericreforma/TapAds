import React, { Component } from 'react';
import {
    View,
    Image,
    Animated,
    ScrollView,
    ImageBackground,
    Dimensions,
    Text
} from 'react-native';

import { HeaderNav, UserInfo } from '../components/HeaderNav';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
} from '../components/Card';
import { LabelText, CommonText } from '../components/Text';
import { VehicleType, VehicleCategory } from '../components/VehicleType';
import ButtonBlue from '../components/ButtonBlue';

import theme from '../styles/theme.style';
import styles from '../styles/page.Home.style';

export default class CampaignPage extends Component {
    state = {
        modalFadeBackground: new Animated.Value(0),
        modalContainerzIndex: 0,
        modalXValue: new Animated.Value(Dimensions.get('window').width),
        userData: {
            name: 'Patrick Cua',
            rate: 4.60239,
            totalRate: 35 //total number of clients(rating)
        },
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        campaignData: {
            campaign: 'Campaign Name',
            client: 'Brand name here',
            description: 'Porttitor congue quam ridiculus mi felis sollicitudin etiam non conubia blandit viverra ullamcorper. Torquent donec hac nulla. Sagittis dictumst potenti tincidunt. Bibendum hac tellus felis lacus gravida.',
            location: 'Quezon City',
            vehicleType: 0,
            vehicleClass: 'Private',
            slots: '100',
            availableSlots: '67',
            basicPay: '5000',
            addPay: '1000',
            perKm: '45'
        }
    }

    render() {
        const { campaignData } = this.state;
        
        return (
            <View>
                <ImageBackground
                    style={styles.homePageBackgroundImage}
                    resizeMode="stretch"
                    source={require('../assets/image/common_page_background.png')}
                ></ImageBackground>
                
                <HeaderNav
                    menuButtonOnPress={this.menuButtonOnPress}
                    navigation={this.props.navigation}
                />

                <ScrollView
                    style={styles.homePageScrollView}
                    overScrollMode='never'
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={this.state.scrollEnable}
                >

                    <UserInfo
                        profilePicture={require('../assets/image/male_avatar.png')}
                        userData={this.state.userData}
                        navigation={this.props.navigation}
                    />
                    
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
                                        {campaignData.campaign}
                                    </LabelText>
                                    <CommonText>
                                        {campaignData.client}
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
                                        {campaignData.description}
                                    </Text>
                                </CardBody>

                                <CardBody>
                                    <View
                                        style={styles.homePageRecommendedCampaignBody}
                                    >
                                        <View
                                            style={styles.homePageRecommendedCampaignFirstCol}
                                        >
                                            <LabelText>{campaignData.location}</LabelText>
                                            <CommonText>Location</CommonText>
                                        </View>
                                        
                                        <View
                                            style={styles.homePageAlignCenter}
                                        >
                                            <VehicleType
                                                vehicleType={campaignData.vehicleType}
                                                vehicleColor="black"
                                            />
                                            
                                            <CommonText>{campaignData.vehicleClass}</CommonText>
                                        </View>

                                        <View
                                            style={styles.homePageAlignRight}
                                        >
                                            <View style={{flexDirection: 'row'}}>
                                                <LabelText>{campaignData.availableSlots}</LabelText>

                                                <Text
                                                    style={styles.homePageOfTextBlack}
                                                >
                                                    of
                                                </Text>

                                                <LabelText>{campaignData.slots}</LabelText>
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

                                            <LabelText>P{campaignData.addPay}</LabelText>

                                            <View style={{width: 5}}></View>

                                            <CommonText>every</CommonText>
                                            
                                            <View style={{width: 5}}></View>

                                            <LabelText>{campaignData.perKm}km</LabelText>
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

                                            <LabelText>P{campaignData.basicPay}</LabelText>
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
                                        />
                                    </View>
                                </CardFooter>
                            </Card>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
