import React, { Component } from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Picker,
  TextInput
} from 'react-native';

import { CommonText, LabelText } from '../../Text';

import theme from '../../../styles/theme.style';

export default class VehicleFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sort: '',
      search: '',
      submitLoader: false,
    }
  }

  searchButtonClicked = () => {
    this.setState({submitLoader: true});
    this.props.search({
      sort: this.state.sort,
      search: this.state.search
    }, () => {
      this.setState({
        submitLoader: false,
        sort: '',
        search: '',
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
                Vehicle Filter
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
                    <Picker.Item label="Model" value="model" />
                    <Picker.Item label="Type" value="type" />
                    <Picker.Item label="Classification" value="class" />
                  </Picker>
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
