import React, { Component } from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  Picker,
  TextInput
} from 'react-native';

import { CommonText, LabelText } from '../../Text';

import theme from '../../../styles/theme.style';

export default class HistoryFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sort: 'date',
      type: 'asc',
      search: '',
      left: new Animated.Value(0),
      animatedBGColor: new Animated.Value(0),
      slideDisabled: false,
      submitLoader: false,
    }
  }

  sortTypeOnClick = () => {
    var { type } = this.state,
      toValueLeft = 0,
      toValueBG = 0;
    if(type === 'asc') {
      type = 'desc';
      toValueLeft = 29;
      toValueBG = 150;
    } else {
      type = 'asc';
    }
    this.setState({
      slideDisabled: true,
      type
    });

    Animated.timing(this.state.animatedBGColor, {
      toValue: toValueBG,
      duration: 300
    }).start(() => this.setState({ slideDisabled: false }));

    Animated.timing(this.state.left, {
      toValue: toValueLeft,
      duration: 300
    }).start(() => this.setState({ slideDisabled: false }));
  }

  searchButtonClicked = () => {
    this.setState({submitLoader: true});
    this.props.search({
      sort: this.state.sort,
      type: this.state.type,
      search: this.state.search
    }, () => {
      this.setState({
        submitLoader: false,
        sort: 'date',
        type: 'asc',
        search: '',
        left: new Animated.Value(0),
        animatedBGColor: new Animated.Value(0),
      });
      this.props.modalToggle();
    });
  }

  render() {
    return (
			<Modal
				animationType="fade"
				transparent={true}
				visible={this.props.modalVisible}
				onRequestClose={this.props.modalToggle}
			>
        <View
          style={{
            flex: 1,
						backgroundColor: theme.COLOR_BLACK + '81',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}
        >
          <View
            style={{
              width: '100%',
              borderRadius: theme.PAGE_CARD_RADIUS,
              backgroundColor: theme.COLOR_DIRTY_WHITE,
              padding: 20
            }}
          >
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <LabelText large>
                History Filter
              </LabelText>
            </View>
            
            <View
              style={{
                paddingVertical: 15
              }}
            >
              {/* search keyword */}
              <View
                style={{
                  marginVertical: 10,
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <View
                  style={{
                    flex: 1
                  }}
                >
                  <LabelText>Keyword</LabelText>
                </View>

                <View
                  style={{
                    flex: 2,
                  }}
                >
                  <TextInput
                    style={[
                      {
                        borderBottomWidth: 2,
                        borderBottomColor: theme.COLOR_LIGHT_BLUE,
                        fontFamily: 'Montserrat-Light',
                        fontSize: 13,
                        paddingVertical: 5,
                        paddingHorizontal: 7,
                        color: theme.COLOR_BLACK
                      }
                    ]}
                    placeholder="Search keyword.."
                    onChangeText={search => this.setState({search})}
                    placeholderTextColor={theme.COLOR_NORMAL_FONT + '50'}
                  />
                </View>
              </View>
              
              {/* sort by */}
              <View
                style={{
                  marginVertical: 10,
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <View
                  style={{
                    flex: 1
                  }}
                >
                  <LabelText>Sort by</LabelText>
                </View>

                <View
                  style={{
                    flex: 2,
                    borderBottomWidth: 2,
                    borderBottomColor: theme.COLOR_LIGHT_BLUE,
                  }}
                >
                  <Picker
                    selectedValue={this.state.sort}
                    style={{
                      height: 30,
                      width: '100%',
                    }}
                    textStyle={{
                      fontFamily: 'Montserrat-Regular',
                      fontSize: theme.FONT_SIZE_SMALL
                    }}
                    onValueChange={sort =>
                      this.setState({sort})
                    }>
                    <Picker.Item label="Placement" value="placement" />
                    <Picker.Item label="Date" value="date" />
                    <Picker.Item label="Earnings" value="earnings" />
                  </Picker>
                </View>
              </View>
              
              {/* sort type */}
              <View
                style={{
                  marginVertical: 10,
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <View
                  style={{
                    flex: 1
                  }}
                >
                  <LabelText>Sort type</LabelText>
                </View>

                <View
                  style={{
                    flex: 2,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <View
                    style={{
                      marginRight: 13,
                      paddingBottom: 3,
                      borderBottomColor: theme.COLOR_LIGHT_BLUE,
                      borderBottomWidth: 3
                    }}
                  >
                    <CommonText>ASC</CommonText>
                  </View>

                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={this.sortTypeOnClick}
                    disabled={this.state.slideDisabled}
                  >
                    <Animated.View
                      style={{
                        backgroundColor: this.state.animatedBGColor.interpolate({
                          inputRange: [0, 150],
                          outputRange: [theme.COLOR_LIGHT_BLUE, theme.COLOR_GRAY_HEAVY]
                        }),
                        borderRadius: 20,
                        width: 60,
                        padding: 3,
                      }}
                    >
                      <Animated.View
                        style={{
                          height: 25,
                          width: 25,
                          borderRadius: 25,
                          backgroundColor: theme.COLOR_WHITE,
                          borderColor: theme.COLOR_GRAY_LIGHT,
                          borderWidth: 1,
                          left: this.state.left
                        }}
                      ></Animated.View>
                    </Animated.View>
                  </TouchableOpacity>
                
                  <View
                    style={{
                      marginLeft: 13,
                      paddingBottom: 3,
                      borderBottomColor: theme.COLOR_GRAY_HEAVY,
                      borderBottomWidth: 3
                    }}
                  >
                    <CommonText>DESC</CommonText>
                  </View>
                </View>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center'
              }}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  paddingHorizontal: 30,
                  paddingVertical: 10,
                  backgroundColor: theme.COLOR_BLUE,
                  borderRadius: 15,
                  alignSelf: 'center',
                }}
                onPress={this.searchButtonClicked}
                disabled={this.state.submitLoader}
              >
                {this.state.submitLoader ? (
                  <ActivityIndicator color="#fff" style={{height: 16}} />
                ) : (
                  <CommonText color="white">Search</CommonText>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  paddingHorizontal: 30,
                  paddingVertical: 10,
                  backgroundColor: theme.COLOR_GRAY_BUTTON,
                  borderRadius: 15,
                  alignSelf: 'center',
                }}
                onPress={this.props.modalToggle}
                disabled={this.state.submitLoader}
              >
                <CommonText color="white">Close</CommonText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
