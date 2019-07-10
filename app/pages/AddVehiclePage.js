import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Dimensions,
    ImageBackground,
    TouchableOpacity,
    Animated,
    TextInput,
    FlatList,
    Text,
    Image
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

import ModalMenu from '../components/Modal/Navigation';
import { HeaderNav, UserInfo } from '../components/HeaderNav';
import {
    LabelText,
    Common,
    Label,
} from '../components/Text';

import theme from '../styles/theme.style';
import styles from '../styles/page.Home.style';
import { Card, CardBody } from '../components/Card';

export default class MessengerPage extends Component {
    state = {
        modalFadeBackground: new Animated.Value(0),
        modalContainerzIndex: 0,
        modalXValue: new Animated.Value(Dimensions.get('window').width),
        scrollEnable: true,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,

        userData: {
            name: 'Patrick Cua',
            rate: 4.60239,
            totalRate: 35, //total number of clients(rating)
            userType: 'user'
        },

        activeTypeVehicle: 0,
        carPhotosDescription: 'Add the best photos of your said Vehicle.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
        vehicles: [
            {
                url: require('../assets/image/icons/add_icon.png'),
            },{ // remove this sample images
                url: require('../assets/image/sample_add_vehicle1.png'),
            },{
                url: require('../assets/image/sample_add_vehicle2.png'),
            } // up to here sample images
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

    addVehicleButtonOnPress = () => {
        ImagePicker.launchImageLibrary({
            // options
        }, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri },
                    { vehicles } = this.state;
            
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
            
                vehicles.splice(1, 0, {
                    url: source
                });

                this.setState({vehicles});
            }
        });
    }

    renderVehicles = ({item, index}) => {
        return (
            <View
                style={{
                    height: this.state.width / 3.5,
                    width: this.state.width / 3.5,
                    marginLeft: index == 0 ? 0 : 3,
                    marginRight: index == (this.state.vehicles - 1) ? 0 : 3
                }}
            >
                {index == 0 ? (
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: theme.COLOR_LIGHT_BLUE + '90',
                            borderRadius: 10,
                        }}
                        activeOpacity={0.8}
                        onPress={this.addVehicleButtonOnPress}
                    >
                        <Image
                            style={{
                                width: '33%',
                                height: '33%'
                            }}
                            resizeMode="contain"
                            source={item.url}
                        />
                    </TouchableOpacity>
                ) : (
                    <Image
                        style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: 10,
                            backgroundColor: theme.COLOR_BLUE,
                            borderRadius: 10,
                        }}
                        resizeMode="cover"
                        source={item.url}
                    />
                )}
            </View>
        );
    }

    render() {
        return (
            <View
                style={{
                    flex: 1
                }}
            >
                <ImageBackground
                    style={styles.homePageBackgroundImage}
                    resizeMode="stretch"
                    source={require('../assets/image/common_page_background.png')}
                ></ImageBackground>

                <HeaderNav
                    menuButtonOnPress={this.menuButtonOnPress}
                    navigation={this.props.navigation}
                />
                
                <View
                    style={{
                        flex: 1,
                    }}
                >
                    <ScrollView
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
                            style={{
                                margin: 20,
                            }}
                        >
                            <View
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginBottom: 20,
                                }}
                            >
                                <LabelText color="white">Add Vehicle</LabelText>
                            </View>

                            <View>
                                {/* car details */}
                                <View
                                    style={{
                                        marginVertical: 7
                                    }}
                                >
                                    <Card>
                                        <CardBody
                                            header={true}
                                            footer={true}
                                        >
                                            <View
                                                style={{
                                                    paddingHorizontal: 10
                                                }}
                                            >
                                                <Label
                                                    label="Car Details"
                                                />

                                                <View
                                                    style={{
                                                        marginVertical: 15
                                                    }}
                                                >
                                                    {/* car model */}
                                                    <View
                                                        style={{
                                                            marginVertical: 12
                                                        }}
                                                    >
                                                        <TextInput
                                                            placeholder="Car Model"
                                                            placeholderTextColor={theme.NEW_COLOR.COLOR_GRAY}
                                                            style={{
                                                                fontFamily: 'Montserrat-Medium',
                                                                fontSize: theme.FONT_SIZE_SMALL,
                                                                color: theme.NEW_COLOR.COLOR_BLACK,
                                                                paddingHorizontal: 0,
                                                                borderBottomColor: theme.COLOR_LIGHT_BLUE,
                                                                borderBottomWidth: 2,
                                                                paddingVertical: 5
                                                            }}
                                                        />
                                                    </View>

                                                    {/* car year */}
                                                    <View
                                                    style={{
                                                        marginVertical: 12
                                                    }}
                                                >
                                                    <TextInput
                                                        placeholder="Car Year"
                                                        placeholderTextColor={theme.NEW_COLOR.COLOR_GRAY}
                                                        style={{
                                                            fontFamily: 'Montserrat-Medium',
                                                            fontSize: theme.FONT_SIZE_SMALL,
                                                            color: theme.NEW_COLOR.COLOR_BLACK,
                                                            paddingHorizontal: 0,
                                                            borderBottomColor: theme.COLOR_LIGHT_BLUE,
                                                            borderBottomWidth: 2,
                                                            paddingVertical: 5
                                                        }}
                                                    />
                                                </View>
                                                </View>

                                                {/* type of vehicle */}
                                                <View
                                                    style={{
                                                        marginVertical: 12
                                                    }}
                                                >
                                                    <Common
                                                        label="Type of Vehicle"
                                                    />

                                                    <View
                                                        style={{
                                                            paddingTop: 15,
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                        }}
                                                    >
                                                        <View
                                                            style={{
                                                                marginRight: 40,
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                            }}
                                                        >
                                                            <TouchableOpacity
                                                                activeOpacity={0.8}
                                                                style={{
                                                                    height: 26,
                                                                    width: 26,
                                                                    marginRight: 10,
                                                                    borderRadius: 13,
                                                                    borderWidth: 4,
                                                                    borderColor: theme.COLOR_GRAY_MEDIUM,
                                                                    backgroundColor: this.state.activeTypeVehicle == 0 ? theme.COLOR_BLUE : theme.COLOR_GRAY_MEDIUM
                                                                }}
                                                                onPress={(e) => this.setState({activeTypeVehicle: 0})}
                                                            ></TouchableOpacity>

                                                            <Common
                                                                label="Private"
                                                            />
                                                        </View>
                                                        
                                                        <View
                                                            style={{
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                            }}
                                                        >
                                                            <TouchableOpacity
                                                                activeOpacity={0.8}
                                                                style={{
                                                                    height: 26,
                                                                    width: 26,
                                                                    marginRight: 10,
                                                                    borderRadius: 13,
                                                                    borderWidth: 4,
                                                                    borderColor: theme.COLOR_GRAY_MEDIUM,
                                                                    backgroundColor: this.state.activeTypeVehicle == 1 ? theme.COLOR_BLUE : theme.COLOR_GRAY_MEDIUM
                                                                }}
                                                                onPress={(e) => this.setState({activeTypeVehicle: 1})}
                                                            ></TouchableOpacity>

                                                            <Common
                                                                label="Public/TNVs"
                                                            />
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </CardBody>
                                    </Card>
                                </View>
                                
                                {/* car photos */}
                                <View
                                    style={{
                                        marginVertical: 7
                                    }}
                                >
                                    <View
                                        style={{
                                            backgroundColor: theme.COLOR_WHITE,
                                            borderRadius: 15,
                                            paddingVertical: 15
                                        }}
                                    >
                                        <View
                                            style={{
                                                paddingHorizontal: 30
                                            }}
                                        >
                                            {/* label */}
                                            <Label
                                                label="Car Photos"
                                            />

                                            {/* description */}
                                            <View
                                                style={{
                                                    marginTop: 10
                                                }}
                                            >
                                                <Common
                                                    nonActive={true}
                                                    label={this.state.carPhotosDescription}
                                                />
                                            </View>
                                        </View>
                                        
                                        {/* images */}
                                        <View
                                            style={{
                                                marginVertical: 30
                                            }}
                                        >
                                            <FlatList
                                                data={this.state.vehicles}
                                                renderItem={this.renderVehicles}
                                                keyExtractor={(item, index) => index.toString()}
                                                horizontal={true}
                                                overScrollMode="never"
                                                showsHorizontalScrollIndicator={false}
                                                contentContainerStyle={{
                                                    paddingHorizontal: 30
                                                }}
                                            />
                                        </View>
                                    </View>
                                </View>

                                <View
                                    style={{
                                        marginTop: 10,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <TouchableOpacity
                                        style={{
                                            backgroundColor: theme.COLOR_LIGHT_BLUE,
                                            borderRadius: 15,
                                            paddingHorizontal: 25,
                                            alignItems: 'center'
                                        }}
                                        onPress={e => alert('Add Car')}
                                    >
                                        <Text
                                            style={{
                                                textAlign: 'center',
                                                color: theme.COLOR_WHITE,
                                                fontFamily: 'Montserrat-Medium',
                                                fontSize: 12,
                                                paddingVertical: 13,
                                            }}
                                        >
                                            Add Car
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
                    
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
