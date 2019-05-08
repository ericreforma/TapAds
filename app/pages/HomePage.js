import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    ImageBackground,
    ScrollView,
    TouchableOpacity,
    TouchableHighlight,
    Dimensions,
    Animated
} from 'react-native';
import styles from '../styles/page.Home.style';
import { HeaderNav, UserInfo } from '../components/HeaderNav';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardColumnContent,
    CardColumnContentBody
} from '../components/Card';
import { VehicleType, VehicleCategory } from '../components/VehicleType';
import { LabelText, CommonText } from '../components/Text';
import Carousel from 'react-native-snap-carousel';
import theme from '../styles/theme.style';
import ModalMenu from '../components/Modal/Navigation';

export default class HomePage extends Component {
    state = {
        modalFadeBackground: new Animated.Value(0),
        modalContainerzIndex: 0,
        modalXValue: new Animated.Value(Dimensions.get('window').width),

        scrollEnable: true,
        carouselPage: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        campaignViewLength: 3,
        userData: {
            name: 'Patrick Cua',
            rate: 4.60239,
            totalRate: 35 //total number of clients(rating)
        },
        recommendedData: [
            {
                campaign: 'Campaign Name',
                client: 'Brand name here',
                description: 'Porttitor congue quam ridiculus mi felis sollicitudin etiam non conubia blandit viverra ullamcorper. Torquent donec hac nulla. Sagittis dictumst potenti tincidunt. Bibendum hac tellus felis lacus gravida.',
                location: 'Quezon City',
                vehicleType: 2,
                vehicleClass: 'Private',
                slots: '100',
                availableSlots: '67',
                basicPay: '5,000'
            },{
                campaign: 'Campaign Name',
                client: 'Brand name here',
                description: 'Porttitor congue quam ridiculus mi felis sollicitudin etiam non conubia blandit viverra ullamcorper. Torquent donec hac nulla. Sagittis dictumst potenti tincidunt. Bibendum hac tellus felis lacus gravida.',
                location: 'Quezon City',
                vehicleType: 'small',
                vehicleClass: 'Private',
                slots: '100',
                availableSlots: '67',
                basicPay: '5,000'
            },{
                campaign: 'Campaign Name',
                client: 'Brand name here',
                description: 'Porttitor congue quam ridiculus mi felis sollicitudin etiam non conubia blandit viverra ullamcorper.',
                location: 'Quezon City',
                vehicleType: 'small',
                vehicleClass: 'Private',
                slots: '100',
                availableSlots: '67',
                basicPay: '5,000'
            },{
                campaign: 'Campaign Name',
                client: 'Brand name here',
                description: 'Porttitor congue quam ridiculus mi felis sollicitudin etiam non conubia blandit viverra ullamcorper.',
                location: 'Quezon City',
                vehicleType: 'small',
                vehicleClass: 'Private',
                slots: '100',
                availableSlots: '67',
                basicPay: '5,000'
            }
        ],
        categoryData: [
            {
                type: 'small',
                description: 'Sedan or smaller'
            },{
                type: 'mid',
                description: 'Compact SUV to Regular SUV'
            },{
                type: 'large',
                description: 'Van to Truck'
            },{
                type: 'motorcycle',
                description: 'Lorem Ipsum Dolor'
            }
        ],
        campaignData: [
            {
                campaign_name: 'Campaign Name',
                client_name: 'Brand name here',
                description: 'Porttitor congue quam ridiculus mi felis sollicitudin etiam non conubia blandit viverra ullamcorper. Torquent donec hac nulla.',
                location: 'Quezon City',
                vehicleType: 2,
                vehicleClass: 'Private',
                slots: '100',
                slot_available: '67',
                pay_basic: '5,000'
            },{
                campaign_name: 'Campaign Name',
                client_name: 'Brand name here',
                description: 'Porttitor congue quam ridiculus mi felis sollicitudin etiam non conubia blandit viverra ullamcorper. Torquent donec hac nulla.',
                location: 'Quezon City',
                vehicleType: 2,
                vehicleClass: 'Private',
                slots: '100',
                slot_available: '67',
                pay_basic: '5,000'
            },{
                campaign_name: 'Campaign Name',
                client_name: 'Brand name here',
                description: 'Porttitor congue quam ridiculus mi felis sollicitudin etiam non conubia blandit viverra ullamcorper. Torquent donec hac nulla.',
                location: 'Quezon City',
                vehicleType: 2,
                vehicleClass: 'Private',
                slots: '100',
                slot_available: '67',
                pay_basic: '5,000'
            },{
                campaign_name: 'Campaign Name',
                client_name: 'Brand name here',
                description: 'Porttitor congue quam ridiculus mi felis sollicitudin etiam non conubia blandit viverra ullamcorper. Torquent donec hac nulla.',
                location: 'Quezon City',
                vehicleType: 2,
                vehicleClass: 'Private',
                slots: '100',
                slot_available: '67',
                pay_basic: '5,000'
            },{
                campaign_name: 'Campaign Name',
                client_name: 'Brand name here',
                description: 'Porttitor congue quam ridiculus mi felis sollicitudin etiam non conubia blandit viverra ullamcorper. Torquent donec hac nulla.',
                location: 'Quezon City',
                vehicleType: 2,
                vehicleClass: 'Private',
                slots: '100',
                slot_available: '67',
                pay_basic: '5,000'
            },{
                campaign_name: 'Campaign Name',
                client_name: 'Brand name here',
                description: 'Porttitor congue quam ridiculus mi felis sollicitudin etiam non conubia blandit viverra ullamcorper. Torquent donec hac nulla.',
                location: 'Quezon City',
                vehicleType: 2,
                vehicleClass: 'Private',
                slots: '100',
                slot_available: '67',
                pay_basic: '5,000'
            },{
                campaign_name: 'Campaign Name',
                client_name: 'Brand name here',
                description: 'Porttitor congue quam ridiculus mi felis sollicitudin etiam non conubia blandit viverra ullamcorper. Torquent donec hac nulla.',
                location: 'Quezon City',
                vehicleType: 2,
                vehicleClass: 'Private',
                slots: '100',
                slot_available: '67',
                pay_basic: '5,000'
            }
        ],
        campaignInfoLabel: [
            {
                name: 'location',
                label: 'Location'
            },{
                name: 'pay_basic',
                label: 'Basic Pay'
            },{
                name: ['slot_available', 'slots'],
                label: 'Slots available'
            }
        ]
    }

    menuButtonOnPress = () => {
        Animated.timing(this.state.modalFadeBackground, {
            toValue: this.state.scrollEnable ? 0.7 : 0,
            duration: 600
        }).start(() => {
            this.setState({
                modalContainerzIndex: this.state.scrollEnable ? 0 : 1
            });
        });

        Animated.timing(this.state.modalXValue, {
            toValue: this.state.scrollEnable ? this.state.width - 330 : this.state.width,
            duration: 500
        }).start();

        this.setState({
            scrollEnable: !this.state.scrollEnable,
            modalContainerzIndex: 1
        });
    }

    notifButtonOnPress = () => {
        alert('Notif button pressed');
    }

    recommendedCarouselCardBody = (data) => {
        return (
            <View>
                <CardBody divider={true}>
                    <Text
                        style={[
                            styles.homePageCommonText,
                            styles.homePageTextCommonColor,
                            styles.homePageDescriptionText
                        ]}
                    >
                        {
                            data.description.length <= 200
                            ? data.description
                            : data.description.substring(0,200) + '...'
                        }
                    </Text>
                </CardBody>

                <CardBody>
                    <View
                        style={styles.homePageRecommendedCampaignInfoContainer}
                    >
                        <View
                            style={styles.homePageRecommendedCampaignInfoView}
                        >
                            <LabelText>{data.location}</LabelText>
                            <CommonText>Location</CommonText>
                        </View>
                        
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <VehicleType
                                vehicleType={data.vehicleType}
                                vehicleColor="black"
                            />
                            
                            <CommonText>{data.vehicleClass}</CommonText>
                        </View>

                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'flex-end',
                                alignItems: 'flex-end'
                            }}
                        >
                            <View style={{flexDirection: 'row'}}>
                                <LabelText>{data.availableSlots}</LabelText>

                                <Text
                                    style={styles.homePageOfTextBlack}
                                >
                                    of
                                </Text>

                                <LabelText>{data.slots}</LabelText>
                            </View>

                            <CommonText>Slots available</CommonText>
                        </View>
                    </View>
                </CardBody>
            </View>
        );
    }

    _renderRecommendedItem = ({item, index}) => {
        return (
            <View
                style={{
                    backgroundColor: theme.COLOR_WHITE,
                    borderRadius: 15
                }}
            >
                <Card>
                    <CardHeader active={true}>
                        <LabelText>{item.campaign}</LabelText>
                        <CommonText>{item.client}</CommonText>
                    </CardHeader>

                    {this.recommendedCarouselCardBody(item)}

                    <CardFooter
                        active={true}
                        justifyContent={true}
                        buttonViewInfo={true}
                    >
                        <LabelText color="white">P{item.basicPay}</LabelText>
                        <CommonText color="white">BasicPay</CommonText>
                    </CardFooter>
                </Card>
            </View>
        );
    }

    _renderCategoryItem = ({item, index}) => {
        return (
            <View>
                <Card>
                    <CardBody header={true}>
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <VehicleCategory
                                vehicleType={item.type}
                            />
                        </View>
                    </CardBody>

                    <CardFooter active={true}>
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <LabelText color="white">
                                {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                            </LabelText>

                            <View
                                style={{
                                    height: 3,
                                    width: 25,
                                    backgroundColor: theme.COLOR_WHITE,
                                    marginVertical: 10
                                }}
                            ></View>
                            
                            <View
                                style={{
                                    height: 35
                                }}
                            >   
                                <CommonText color="white">{item.description}</CommonText>
                            </View>
                        </View>
                    </CardFooter>
                </Card>
            </View>
        );
    }

    loadMoreCampaign = () => {
        var returnJSX;
        if(this.state.campaignViewLength < this.state.campaignData.length) {
            returnJSX = (
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <TouchableOpacity
                        onPress={this.onPressLoadMore}
                    >
                        <LabelText color="white">Load more</LabelText>
                    </TouchableOpacity>
                </View>
            );
        }

        return returnJSX;
    }

    onPressLoadMore = (e) => {
        this.setState({
            campaignViewLength: this.state.campaignViewLength + 3
        });
    }

    render() {
        return (
            <View>
                <ImageBackground
                    style={{
                        width: '100%',
                        minHeight: this.state.height,
                        position: 'absolute'
                    }}
                    resizeMode="stretch"
                    source={require('../assets/image/common_page_background.png')}
                ></ImageBackground>
                
                <HeaderNav
                    menuButtonOnPress={this.menuButtonOnPress}
                    notifButtonOnPress={this.notifButtonOnPress}
                />

                <ScrollView
                    style={{
                        marginBottom: 60,
                    }}
                    overScrollMode='never'
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={this.state.scrollEnable}
                >

                    <UserInfo 
                        profilePicture={require('../assets/image/male_avatar.png')}
                        userData={this.state.userData}
                    />
                    
                    <View
                        style={{
                            paddingVertical: 20,
                        }}
                    >
                        {/* recommended for you section */}
                        <View
                            style={{
                                flexDirection: 'column',
                                marginVertical: 10
                            }}
                        >
                            {/* labels */}
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    paddingHorizontal: theme.PAGE_PADDING_HORIZONTAL
                                }}
                            >
                                <LabelText color="white">Recommended for you</LabelText>
                                
                                <TouchableOpacity>
                                    <Text
                                        style={{
                                            fontFamily: 'Montserrat-Regular',
                                            color: theme.COLOR_PINK
                                        }}
                                    >
                                        View All
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            {/* content */}
                            <View
                                style={{
                                    paddingVertical: 20
                                }}
                            >
                                <Carousel
                                    data={this.state.recommendedData}
                                    renderItem={this._renderRecommendedItem}
                                    layout={'default'}
                                    sliderWidth={this.state.width}
                                    itemWidth={this.state.width - 50}
                                />
                            </View>
                        </View>
                        
                        {/* categories section */}
                        <View
                            style={{
                                marginVertical: 10
                            }}
                        >
                            {/* label */}
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <View
                                    style={{
                                        flex: 1,
                                        height: 2,
                                        backgroundColor: theme.COLOR_WHITE,
                                    }}
                                ></View>

                                <View
                                    style={{
                                        paddingHorizontal: 20
                                    }}
                                >
                                    <LabelText color="white">Categories</LabelText>
                                </View>

                                <View
                                    style={{
                                        flex: 1,
                                        height: 2,
                                        backgroundColor: theme.COLOR_WHITE,
                                    }}
                                ></View>
                            </View>

                            {/* content */}
                            <View
                                style={{
                                    paddingVertical: 20
                                }}
                            >
                                <Carousel
                                    data={this.state.categoryData}
                                    renderItem={this._renderCategoryItem}
                                    layout={'default'}
                                    sliderWidth={this.state.width}
                                    itemWidth={(this.state.width / 3) + 20}
                                    loop={true}
                                />
                            </View>
                        </View>
                    
                        {/* campaign section */}
                        <View
                            style={{
                                marginVertical: 10,
                                paddingHorizontal: theme.PAGE_PADDING_HORIZONTAL
                            }}
                        >
                            {/* label */}
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: 10
                                }}
                            >
                                <LabelText color="white">Latest</LabelText>
                                
                                <TouchableOpacity>
                                    <Text
                                        style={{
                                            fontFamily: 'Montserrat-Regular',
                                            color: theme.COLOR_PINK
                                        }}
                                    >
                                        View All
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            {/* content */}
                            {this.state.campaignData
                                .filter((cd, cdIdx) => cdIdx <= (this.state.campaignViewLength - 1))
                                .map((cData, cIndex) =>
                                    <View
                                        key={cIndex}
                                        style={{
                                            marginVertical: 5
                                        }}
                                    >
                                        <Card
                                            justifyContent={true}
                                        >
                                            <CardColumnContent
                                                firstChild={true}
                                                backgroundColor={theme.COLOR_WHITE}
                                                carType="Private"
                                                carSize="large"
                                            >
                                                <CardColumnContentBody
                                                    divider={true}
                                                >
                                                    <LabelText>{cData.campaign_name}</LabelText>
                                                    <CommonText>{cData.client_name}</CommonText>
                                                </CardColumnContentBody>
                                                
                                                <View
                                                    style={{
                                                        height: 2
                                                    }}
                                                ></View>
                                                
                                                <CardColumnContentBody>
                                                    {this.state.campaignInfoLabel.map((campaign, campaignIndex) =>
                                                        <View
                                                            key={campaignIndex}
                                                            style={{
                                                                flexDirection: 'row',
                                                                justifyContent: 'space-between'
                                                            }}
                                                        >
                                                            <Text    
                                                                style={{
                                                                    fontFamily: 'Montserrat-Regular',
                                                                    fontSize: theme.FONT_SIZE_SMALL,
                                                                    color: theme.COLOR_NORMAL_FONT
                                                                }}
                                                            >
                                                                {campaign.label}
                                                            </Text>

                                                            <Text
                                                                style={{
                                                                    fontFamily: 'Montserrat-Bold',
                                                                    fontSize: theme.FONT_SIZE_SMALL,
                                                                    color: theme.COLOR_NORMAL_FONT
                                                                }}
                                                            >
                                                                {
                                                                    Array.isArray(campaign.name)
                                                                    ? cData[campaign.name[0]] + ' of ' + cData[campaign.name[1]]
                                                                    : cData[campaign.name]
                                                                }
                                                            </Text>
                                                        </View>
                                                    )}
                                                </CardColumnContentBody>
                                            </CardColumnContent>

                                            <CardColumnContent
                                                lastChild={true}
                                                backgroundColor={theme.COLOR_GRAY_HEAVY}
                                                buttonViewInfo={true}
                                            >
                                                <CardColumnContentBody>
                                                    <Text    
                                                        style={{
                                                            fontFamily: 'Montserrat-Regular',
                                                            fontSize: theme.FONT_SIZE_SMALL,
                                                            color: theme.COLOR_WHITE
                                                        }}
                                                    >
                                                        {cData.description}
                                                    </Text>
                                                </CardColumnContentBody>
                                            </CardColumnContent>
                                        </Card>
                                    </View>  
                                )
                            }
                        </View>
                            
                        {this.loadMoreCampaign()}
                    </View>
                </ScrollView>

                <ModalMenu
                    modalContainerzIndex={this.state.modalContainerzIndex}
                    modalContainerTop={this.state.modalContainerTop}
                    width={this.state.width}
                    height={this.state.scrollEnable ? 0 : this.state.height}
                    modalFadeBackground={this.state.modalFadeBackground}
                    modalXValue={this.state.modalXValue}
                    menuButtonOnPress={this.menuButtonOnPress}
                />
            </View>
        );
    }
}