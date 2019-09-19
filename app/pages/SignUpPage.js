import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    Alert
} from 'react-native';
import { connect } from 'react-redux';

import NavigationService from '../services/navigation';
import theme from '../styles/theme.style';
import DatePicker from 'react-native-datepicker';
import { AuthController } from '../controllers';
import { AuthAction } from '../redux/actions/auth.action';

class SignUpPage extends Component {
    constructor() {
        super();
        this.state = {
            inputData: [
                {
                    placeholder: 'Name',
                    dataName: 'name',
                },{
                    placeholder: 'User Name',
                    dataName: 'username',
                },{
                    placeholder: 'Birthdate',
                    dataName: 'birthdate'
                },{
                    placeholder: 'Location',
                    dataName: 'location'
                },{
                    placeholder: 'Contact Number',
                    dataName: 'contact_number'
                },{
                    placeholder: 'E-mail Address',
                    dataName: 'email'
                },{
                    placeholder: 'Password',
                    dataName: 'password'
                },{
                    placeholder: 'Confirm Password',
                    dataName: 'confirmPassword'
                }
            ],

            // signup input values
						name: '',
            username: '',
            birthdate: '',
            contact_number: '',
            location: '',
            email: '',
            password: '',
            confirmPassword: '',
        };
    }

    inputValueOnChangeText = (dataname) => (value) => {
        this.setState({
            [dataname]: value
        });
    }

    signUpButtonOnSubmit = () => {
        const userData = {};

        this.state.inputData.map(i => {
            userData[i.dataName] = this.state[i.dataName];
        });

        AuthController.register(JSON.stringify(userData))
        .then((e) => {
            this.props.login(userData.email, userData.password);
        })
        .catch((error) => {
            const errArr = error.response.data;
            let msg = '';

            errArr.map((item, i) => {
                msg += errArr[i] + '\n';
            });

            Alert.alert('Error',`Please check the following fields:\n${msg}`);
        });
    }

	render() {
		return (
            <View
                style={{
                    backgroundColor: theme.COLOR_WHITE
                }}
            >
                <ScrollView
                    overScrollMode='never'
                    showsVerticalScrollIndicator={false}
                >
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingVertical: 80
                        }}
                    >
                        <Image
                            source={require('../assets/image/app_logo.png')}
                        />
                    </View>

                    <View
                        style={{
                            paddingHorizontal: Dimensions.get('window').width / 10
                        }}
                    >
                        <Text
                            style={{
                                color: theme.COLOR_BLUE,
                                fontSize: theme.FONT_SIZE_LARGE,
                                fontFamily: 'Montserrat-Bold'
                            }}
                        >
                            Get Started
                        </Text>

                        <View
                            style={{
                                marginVertical: 20
                            }}
                        >
                            {this.state.inputData.map((input, index) =>
                                input.dataName == 'birthdate'
                                ? <DatePicker
                                    key={index}
                                    style={{
                                        width: Dimensions.get('window').width - (Dimensions.get('window').width * 2 / 10),
                                        marginVertical: 10
                                    }}
                                    date={this.state.birthdate}
                                    mode="date"
                                    showIcon={false}
                                    placeholder={input.placeholder}
                                    format="YYYY-MM-DD"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    androidMode="spinner"
                                    customStyles={{
                                        dateInput: {
                                            borderWidth: 0,
                                            borderBottomWidth: 2,
                                            borderBottomColor: theme.COLOR_LIGHT_BLUE,
                                            justifyContent: 'flex-start',
                                            alignItems: 'flex-start',
                                            paddingVertical: 7,
                                            paddingHorizontal: 0,
                                        },
                                        dateText: {
                                            fontFamily: 'Montserrat-Light',
                                            fontSize: 16,
                                            color: theme.COLOR_BLACK
                                        },
                                        placeholderText: {
                                            fontFamily: 'Montserrat-Light',
                                            fontSize: 16,
                                            color: theme.COLOR_NORMAL_FONT + '70'
                                        }
                                    }}
                                    onDateChange={this.inputValueOnChangeText(input.dataName)}
                                />
                                : <View key={index}>
                                    <TextInput
                                        style={[
                                            {
                                                borderBottomWidth: 2,
                                                borderBottomColor: theme.COLOR_LIGHT_BLUE,
                                                fontFamily: 'Montserrat-Light',
                                                fontSize: 16,
                                                paddingVertical: 7,
                                                marginVertical: 10,
                                                paddingHorizontal: 0,
                                                color: theme.COLOR_BLACK
                                            }
                                        ]}
                                        keyboardType={input.dataName == 'contact_number' ? 'number-pad' : 'default'}
                                        secureTextEntry={input.dataName == 'password' || input.dataName == 'confirmPassword' ? true : false}
                                        placeholder={input.placeholder}
                                        placeholderTextColor={theme.COLOR_NORMAL_FONT + '70'}
                                        onChangeText={this.inputValueOnChangeText(input.dataName)}
                                    />
                                </View>
                            )}
                        </View>

                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginVertical: 20
                            }}
                        >
                            <View
                                style={{
                                    marginBottom: 20
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: theme.FONT_SIZE_SMALL,
                                        color: theme.COLOR_NORMAL_FONT,
                                        fontFamily: 'Montserrat-Light'
                                    }}
                                >
                                    By creating an account, you agree to the
                                </Text>

                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <TouchableOpacity
                                        style={{
                                            borderBottomColor: theme.COLOR_NORMAL_FONT + '70',
                                            borderBottomWidth: 1,
                                        }}
                                        onPress={() => alert('terms of use')}
                                    >
                                        <Text
                                            style={{
                                                fontSize: theme.FONT_SIZE_SMALL,
                                                color: theme.COLOR_NORMAL_FONT,
                                                fontFamily: 'Montserrat-Light'
                                            }}
                                        >
                                            Terms of Use
                                        </Text>
                                    </TouchableOpacity>

                                    <Text
                                        style={{
                                            fontSize: theme.FONT_SIZE_SMALL,
                                            color: theme.COLOR_NORMAL_FONT,
                                            fontFamily: 'Montserrat-Light'
                                        }}
                                    > and </Text>

                                    <TouchableOpacity
                                        style={{
                                            borderBottomColor: theme.COLOR_NORMAL_FONT + '70',
                                            borderBottomWidth: 1,
                                        }}
                                        onPress={() => alert('Privacy Policy')}
                                    >
                                        <Text
                                            style={{
                                                fontSize: theme.FONT_SIZE_SMALL,
                                                color: theme.COLOR_NORMAL_FONT,
                                                fontFamily: 'Montserrat-Light'
                                            }}
                                        >
                                            Privacy Policy
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <TouchableOpacity
                                style={{
                                    backgroundColor: theme.COLOR_BLUE,
                                    borderRadius: 15,
                                    paddingHorizontal: 15,
                                    width: Dimensions.get('window').width / 2,
                                    maxWidth: 300,
                                    height: 45,
                                }}
                                onPress={this.signUpButtonOnSubmit}
                            >
                                <Text
                                    style={{
                                        color: theme.COLOR_WHITE,
                                        fontFamily: 'Montserrat-Medium',
                                        fontSize: 16,
                                        paddingVertical: 11,
                                        textAlign: 'center'
                                    }}
                                >
                                    Sign Up
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View
                            style={{
                                marginVertical: 50,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: theme.FONT_SIZE_SMALL,
                                    color: theme.COLOR_NORMAL_FONT,
                                    fontFamily: 'Montserrat-Light'
                                }}
                            >Already a member? </Text>
                            <TouchableOpacity
                                style={{
                                    borderBottomColor: theme.COLOR_NORMAL_FONT + '70',
                                    borderBottomWidth: 1,
                                }}
                                onPress={() => NavigationService.navigate('Login')}
                            >
                                <Text
                                    style={{
                                        fontSize: theme.FONT_SIZE_SMALL,
                                        color: theme.COLOR_NORMAL_FONT,
                                        fontFamily: 'Montserrat-Light'
                                    }}
                                >
                                    Log in
                                </Text>
                            </TouchableOpacity>
                            <Text
                                style={{
                                    fontSize: theme.FONT_SIZE_SMALL,
                                    color: theme.COLOR_NORMAL_FONT,
                                    fontFamily: 'Montserrat-Light'
                                }}
                            > instead.</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
		);
  }
}

const mapDispatchToProps = (dispatch) => ({
	login: (email, password) => dispatch(AuthAction.login(email, password))
});

export default connect(null, mapDispatchToProps)(SignUpPage);
