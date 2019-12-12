import React, { useState, useEffect, useRef, Component } from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import Carousel from 'react-native-snap-carousel';
import { connect } from 'react-redux';
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";

import { CampaignAction } from '../../../../redux/actions/campaign.action';
import { URL } from '../../../../config/variables';
import theme from '../../../../styles/theme.style';

const vcWidth = ((theme.SCREEN_WIDTH * 0.85) / 2) - 60;

const CampaignChooseVehicle = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupDesc, setPopupDesc] = useState('');
  const modalVisibleToggle = () => setModalVisible(!modalVisible);

  class ChooseVehicleModal extends Component {
    state = {
      vehicleSelect: false
    }

    ddAlertError = message => this.dropDownAlertRef.alertWithType('error', message, '')

    campaignVehicle = id => {
      this.setState({vehicleSelect: id});
    }

    proceed = (toggleLoader) => {
      if(this.state.vehicleSelect === false) {
        this.ddAlertError('Choose Vehicle for this Campaign');
      } else {
        toggleLoader();
        props.interestedCampaign(
          this.state.vehicleSelect,
          () => {
            modalVisibleToggle();
            setPopupMessage('Campaign request sent!');
            setPopupDesc('You will be notified once the\nrequest status has been updated.\n\nThank you!');
            setPopupVisible(true);
          }, error => {
            toggleLoader();
            if(error.existingCampaign) {
              this.ddAlertError(error.message);
            } else {
              console.log(error.response);
              this.ddAlertError('Server error');
            }
          }
        );
      }
    }

    render() {
      return (
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={modalVisibleToggle}
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
                width: theme.SCREEN_WIDTH * 0.85,
                backgroundColor: theme.COLOR_WHITE,
                borderRadius: theme.PAGE_CARD_RADIUS,
                overflow: 'hidden',
                elevation: 5,
                paddingHorizontal: 20,
                paddingVertical: 15
              }}
            >
              <ChooseVehicleModalHeader />
              <ChooseVehicleModalBody
                {...props}
                campaignVehicle={this.campaignVehicle}
              />
              <ChooseVehicleModalFooter
                {...props}
                proceed={this.proceed}
              />
            </View>
          </View>
          
				  <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />
        </Modal>
      );
    }
  }

  const PopupMessage = () => {
    return (
      <Modal
        visible={popupVisible}
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
                padding: 15,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <CampaignVehicleText.Label text={popupMessage} />
            </View>

            {/* body */}
            <View
              style={{
                padding: 20
              }}
            >
              {popupDesc.split('\n').map((d, dIdx) =>
                <View
                  key={dIdx}
                  style={{
                    alignSelf: 'center'
                  }}
                >
                  <CampaignVehicleText.CommonText text={d} />
                </View>
              )}

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
                  onPress={() => {
                    setPopupVisible(false);
                    props.closeCampaignModal();
                    props.homePageInit();
                  }}
                >
                  <CampaignVehicleText.Button text="Proceed" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  const ChooseVehicleModalHeader = () => {
    return (
      <View
        style={{
          marginBottom: 15,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <CampaignVehicleText.Label text="Choose a Vehicle" />
  
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 0,
          }}
          onPress={modalVisibleToggle}
        >
          <CampaignVehicleText.Common text="X" />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View>
      <TouchableOpacity
        style={{
          backgroundColor: theme.COLOR_BLUE,
          borderRadius: theme.PAGE_CARD_RADIUS,
          alignSelf: 'center',
          padding: 15,
        }}
        onPress={modalVisibleToggle}
      >
        <CampaignVehicleText.Button text="I'm interested" />
      </TouchableOpacity>

      <ChooseVehicleModal />
      <PopupMessage />
    </View>
  );
}

const ChooseVehicleModalBody = props => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(false);

  useEffect(() => {
    if(props.user) {
      const vehicleIDs = props.mylist.filter(list => {
        if(list.request_status !== 2 && list.end === 0)
          return true;
        return false;
      }).map(list => list.user_vehicle_id);

      setVehicles(
        props.user.vehicles.filter(item => {
          const { vehicle_classification, vehicle_type } = props.campaign;
          const { classification } = item.vehicle;
          const checkVIDs = vehicleIDs.indexOf(item.id);
          if(classification === vehicle_classification
            && vehicle_type === item.type
            && checkVIDs === -1)
            return true;
          return false;
        })
      );
    }
  }, [props.user]);

  const VehicleContent = ({item, index}) => {
    const [activeVehiclePhoto, setActiveVehiclePhoto] = useState(0);

    return (
      <View
        style={{
          width: vcWidth,
          margin: 5,
        }}
      >
        <View
          key={index}
          style={{
            width: vcWidth,
            height: vcWidth,
            backgroundColor: theme.COLOR_GRAY_HEAVY,
            borderRadius: 10,
            borderWidth: selectedVehicle === item.id ? 3 : 0,
            borderColor: theme.COLOR_BLUE,
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden'
          }}
          activeOpacity={0.9}
        >
          <Carousel
            vertical={true}
            data={item.photo}
            renderItem={renderVehicleImage}
            layout={'default'}
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
            sliderHeight={vcWidth}
            itemHeight={vcWidth}
            itemWidth={vcWidth}
            onBeforeSnapToItem={sIndex => setActiveVehiclePhoto(sIndex)}
          />

          <View
            style={{
              position: 'absolute',
              right: 10
            }}
          >
            {item.photo.length > 0 ? (
              Array(item.photo.length).fill(false).map((p, pIdx) =>
                <View
                  key={pIdx}
                  style={{
                    backgroundColor: activeVehiclePhoto === pIdx ? theme.COLOR_BLUE : theme.COLOR_WHITE,
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
        </View>
      
        <TouchableOpacity
          style={{
            backgroundColor: theme.COLOR_GRAY_BUTTON,
            borderRadius: theme.PAGE_CARD_RADIUS,
            alignSelf: 'center',
            marginTop: 12,
            paddingVertical: 7,
            paddingHorizontal: 15
          }}
          onPress={() => vehicleOnPress(item.id)}
        >
          <CampaignVehicleText.Button text="select" />
        </TouchableOpacity>
      </View>
    );
  }

  const renderVehicleImage = ({ item }) => {
    return (
      <Image
        style={{
          width: vcWidth,
          height: vcWidth,
        }}
        source={{uri: `${URL.SERVER_MEDIA}/${item.url}`}}
      />
    );
  }
  
  const vehicleOnPress = id => {
    setSelectedVehicle(id);
    props.campaignVehicle(id);
  }

  if(vehicles.length !== 0) {
    return (
      <FlatList
        data={vehicles}
        renderItem={data =>
          <VehicleContent {...data} />
        }
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}
        overScrollMode="never"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: RFPercentage(2) - 8
        }}
      />
    );
  } else {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          margin: 5
        }}
      >
        <CampaignVehicleText.Common text="-- no vehicles available --" />
      </View>
    );
  }
}

const ChooseVehicleModalFooter = props => {
  const [vehicles, setVehicles] = useState([]);
  const [vehicleProceed, setVehicleProceed] = useState(false)

  useEffect(() => {
    if(props.user) {
      const vehicleIDs = props.mylist.filter(list => {
        if(list.request_status !== 2 && list.end === 0)
          return true;
        return false;
      }).map(list => list.user_vehicle_id);

      setVehicles(
        props.user.vehicles.filter(item => {
          const { vehicle_classification, vehicle_type } = props.campaign;
          const { classification } = item.vehicle;
          const checkVIDs = vehicleIDs.indexOf(item.id);
          if(classification === vehicle_classification
            && vehicle_type === item.type
            && checkVIDs === -1)
            return true;
          return false;
        })
      );
    }
  }, [props.user]);
  
  if(vehicles.length !== 0) {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 15
        }}
      >
        {vehicleProceed ? (
          <View
            style={{
              backgroundColor: theme.COLOR_BLUE,
              borderRadius: theme.PAGE_CARD_RADIUS,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 12,
              width: '30%'
            }}
          >
            <ActivityIndicator color="#fff" style={{height: RFValue(12)}} />
          </View>
        ) : (
          <TouchableOpacity
            style={{
              backgroundColor: theme.COLOR_BLUE,
              borderRadius: theme.PAGE_CARD_RADIUS,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 12,
              width: '30%'
            }}
            onPress={() => props.proceed(() => setVehicleProceed(!vehicleProceed))}
          >
            <CampaignVehicleText.Button text="Proceed" />
          </TouchableOpacity>
        )}
      </View>
    );
  } else {
    return null;
  }
}

const CampaignVehicleText = {
  Label: ({text}) => {
    return (
      <Text
        style={{
          fontFamily: 'Montserrat-Bold',
          fontSize: RFValue(15),
          color: theme.COLOR_LIGHT_BLUE,
        }}
      >{text}</Text>
    );
  },
  Common: ({text}) => {
    return (
      <Text
        style={{
          fontFamily: 'Montserrat-Bold',
          fontSize: RFValue(15),
          color: theme.COLOR_GRAY_HEAVY,
        }}
      >{text}</Text>
    );
  },
  Button: ({text}) => {
    return (
      <Text
        style={{
          fontFamily: 'Montserrat-Medium',
          fontSize: RFValue(11),
          color: theme.COLOR_WHITE,
          lineHeight: RFValue(13)
        }}
      >{text}</Text>
    );
  },
  CommonText: ({text}) => {
    return (
      <Text
        style={{
          fontFamily: 'Montserrat-Medium',
          fontSize: RFValue(11),
          color: theme.COLOR_NORMAL_FONT,
          lineHeight: RFValue(13)
        }}
      >{text}</Text>
    );
  }
}

const mapStateToProps = state => ({
  campaign: state.campaignReducer.selected,
	mylist: state.campaignReducer.mylist,
	user: state.userReducer.user,
});

const mapDispatchToProps = (dispatch) => ({
	interestedCampaign: (userVehicleId, successCallback, errorCallback) =>
		dispatch(CampaignAction.interested(userVehicleId, successCallback, errorCallback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CampaignChooseVehicle);