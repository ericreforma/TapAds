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
                location: 'Quezon',
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
        ],

        //category
        currentCategoryIndex: 0
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
                        style={styles.homePageRecommendedCampaignBody}
                    >
                        <View
                            style={styles.homePageRecommendedCampaignFirstCol}
                        >
                            <LabelText>{data.location}</LabelText>
                            <CommonText>Location</CommonText>
                        </View>
                        
                        <View
                            style={styles.homePageAlignCenter}
                        >
                            <VehicleType
                                vehicleType={data.vehicleType}
                                vehicleColor="black"
                            />
                            
                            <CommonText>{data.vehicleClass}</CommonText>
                        </View>

                        <View
                            style={styles.homePageAlignRight}
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
                style={styles.homePageRecommendedCampaignInfoContainer}
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
                            style={styles.homePageAlignCenter}
                        >
                            <VehicleCategory
                                vehicleType={item.type}
                            />
                        </View>
                    </CardBody>

                    <CardFooter active={true}>
                        <View
                            style={styles.homePageAlignCenter}
                        >
                            <LabelText color="white">
                                {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                            </LabelText>

                            <View
                                style={styles.homePageCategoryDescriptionContainer}
                            ></View>
                            
                            <View
                                style={styles.homePageCategoryDescriptionWrapper}
                            >   
                                <CommonText color="white">{item.description}</CommonText>
                            </View>
                        </View>
                    </CardFooter>
                </Card>
            </View>
        );
    }

    _currentCategory = (slideIndex) => {
        this.setState({ currentCategoryIndex: slideIndex });
    }
    
    loadMoreCampaign = () => {
        var returnJSX;
        if(this.state.campaignViewLength < this.state.campaignData.length) {
            returnJSX = (
                <View
                    style={styles.homePageAlignCenter}
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
                        {/* recommended for you section */}
                        <View
                            style={[
                                styles.homePageRecommendedContainer,
                                styles.homePageSectionVerticalMargin
                            ]}
                        >
                            {/* labels */}
                            <View
                                style={styles.homePageRecommendedLabel}
                            >
                                <LabelText color="white">Recommended for you</LabelText>
                                
                                <TouchableOpacity>
                                    <Text
                                        style={styles.homePageViewAll}
                                    >
                                        View All
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            {/* content */}
                            <View
                                style={styles.homePageContentPadding}
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
                            style={styles.homePageSectionVerticalMargin}
                        >
                            {/* label */}
                            <View
                                style={styles.homePageCategoryLabel}
                            >
                                <View
                                    style={styles.homePageCategoryLabelLine}
                                ></View>

                                <View
                                    style={styles.homePageCategoryLabelText}
                                >
                                    <LabelText color="white">Categories</LabelText>
                                </View>

                                <View
                                    style={styles.homePageCategoryLabelLine}
                                ></View>
                            </View>

                            {/* content */}
                            <View
                                style={styles.homePageContainer}
                            >
                                <Carousel
                                    data={this.state.categoryData}
                                    renderItem={this._renderCategoryItem}
                                    layout={'default'}
                                    sliderWidth={this.state.width}
                                    itemWidth={(this.state.width / 3) + 20}
                                    loop={true}
                                    onSnapToItem={this._currentCategory}
                                />
                            </View>
                        </View>
                    
                        {/* campaign section */}
                        <View
                            style={styles.homePageCampaignContainer}
                        >
                            {/* label */}
                            <View
                                style={styles.homePageCampaignLabel}
                            >
                                <LabelText color="white">Latest</LabelText>
                                
                                <TouchableOpacity>
                                    <Text
                                        style={styles.homePageViewAll}
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
                                        style={styles.homePageCampaignCardContainer}
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
                                                            style={[
                                                                styles.homePageCampaignCardInfoWrapper,
                                                                (
                                                                    campaignIndex == 0
                                                                    ? {marginBottom: 3}
                                                                    : (
                                                                        campaignIndex == (this.state.campaignInfoLabel.length - 1)
                                                                        ? {marginTop: 3}
                                                                        : {marginVertical: 3}
                                                                    )
                                                                )
                                                            ]}
                                                        >
                                                            <Text    
                                                                style={styles.homePageCampaignCardInfoLabel}
                                                            >
                                                                {campaign.label}
                                                            </Text>

                                                            <Text
                                                                style={styles.homePageCampaignCardInfoValue}
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
                                                        style={[
                                                            styles.homePageCommonText,
                                                            styles.homePageTextWhite
                                                        ]}
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
                    width={this.state.width}
                    height={this.state.scrollEnable ? 0 : this.state.height}
                    modalFadeBackground={this.state.modalFadeBackground}
                    modalXValue={this.state.modalXValue}
                    menuButtonOnPress={this.menuButtonOnPress}
                    navigation={this.props.navigation}
                />
            </View>
        );
    }
}