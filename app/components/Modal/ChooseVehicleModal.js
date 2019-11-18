import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Image
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { URL } from '../../config/variables';
import DropdownAlert from 'react-native-dropdownalert';

import {
  CommonText,
  LabelText
} from '../Text';

import theme from '../../styles/theme.style';

export default class ChooseVehicleModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicles: [],
      activeVehiclePhoto: [],
      selectedVehicle: false,
      loader: false
    };
  }

  componentDidMount = () => {
    const vehicleIDs = this.props.mylist.filter(list => {
      if(list.request_status !== 2 && list.end === 0)
        return true;
      return false;
    }).map(list => list.user_vehicle_id);
    const vehicles = this.props.vehicles.filter(item => {
      if(item.vehicle.classification === this.props.campaign.vehicle_classification && vehicleIDs.indexOf(item.id) === -1)
        return true;
      return false;
    });
    const activeVehiclePhoto = vehicles.map(u => {
      return u.photo.map((p, idx) => {
        if(idx === 0)
          return true;
        return false;
      });
    });

    this.setState({ activeVehiclePhoto, vehicles });
  }

  _renderVehicleImage = ({ item }) =>
    <Image
      style={{
        width: ((Dimensions.get('window').width * 0.85) / 2) - 60,
        height: ((Dimensions.get('window').width * 0.85) / 2) - 60,
      }}
      source={{uri: `${URL.SERVER_MEDIA}/${item.url}`}}
    />

  vehiclePhotoBeforeSnap = (index) => (slideIndex) => {
    const { activeVehiclePhoto } = this.state;
    activeVehiclePhoto[index] = activeVehiclePhoto[index].map((v, vIdx) => {
      if(vIdx === slideIndex)
        return true;
      return false;
    });
    this.setState({activeVehiclePhoto});
  }

  selectedVehicleOnPress = (selectedVehicle) => () => {
    this.setState({selectedVehicle});
  }

  renderVehicles = ({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
        style={{
          width: ((Dimensions.get('window').width * 0.85) / 2) - 60,
          height: ((Dimensions.get('window').width * 0.85) / 2) - 60,
          backgroundColor: theme.COLOR_GRAY_HEAVY,
          borderRadius: 10,
          borderWidth: this.state.selectedVehicle === item.id ? 3 : 0,
          borderColor: theme.COLOR_BLUE,
          margin: 5,
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden'
        }}
        activeOpacity={0.9}
        onPress={() => this.setState({selectedVehicle: item.id})}
      >
        <Carousel
          vertical={true}
          data={item.photo}
          renderItem={this._renderVehicleImage}
          layout={'default'}
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
          sliderHeight={((Dimensions.get('window').width * 0.85) / 2) - 60}
          itemHeight={((Dimensions.get('window').width * 0.85) / 2) - 60}
          itemWidth={((Dimensions.get('window').width * 0.85) / 2) - 60}
          onBeforeSnapToItem={this.vehiclePhotoBeforeSnap(index)}
        />

        <View
          style={{
            position: 'absolute',
            right: 10
          }}
        >
          {this.state.activeVehiclePhoto.length !== 0 ? (
            this.state.activeVehiclePhoto[index].map((p, pIdx) =>
              <View
                key={pIdx}
                style={{
                  backgroundColor: this.state.activeVehiclePhoto[index][pIdx] ? theme.COLOR_BLUE : theme.COLOR_WHITE,
                  elevation: 5,
                  height: 7,
                  width: 7,
                  borderRadius: 5,
                  marginVertical: 2.5
                }}
              ></View>
            )
          ) : null}
        </View>
      </TouchableOpacity>
    );
  }

  proceedButton = () => {
    if(this.state.selectedVehicle === false) {
      this.dropDownAlertRef.alertWithType(
        'error',
        'Choose Vehicle for this Campaign',
        ''
      );
    } else {
      this.setState({loader: true});
      this.props.vehicleSelect(this.state.selectedVehicle, error => {
        this.setState({loader: false});
        if(error.existingCampaign) {
          this.dropDownAlertRef.alertWithType(
            'error',
            error.message,
            ''
          );
        } else {
          console.log(error.message);
          this.dropDownAlertRef.alertWithType(
            'error',
            'Server error',
            ''
          );
        }
      });
    }
  }

  render() {
    return (
      <Modal
        visible={this.props.isVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={this.props.closeModal}
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
              width: Dimensions.get('window').width * 0.85,
              backgroundColor: theme.COLOR_WHITE,
              borderRadius: theme.PAGE_CARD_RADIUS,
              overflow: 'hidden',
              elevation: 5,
              paddingHorizontal: 20,
              paddingVertical: 15
            }}
          >
            <View
              style={{
                marginBottom: 15,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <LabelText color="blue">Choose Vehicle</LabelText>

              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: 0,
                }}
                onPress={this.props.closeModal}
              >
                <LabelText>X</LabelText>
              </TouchableOpacity>
            </View>

            <View
              style={{
                backgroundColor: theme.COLOR_GRAY_MEDIUM,
                paddingVertical: 10,
                borderRadius: 10,
                flexDirection: 'row'
              }}
            >
              {this.state.vehicles.length !== 0 ? (
                <ScrollView
                  horizontal={true}
                  overScrollMode="never"
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                    paddingHorizontal: 10
                  }}
                >
                  {this.state.vehicles.map((item, index) => this.renderVehicles({item, index}))}
                </ScrollView>
              ) : (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    margin: 5
                  }}
                >
                  <CommonText color="white" small>-- no vehicles available --</CommonText>
                </View>
              )}
            </View>

            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 15
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: theme.COLOR_BLUE,
                  borderRadius: theme.PAGE_CARD_RADIUS,
                  paddingVertical: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40%'
                }}
                onPress={this.proceedButton}
              >
                {this.state.loader ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <CommonText color="white">Proceed</CommonText>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>

				<DropdownAlert ref={ref => this.dropDownAlertRef = ref} />
      </Modal>
    );
  }
}