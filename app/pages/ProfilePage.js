import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
    Dimensions,
    Animated
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Page } from './Page';
import { URL } from '../config/variables';
import UserInfo from '../components/UserInfo';
import { LabelText, CommonText } from '../components/Text';
import ButtonBlue from '../components/ButtonBlue';
import {
    Card,
    CardBody,
    CardColumnContent,
    CardColumnContentBody
} from '../components/Card';
import ModalMenu from '../components/Modal/Navigation';

import theme from '../styles/theme.style';
import styles from '../styles/page.Home.style';

class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
						user: [],
            // navigation menu
            modalFadeBackground: new Animated.Value(0),
            modalContainerzIndex: 0,
            modalXValue: new Animated.Value(Dimensions.get('window').width),
            scrollEnable: true,
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,

            // history data
            historyData: [
                {
                    campaign: 'Campaign name',
                    date: '03.11.19',
                    earnings: '3,000'
                },{
                    campaign: 'Campaign name',
                    date: '03.11.19',
                    earnings: '3,000'
                },{
                    campaign: 'Campaign name',
                    date: '03.11.19',
                    earnings: '3,000'
                },{
                    campaign: 'Campaign name',
                    date: '03.11.19',
                    earnings: '3,000'
                }
            ],

            // vehicle data
            vehicleData: [
                {
                    carType: 'Private',
                    carSize: 'small',
                    model: 'Kia Rio',
                    year: '2019',
                    vehicleImages: [
                        require('../assets/image/test-small-car.png'),
                        require('../assets/image/test-small-car.png'),
                        require('../assets/image/test-small-car.png'),
                        require('../assets/image/test-small-car.png')
                    ]
                },{
                    carType: 'Private',
                    carSize: 'large',
                    model: 'Toyota Hiace',
                    year: '2019',
                    vehicleImages: [
                        require('../assets/image/test-large-car.png'),
                        require('../assets/image/test-large-car.png'),
                        require('../assets/image/test-large-car.png'),
                        require('../assets/image/test-large-car.png')
                    ]
                },{
                    carType: 'Private',
                    carSize: 'mid',
                    model: 'Ford Ecosport',
                    year: '2016',
                    vehicleImages: [
                        require('../assets/image/test-mid-car.png'),
                        require('../assets/image/test-mid-car.png'),
                        require('../assets/image/test-mid-car.png'),
                        require('../assets/image/test-mid-car.png')
                    ]
                },{
                    carType: 'Private',
                    carSize: 'small',
                    model: 'Kia Rio',
                    year: '2019',
                    vehicleImages: [
                        require('../assets/image/test-kia-logo.png'),
                        require('../assets/image/test-kia-logo.png'),
                        require('../assets/image/test-kia-logo.png'),
                        require('../assets/image/test-kia-logo.png')
                    ]
                }
            ],

            // vehicle card height
            vehicleCardSize: [],
        };
    }
		componentDidMount() {
			this.setState({ user: this.props.user });

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

    getCardSize = (x, y, width, height, index) => {
        var vehicleCardSize = this.state.vehicleCardSize,
            vehicleDataImageLength = this.state.vehicleData[index].vehicleImages.length,
            vehicleCardSizePush = {
                height: height,
                width: width,
                active: [true].concat(vehicleDataImageLength - 1 > 0 ? Array(vehicleDataImageLength - 1).fill(false) : [])
            };

        vehicleCardSize[index] = vehicleCardSizePush;
        this.setState({ vehicleCardSize: vehicleCardSize });
    }

    _currentActiveVehicleImage = (index) => (slideIndex) => {
        var vehicleCardSize = this.state.vehicleCardSize;
        vehicleCardSize[index].active = Array(vehicleCardSize[index].active).fill(false);
        vehicleCardSize[index].active[slideIndex] = true;
        this.setState({ vehicleCardSize: vehicleCardSize });
    }

    _renderVehicleImage = (idx) => ({ item }) => (
        <Image
            style={{
                width: this.state.vehicleCardSize[idx].width,
                height: this.state.vehicleCardSize[idx].height,
                borderBottomLeftRadius: 15,
                borderTopLeftRadius: 15,
            }}
            source={{ uri: `${URL.SERVER_MEDIA}/${item.url}` }}
        />
    );

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
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 5
                        }}
                    >
                        <TouchableOpacity
                            onPress={e => this.props.navigation.navigate('ProfileInfo')}
                        >
                            <Text
                                style={styles.homePageViewAll}
                            >
                                View Profile Info
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* earnings */}
                    <View
                        style={{
                            marginVertical: 20,
                            marginHorizontal: theme.PAGE_PADDING_HORIZONTAL
                        }}
                    >
                        <Card>
                            <CardBody
                                header={true}
                                footer={true}
                            >
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}
                                >
                                    <LabelText>Earnings</LabelText>

                                    <TouchableOpacity>
                                        <Text
                                            style={styles.homePageViewAll}
                                        >
                                            Edit Bank Details
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                <View
                                    style={{
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    <View
                                        style={{
                                            marginTop: 15
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: theme.COLOR_NORMAL_FONT,
                                                fontSize: this.state.width / 8,
                                                fontFamily: 'Montserrat-Bold'
                                            }}
                                        >
                                            P10,000
                                        </Text>
                                    </View>

                                    <View
                                        style={{
                                            marginTop: 15,
                                            marginBottom: 5
                                        }}
                                    >
                                        <ButtonBlue
                                            label="Withdraw"
                                        />
                                    </View>
                                </View>
                            </CardBody>
                        </Card>
                    </View>

                    {/* history */}
                    <View
                        style={{
                            marginVertical: 20,
                            marginHorizontal: theme.PAGE_PADDING_HORIZONTAL
                        }}
                    >
                        {/* labels */}
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            <LabelText color="white">History</LabelText>

                            <TouchableOpacity>
                                <Text
                                    style={styles.homePageViewAll}
                                >
                                    Filter
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* content */}
                        <View
                            style={{
                                marginTop: 10
                            }}
                        >
                            <Card>
                                <CardBody
                                    divider={true}
                                    header={true}
                                >
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <View
                                            style={{
                                                flex: 1
                                            }}
                                        >
                                            <LabelText>Placements</LabelText>
                                        </View>

                                        <View
                                            style={{
                                                width: this.state.width / 4.5,
                                                justifyContent: 'flex-end',
                                                alignItems: 'flex-end'
                                            }}
                                        >
                                            <LabelText>Date</LabelText>
                                        </View>

                                        <View
                                            style={{
                                                width: this.state.width / 4,
                                                justifyContent: 'flex-end',
                                                alignItems: 'flex-end',
                                            }}
                                        >
                                            <LabelText>Earnings</LabelText>
                                        </View>
                                    </View>
                                </CardBody>

                                <CardBody
                                    footer={true}
                                >
                                    {this.state.historyData.map((hd, hdIdx) =>
                                        <View
                                            key={hdIdx}
                                            style={[
                                                {
                                                    flexDirection: 'row',
                                                    alignItems: 'center'
                                                },
                                                (
                                                    hdIdx == 0
                                                    ? { marginBottom: 5 }
                                                    : (
                                                        hdIdx == (this.state.historyData.length - 1)
                                                        ? { marginTop: 5 }
                                                        : { marginVertical: 5 }
                                                    )
                                                )
                                            ]}
                                        >
                                            <View
                                                style={{
                                                    flex: 1
                                                }}
                                            >
                                                <CommonText>{hd.campaign}</CommonText>
                                            </View>

                                            <View
                                                style={{
                                                    width: this.state.width / 4.5,
                                                    justifyContent: 'flex-end',
                                                    alignItems: 'flex-end'
                                                }}
                                            >
                                                <CommonText>{hd.date}</CommonText>
                                            </View>

                                            <View
                                                style={{
                                                    width: this.state.width / 4,
                                                    justifyContent: 'flex-end',
                                                    alignItems: 'flex-end',
                                                }}
                                            >
                                                <CommonText>P{hd.earnings}</CommonText>
                                            </View>
                                        </View>
                                    )}
                                </CardBody>
                            </Card>
                        </View>
                    </View>

                    {/* vehicles */}
                    <View
                        style={{
                            marginTop: 20,
                            marginBottom: 40,
                            marginHorizontal: theme.PAGE_PADDING_HORIZONTAL
                        }}
                    >
                        {/* labels */}
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: 3
                            }}
                        >
                            <LabelText color="white">Listed Vehicles</LabelText>

                            <View
                                style={{
                                    flexDirection: 'row'
                                }}
                            >
                                <TouchableOpacity
                                    onPress={e => this.props.navigation.navigate('Addvehicle')}
                                >
                                    <Text
                                        style={[
                                            styles.homePageViewAll,
                                            { paddingRight: 5 }
                                        ]}
                                    >
                                        Add Vehicle
                                    </Text>
                                </TouchableOpacity>

                                <Text
                                    style={styles.homePageViewAll}
                                >
                                    |
                                </Text>

                                <TouchableOpacity>
                                    <Text
                                        style={[
                                            styles.homePageViewAll,
                                            { paddingLeft: 5 }
                                        ]}
                                    >
                                        Filter
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* content */}
                        {this.props.user.vehicles.map((vehicle, index) =>
                            <View
                                key={index}
                                style={{
                                    marginVertical: 7
                                }}
                            >
                                <Card
                                    justifyContent={true}
                                >
                                    <CardColumnContent
                                        firstChild={true}
                                        backgroundColor={vehicle.photo.length !== 0 ? theme.COLOR_GRAY_HEAVY + '00' : theme.COLOR_GRAY_HEAVY}
                                        getCardSize={this.getCardSize}
                                        cardIndex={index}
                                    >
                                        <View
                                            style={{
                                                flexDirection: 'row'
                                            }}
                                        >
                                            {
                                                this.state.vehicleCardSize[index]
                                                ? (
                                                    vehicle.photo.length !== 0
                                                    ? <View>
                                                        <Carousel
                                                            data={vehicle.photo}
                                                            renderItem={this._renderVehicleImage(index)}
                                                            layout={'default'}
                                                            inactiveSlideScale={1}
                                                            inactiveSlideOpacity={1}
                                                            sliderWidth={this.state.vehicleCardSize[index].width}
                                                            itemHeight={this.state.vehicleCardSize[index].height}
                                                            itemWidth={this.state.vehicleCardSize[index].width}
                                                            onBeforeSnapToItem={this._currentActiveVehicleImage(index)}
                                                        />

                                                        {/* carousel */}
                                                        <View
                                                            style={{
                                                                justifyContent: 'center',
                                                                alignItems: 'center'
                                                            }}
                                                        >
                                                            <View
                                                                style={{
                                                                    position: 'absolute',
                                                                    top: -20
                                                                }}
                                                            >
                                                                <View
                                                                    style={{
                                                                        flexDirection: 'row',
                                                                    }}
                                                                >
                                                                    {vehicle.photo.map((vi, viIdx) =>
                                                                        <View
                                                                            key={viIdx}
                                                                            style={{
                                                                                backgroundColor: this.state.vehicleCardSize[index].active[viIdx] ? theme.COLOR_BLUE : theme.COLOR_WHITE,
                                                                                elevation: 5,
                                                                                height: 10,
                                                                                width: 10,
                                                                                borderRadius: 5,
                                                                                marginHorizontal: 3.5
                                                                            }}
                                                                        ></View>
                                                                    )}
                                                                </View>
                                                            </View>
                                                        </View>
                                                    </View>
                                                    : <Image
                                                        style={{
                                                            width: this.state.width / 5,
                                                            height: this.state.width / 5,
                                                        }}
                                                        resizeMode='contain'
                                                        source={require('../assets/image/icons/gallery-icon.png')}
                                                    />
                                                )
                                                : <Image
                                                    style={{
                                                        width: this.state.width / 5,
                                                        height: this.state.width / 5,
                                                    }}
                                                    resizeMode='contain'
                                                    source={require('../assets/image/icons/gallery-icon.png')}
                                                />
                                            }

                                        </View>
                                    </CardColumnContent>

                                    <CardColumnContent
                                        lastChild={true}
                                        carType={vehicle.type}
                                        carSize={vehicle.vehicle[0].classification}
                                    >
                                        <CardColumnContentBody>
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'flex-start',
                                                    alignItems: 'center'
                                                }}
                                            >
                                                <View style={{width: 50}}>
                                                    <Text
                                                        style={{
                                                            fontSize: 12,
                                                            fontFamily: 'Montserrat-Regular',
                                                            color: theme.COLOR_NORMAL_FONT
                                                        }}
                                                    >
                                                        Model
                                                    </Text>
                                                </View>

                                                <View style={{flex: 1}}>
                                                    <Text
                                                        style={{
                                                            fontSize: 12,
                                                            fontFamily: 'Montserrat-Bold',
                                                            color: theme.COLOR_NORMAL_FONT,
                                                        }}
                                                    >
                                                        {vehicle.vehicle[0].model}
                                                    </Text>
                                                </View>
                                            </View>

                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'flex-start',
                                                    alignItems: 'center',
                                                    marginTop: 5
                                                }}
                                            >
                                                <View style={{width: 50}}>
                                                    <Text
                                                        style={{
                                                            fontSize: 12,
                                                            fontFamily: 'Montserrat-Regular',
                                                            color: theme.COLOR_NORMAL_FONT
                                                        }}
                                                    >
                                                        Year
                                                    </Text>
                                                </View>

                                                <View style={{flex: 1}}>
                                                    <Text
                                                        style={{
                                                            fontSize: 12,
                                                            fontFamily: 'Montserrat-Bold',
                                                            color: theme.COLOR_NORMAL_FONT,
                                                        }}
                                                    >
                                                        {vehicle.vehicle[0].year}
                                                    </Text>
                                                </View>
                                            </View>
                                        </CardColumnContentBody>
                                    </CardColumnContent>
                                </Card>
                            </View>
                        )}
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
            </Page>
		);
    }
}

const mapStateToProps = (state) => ({
	user: state.userReducer.user
});

export default connect(mapStateToProps)(ProfilePage);
