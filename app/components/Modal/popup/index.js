import React, { Component } from 'react';
import {
  Modal,
  View,
  TouchableOpacity
} from 'react-native';

import {
  LabelText,
  CommonText
} from '../../Text';

import theme from '../../../styles/theme.style';

export default class PopupMessage extends Component {
  render() {
    return (
      <Modal
        visible={this.props.isVisible}
        transparent={true}
        animationType="fade"
      >
        <View
          style={{
						backgroundColor: theme.COLOR_BLACK + '81',
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center'
          }}
        >
          <View
            style={{
              width: "80%",
              backgroundColor: theme.COLOR_WHITE,
              borderRadius: theme.PAGE_CARD_RADIUS,
              overflow: 'hidden',
              elevation: 5
            }}
          >
            {/* header */}
            <View
              style={{
                backgroundColor: theme.COLOR_GRAY_HEAVY,
                padding: 20,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <LabelText color="blue" large>
                {this.props.message}
              </LabelText>
            </View>

            {/* body */}
            <View
              style={{
                padding: 20
              }}
            >
              <CommonText>
                {this.props.description}
              </CommonText>

              <View
                style={{
                  marginTop: 20,
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: theme.COLOR_BLUE,
                    borderRadius: 15,
                    paddingVertical: 12,
                    alignItems: 'center'
                  }}
                  onPress={this.props.closeModal}
                >
                  <CommonText color="white">Close</CommonText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}