import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';
import DropdownAlert from 'react-native-dropdownalert';

import { CampaignAction } from '../redux/actions/campaign.action';
import { UserController } from '../controllers';
import { getDate, getMonthlyVehiclePhoto } from '../config/functions';
import { URL } from '../config/variables';

import Page from './Page';
import UserInfo from '../components/UserInfo';
import {
  LabelText,
  CommonText
} from '../components/Text';
import theme from '../styles/theme.style';
import CameraView from '../components/Modal/Camera';

class MonthlyCarPhotoPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cameraOpen: false,
      loader: true,
      uploading: false,
    };
  }

  init = () => {
    this.setState({
      loader: false
    });
  }

  getImageData = (imageData) => {
    this.setState({uploading: true});
    const file = imageData.base64;
    const uriSplit = imageData.uri.split('/');
    const type = `image/${uriSplit[uriSplit.length - 1].split('.')[1]}`;
    const { mylist_selected } = this.props;
    const clientId = mylist_selected.client.id;
    const campaignId = mylist_selected.campaign_id;
    const form = { file, type, clientId, campaignId };
    UserController.request.update.carMonthlyUpdate(form)
    .then(res => {
      this.successFlashMessage('Photo uploaded successfully!');
      this.props.campaignVehicleMonthlyUpdate(campaignId, res.data);
      this.setState({uploading: false});
    })
    .catch(error => {
      console.log(error);
      console.log(error.response);
      this.failedFlashMessage('Error!', error.message);
    });
  }

  uploadPhoto = () => {
    this.closeCamera();
  }

  closeCamera = () => {
    this.setState({cameraOpen: !this.state.cameraOpen});
  }

	successFlashMessage = (message, description = '') => {
    this.dropDownAlertRef.alertWithType(
      'success',
      message,
      description
    );
	}

	failedFlashMessage = (message, description = '') => {
    this.dropDownAlertRef.alertWithType(
      'error',
      message,
      description
    );
	}

  render() {
    return (
      <Page>
        <NavigationEvents onDidFocus={this.init} />

        <CameraView
          visible={this.state.cameraOpen}
          close={this.closeCamera}
          getImageData={this.getImageData}
        />

        <ScrollView
          style={{
            marginBottom: 60
          }}
          overScrollMode='never'
          showsVerticalScrollIndicator={false}
        >
          <UserInfo />

          <View
            style={{
              marginTop: 20,
              alignSelf: 'center',
              marginHorizontal: 20
            }}
          >
            <LabelText color="white">Campaign Calendar Photo</LabelText>
          </View>

          {this.state.loader ? (
            <View style={{marginTop: 20}}>
              <ActivityIndicator color="#fff" />
            </View>
          ) : (
            <View
              style={{
                paddingTop: 20,
                paddingBottom: 30
              }}
            >
              <View
                style={{
                  backgroundColor: theme.COLOR_WHITE,
                  borderRadius: theme.PAGE_CARD_RADIUS,
                  overflow: 'hidden',
                  marginHorizontal: 20
                }}
              >
                <View
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 15,
                  }}
                >
                  <LabelText
                    color="blue"
                    numberOfLines={1}
                    large
                  >
                    {this.props.mylist_selected.campaignDetails.name}
                  </LabelText>

                  <CommonText numberOfLines={1}>
                    {this.props.mylist_selected.client.business_name}
                  </CommonText>

                  <View
                    style={{
                      marginTop: 15,
                      paddingTop: 10,
                      borderTopColor: '#eeeeee',
                      borderTopWidth: 2
                    }}
                  >
                    <InformationCard
                      info={[
                        {name: 'common', text: 'From'},
                        {name: 'label', text: getDate(this.props.mylist_selected.campaignDetails.duration_from)},
                        {name: 'common', text: 'to'},
                        {name: 'label', text: getDate(this.props.mylist_selected.campaignDetails.duration_to)},
                      ]}
                    />
                  </View>
                </View>
              </View>
              
              <View
                style={{
                  backgroundColor: theme.COLOR_WHITE,
                  height: 3,
                  marginTop: 30,
                  marginBottom: 10
                }}
              ></View>
              
              {getMonthlyVehiclePhoto(this.props.mylist_selected).map((m, mIndex) =>
                <View
                  key={mIndex}
                  style={{
                    backgroundColor: m.deadlineToday ? theme.COLOR_WHITE : theme.COLOR_GRAY_BUTTON,
                    borderRadius: theme.PAGE_CARD_RADIUS,
                    overflow: 'hidden',
                    marginTop: 20,
                    padding: 20,
                    marginHorizontal: 20,
                    elevation: m.deadlineToday ? 5 : 0
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between'
                    }}
                  >
                    <LabelText>{m.monthDuration}</LabelText>
                    {m.deadlineToday ? (
                      <View
                        style={{
                          flexDirection: 'row'
                        }}
                      >
                        {this.state.uploading ? (
                          <View style={{marginRight: 10}}>
                            <ActivityIndicator color={theme.COLOR_BLUE} />
                          </View>
                        ) : null}

                        <TouchableOpacity
                          onPress={this.uploadPhoto}
                          disabled={this.state.uploading}
                        >
                          <LabelText color={theme.COLOR_PINK}>Upload</LabelText>
                        </TouchableOpacity>
                      </View>
                    ) : null}
                  </View>

                  <CommonText color={m.deadlineToday ? "blue" : theme.COLOR_BLUE}>
                    Deadline: {m.deadline}
                  </CommonText>

                  {/* photos */}
                  <View
                    style={{
                      marginTop: 20
                    }}
                  >
                    {m.vehiclePhotos.length == 0 ? (
                      <View
                        style={{
                          alignSelf: 'center'
                        }}
                      >
                        <CommonText>-- no photos uploaded --</CommonText>
                      </View>
                    ) : (
                      <FlatList
                        ref={ref => { this[`refFlatList${mIndex}`] = ref }}
                        data={m.vehiclePhotos}
                        renderItem={renderVehiclePhotos}
                        onContentSizeChange={() => this[`refFlatList${mIndex}`].scrollToIndex({animated: true, index: 0})}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal={true}
                        overScrollMode="never"
                        showsHorizontalScrollIndicator={false}
                      />
                    )}
                  </View>
                </View>
              )}
            </View>
          )}
        </ScrollView>

				<DropdownAlert ref={ref => this.dropDownAlertRef = ref} />
      </Page>
    );
  }
}

const mapStateToProps = (state) => ({
  mylist_selected: state.campaignReducer.mylist_selected
});

const mapDispatchToProps = (dispatch) => ({
  campaignVehicleMonthlyUpdate: (id, photo) => dispatch(CampaignAction.addVehicleMonthlyUpdate(id, photo))
});

export default connect(mapStateToProps, mapDispatchToProps)(MonthlyCarPhotoPage);

const { width } = Dimensions.get('window');
const renderVehiclePhotos = ({item, index}) => 
  <View
    style={{
      height: width / 3.5,
      width: width / 3.5,
      marginLeft: 3,
      marginRight: 3
    }}
  >
    <Image
      style={{
        width: '100%',
        height: '100%',
        borderRadius: 10,
        backgroundColor: theme.COLOR_GRAY_HEAVY,
        borderRadius: 10,
      }}
      resizeMode="cover"
      source={{uri: `${URL.SERVER_MEDIA}/${item.url}`}}
    />
  </View>

class InformationCard extends Component {
	render() {
		return (
			<View
				style={{
					marginVertical: 10,
					paddingVertical: 15,
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: theme.COLOR_WHITE,
					borderRadius: theme.PAGE_CARD_RADIUS,
					elevation: 3
				}}
			>
				{this.props.info.map((i, index) =>
					<View
						key={index}
						style={{
							flexDirection: 'row',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						{i.name === 'common' ? (
							<CommonText>{i.text}</CommonText>
						) : (
							<LabelText>{i.text}</LabelText>
						)}

						{index !== (this.props.info.length - 1) ? (
							<View style={{width: 5}}></View>
						) : null}
					</View>
				)}
			</View>
		);
	}
}