import React, { Component } from 'react';
import {
    View,
    Text,
    PermissionsAndroid,
    Alert,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import MapView, { Marker, Polygon, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import { MapController } from '../controllers';
import NavigationService from '../services/navigation';
import { CampaignController } from '../controllers';
import { CampaignAction } from '../redux/actions/campaign.action';
import { timeConverter } from '../utils';
import style from '../styles/page.StartCampaign.style';
import mapStyle from '../styles/map.style';
import buttonStyle from '../styles/component.ButtonBlue.style';
import theme from '../styles/theme.style';
import { LabelText, CommonText } from '../components/Text';
import Page from './Page';

class StartCampaignPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campaign: this.props.campaign,
      // map: Object.values(MAP)[this.props.campaign.campaignDetails.location_id],
      map: MapController.getPoints(this.props.campaign_location),
      mapView: null,
      myPosition: {
        coords: {
          latitude: 14.6307252,
          longitude: 121.0436033
        },
        distance: 0,
      timestamp: null,
        heading: 0,
        speed: 0
      },
      prevPosition: {
        coords: {
          latitude: 14.6307252,
          longitude: 121.0436033
        },
        timestamp: null,
        heading: 0,
        speed: 0
      },
      counted: 0,
      prevCounted: 0,
      polygons: [],
      styleAlarm: {
        backgroundColor: theme.COLOR_GRAY_LIGHT,
        color: theme.COLOR_BLACK
      },
      polygonFill: 'rgba(255, 17, 44, 0.4)',
      campaignTripMap: [],
      locationData: [],
      totalCarTraveled: 0,
      totalCampaignTraveled: 0,
      startTimeText: '',
      startTime: null,
      endTime: null,
      spanTime: '',
      timeInterval: null,
      startAddress: '',
      endAddress: '',
      start_location: {
        latitude: 14.6307252,
        longitude: 121.0436033
      },
      end_location: {
        latitude: 0,
        longitude: 0
      },
      watchId: null,
      savingModalVisible: false,
      summaryModalVisible: false,
      markerImage: require('../assets/image/car_blue_marker.png'),
      unsentLocations: []
    };

    console.disableYellowBox = true;
  }

  componentDidMount() {
    // Create CampaignTrip Instance
    let polys = [];

    this.state.map.coordinates.map((polygon) =>
      polygon.map(coord =>
        polys.push(coord)
      )
    );

    this.setState({
      polygons: polys
    });

    const currenTime = new Date();
    let currentHour =
      (currenTime.getHours() > 12) ?
      currenTime.getHours() - 12 :
      currenTime.getHours();
    currentHour = (currentHour === 0) ? '12' : currentHour;

    const currentMinute = (currenTime.getMinutes() < 10 ? '0' : '') + currenTime.getMinutes();
    const a =
      (currenTime.getHours() > 12) ?
      'pm' :
      'am';

    this.setState({
      startTime: new Date().getTime(),
      startTimeText: `${currentHour}:${currentMinute}${a}`
    });


    const tInterval = setInterval(() => {
      const starttime = this.state.startTime;
      const currenttime = new Date().getTime();

      let diff = (starttime - currenttime) / 1000;
      diff /= 60;

      this.setState({
        spanTime: Math.abs(Math.round(diff))
      });
    }, 1000);

    this.setState({
      timeInterval: tInterval
    });
  }

  watchPosition() {
    const watchId = Geolocation.watchPosition(
      (position) => {
        console.log(position);

        this.setState({
          prevPosition: this.state.myPosition,
          myPosition: {
            coords: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            },
            heading: position.coords.heading,
            timestamp: position.timestamp,
            speed: position.coords.speed
          }
        });

        this.zoomToMe(this.state.myPosition.coords);
        this.checkIfWithinLocation(position);
      },
      (error) => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        fastestInterval: 3000,
        interval: 5000,
        distanceFilter: 100
      }
    );

    this.setState({ watchId });
  }

  async onMapReady() {
    Geolocation.getCurrentPosition(
      async (position) => {

        this.setState({
          myPosition: {
            coords: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            },
            heading: position.coords.heading,
            timestamp: position.timestamp,
            speed: position.coords.speed
          },
          prevPosition: {
            coords: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            },
            heading: position.coords.heading,
            timestamp: position.timestamp,
            speed: position.coords.speed
          },
          start_location: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          },
        });

        const startAddress = await MapController.getAddress(this.state.myPosition.coords);

        this.setState({
          startAddress: startAddress.formattedAddress
        });

        this.watchPosition();
      }
    );


  }

  async save() {
    this.setState({
      savingModalVisible: true,
      endTime: new Date().getTime(),
      end_location: {
        latitude: this.state.myPosition.coords.latitude,
        longitude: this.state.myPosition.coords.longitude
      }
    });

    clearInterval(this.state.timeInterval);

    Geolocation.clearWatch(this.state.watchId);
    Geolocation.stopObserving();

    const endlocation = {
      latitude: this.state.myPosition.coords.latitude,
      longitude: this.state.myPosition.coords.longitude
    };
    const endAddress = await MapController.getAddress(endlocation);

    this.setState({
      endAddress: endAddress.formattedAddress
    });

    const campaignTrip = {
      user_campaign_id: this.props.trip.user_campaign_id,
      trip_id: this.props.trip.id,
      campaign_traveled: this.state.totalCampaignTraveled,
      trip_traveled: this.state.totalCarTraveled,
      location_start_latitude: this.state.start_location.latitude,
      location_start_longitude: this.state.start_location.longitude,
      location_start_address: this.state.startAddress,
      location_end_latitude: this.state.end_location.latitude,
      location_end_longitude: this.state.end_location.longitude,
      location_end_address: this.state.endAddress
    };

    CampaignController.trip_end(campaignTrip)
      .then(response => {

        this.props.dispatchMyList(() => {
          this.props.dispatchUpdateSelected();
        });

      })
      .catch(error => {
        console.log(error);
        console.log(error.message);
        console.log(error.response);
      });

    this.setState({
      savingModalVisible: false,
      summaryModalVisible: true
    });
  }

  zoomToMe(coords) {
    const c = {
      latitude: coords.latitude,
      longitude: coords.longitude,
      latitudeDelta: 0.02,
      longitudeDelta: 0.01
    };

    this.mapView.animateToRegion(c, 0);
  }

  checkIfWithinLocation(position) {

    if (MapController.isInsidePolygon(this.state.polygons, this.state.myPosition.coords)) {
      // inside campaign
      this.setState({
        styleAlarm: {
          backgroundColor: theme.COLOR_GRAY_LIGHT,
          color: theme.COLOR_BLACK
        },
        prevCounted: this.state.counted,
        counted: 1,
        polygonFill: 'rgba(255, 17, 44, 0)'
      });

    } else {
      // outside Campaign
      this.setState({
        styleAlarm: {
          backgroundColor: theme.COLOR_ALARM,
          color: theme.COLOR_WHITE
        },
        prevCounted: this.state.counted,
        counted: 0,
        polygonFill: 'rgba(255, 17, 44, 0.4)'
      });
    }

    const distance = MapController.getDistanceBetween(
              this.state.prevPosition.coords,
              this.state.myPosition.coords);

    if (this.state.counted && this.state.prevCounted) {
      this.setState({
        totalCampaignTraveled: this.state.totalCampaignTraveled + parseFloat(distance)
      });
    }
    this.setState({
      totalCarTraveled: this.state.totalCarTraveled + parseFloat(distance)
    });

    const locationDataNew = {
      latitude: this.state.myPosition.coords.latitude,
      longitude: this.state.myPosition.coords.longitude
    };

    const campaignTripMapArr = {
      user_trip_id: this.props.trip.id,
      campaign_id: this.props.trip.campaign_id,
      user_id: this.props.trip.user_id,
      user_campaign_id: this.props.trip.user_campaign_id,
      client_id: this.state.campaign.client.id,
      counted: this.state.counted,
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      heading: position.coords.heading,
      distance,
      speed: position.coords.speed,
      timestamp: position.timestamp
    };
    console.log(campaignTripMapArr);
    let campaignTripMap =
      (this.state.campaignTripMap === undefined || this.state.campaignTripMap.length === 0) ?
      [] : [...this.state.campaignTripMap];

    let locationData =
      (this.state.locationData === undefined || this.state.locationData.length === 0) ?
      [] : [...this.state.locationData];

    CampaignController.trip_send_location(JSON.stringify(campaignTripMapArr))
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
        console.log(e.message);
        console.log(e.response);

        let unsentLocations =
          (this.state.campaignTripMap === undefined || this.state.campaignTripMap.length === 0) ?
          [] : [...this.state.campaignTripMap];

        unsentLocations.push(campaignTripMapArr);

        this.setState({ unsentLocations });
      });


    campaignTripMap.push(campaignTripMapArr);
    locationData.push(locationDataNew);

    this.setState({
      campaignTripMap,
      locationData,
    });
  }

  mapContent = () =>
    <View style={[mapStyle.container, style.mapContainer]}>
      <MapView
        style={mapStyle.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={this.state.map.region}
        ref={ref => this.mapView = ref}
        onMapReady={() => this.onMapReady()}
      >
      {this.state.map.coordinates.map(polygon =>
        polygon.map((coord, key) =>
          <Polygon
            key={key}
            coordinates={coord}
            fillColor={this.state.polygonFill}
            strokeColor="rgba(255, 17, 44, 0.4)"
          />
        )
      )}

      <Polyline
        coordinates={this.state.locationData}
        strokeColor="rgba(38, 96, 255, 0.8)"
        strokeWidth={6}
        lineCap="round"
      />

      <Marker.Animated
        image={this.state.markerImage}
        ref={ref => this.marker = ref}
        coordinate={this.state.myPosition.coords}
        rotation={this.state.myPosition.heading}
        anchor={{x: 0.5, y: 0.5}}
      />

      </MapView>

    </View>

  savingModal = () =>
    <Modal
      isVisible={this.state.savingModalVisible}
    >
      <View style={style.modalContent}>
        <ActivityIndicator
          size="large"
          color="#005B96"
        />
        <Text>
          Saving
        </Text>
      </View>
    </Modal>

  summaryModal = () =>
    <Modal
      isVisible={this.state.summaryModalVisible}
    >
      <View style={style.modalSummaryContainer}>
        <Text style={style.modalSummaryTitle}>Trip Summary</Text>

        <ScrollView>
          <View style={style.modalSummaryRow}>
            <Text style={style.modalSummaryTextKey}>Campaign</Text>
            <Text style={style.modalSummaryTextValue}>
              {this.state.campaign.campaignDetails.name}
            </Text>
          </View>

          <View style={style.modalSummaryRow}>
            <Text style={style.modalSummaryTextKey}>Brand</Text>
            <Text style={style.modalSummaryTextValue}>
              {this.state.campaign.client.business_name}
            </Text>
          </View>

          <View style={style.modalSummaryRow}>
            <Text style={style.modalSummaryTextKey}>Location</Text>
            <Text style={style.modalSummaryTextValue}>
              {this.state.campaign.campaignDetails.location}
            </Text>
          </View>

          <View style={style.modalSummaryRow}>
            <Text style={style.modalSummaryTextKey}>Required Travel Distance</Text>
            <Text style={style.modalSummaryTextValue}>
              200km
            </Text>
          </View>

          <View style={style.modalSummaryRow}>
            <Text style={style.modalSummaryTextKey}>Total Travel Distance</Text>
            <Text style={style.modalSummaryTextValue}>
              143.75km
            </Text>
          </View>

          <View style={style.modalSummaryRow}>
            <Text style={style.modalSummaryTextKey}>Acquired Travel Distance</Text>
            <Text style={style.modalSummaryTextValue}>
              {(this.state.totalCampaignTraveled).toFixed(2)}km
            </Text>
          </View>

          <View style={style.modalSummaryRow}>
            <Text style={style.modalSummaryTextKey}>Remaining Travel Distance</Text>
            <Text style={style.modalSummaryTextValue}>
              24km
            </Text>
          </View>

          <View style={style.modalSummaryRow}>
            <Text style={style.modalSummaryTextKey}>Distance Traveled</Text>
            <Text style={style.modalSummaryTextValue}>
              {(this.state.totalCarTraveled).toFixed(2)}km
            </Text>
          </View>

          <View style={style.modalSummaryRow}>
            <Text style={style.modalSummaryTextKey}>Time Started</Text>
            <Text style={style.modalSummaryTextValue}>
              {timeConverter(this.state.startTime)}
            </Text>
          </View>

          <View style={style.modalSummaryRow}>
            <Text style={style.modalSummaryTextKey}>Time Ended</Text>
            <Text style={style.modalSummaryTextValue}>
              {timeConverter(this.state.endTime)}
            </Text>
          </View>

          <View style={style.modalSummaryRow}>
            <Text style={style.modalSummaryTextKey}>Total Trip Span</Text>
            <Text style={style.modalSummaryTextValue}>
              {this.state.spanTime}min
            </Text>
          </View>

        </ScrollView>

        <View style={style.viewButtonRow}>
            <TouchableOpacity
              style={[buttonStyle.buttonStyle]}
              onPress={this.closeTrip}
            >
              <Text style={[buttonStyle.buttonLabel, style.button]}>
                Exit
              </Text>
            </TouchableOpacity>
          </View>
      </View>
    </Modal>

  closeTrip = () => {
    this.setState({summaryModalVisible: false});
    NavigationService.back();
  }

  render() {
    return (
      <Page nonPage>
        <View style={style.container}>
          {this.summaryModal()}
          {this.savingModal()}
          {this.mapContent()}

          <View style={style.bottomPanel}>
            <View style={[style.viewCampaignRow, this.state.styleAlarm]}>

              {/* <Text style={[style.textCampaignRow, this.state.styleAlarm]}>
                {this.state.campaign.campaignDetails.name}
              </Text>
              <Text style={style.textBrandRow}>
                {this.state.campaign.client.business_name}
              </Text> */}

              <LabelText color={this.state.counted ? "black" : "white"}>
                {this.state.campaign.campaignDetails.name}
              </LabelText>

              <CommonText color={this.state.counted ? "black" : "white"}>
                {this.state.campaign.client.business_name}
              </CommonText>
            </View>

            <View style={{padding: 14}}>
              <View
                style={{
                  paddingBottom: 7,
                  borderBottomColor: '#a7a7a7',
                  borderBottomWidth: 1
                }}
              >
                {/* campaign area */}
                <RowContent
                  leftColumn={(
                    <CommonText>Counting</CommonText>
                  )}
                  rightColumn={(
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                      }}
                    >
                      {/* red part */}
                      <View
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: 10,
                          marginRight: 4,
                          backgroundColor: this.state.counted ? theme.COLOR_GRAY_MEDIUM : theme.COLOR_RED
                        }}
                      ></View>

                      {/* green part */}
                      <View
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: 10,
                          marginLeft: 4,
                          backgroundColor: this.state.counted ? theme.COLOR_GREEN : theme.COLOR_GRAY_MEDIUM
                        }}
                      ></View>
                    </View>
                  )}
                />

                {/* campaign distance */}
                <RowContent
                  leftColumn={(
                    <CommonText>Campaign Distance</CommonText>
                  )}
                  rightColumn={(
                    <LabelText large>
                      {((this.state.totalCampaignTraveled)).toFixed(2)}km
                    </LabelText>
                  )}
                />

                {/* total distance */}
                <RowContent
                  leftColumn={(
                    <CommonText>Total Distance</CommonText>
                  )}
                  rightColumn={(
                    <LabelText>
                      {((this.state.totalCarTraveled)).toFixed(2)}km
                    </LabelText>
                  )}
                />
              </View>

              <View
                style={{
                  paddingTop: 7
                }}
              >
                {/* time started */}
                <RowContent
                  leftColumn={(
                    <CommonText xsmall>Time Started</CommonText>
                  )}
                  rightColumn={(
                    <CommonText xsmall>
                      {this.state.startTimeText}
                    </CommonText>
                  )}
                />

                {/* duration */}
                <RowContent
                  leftColumn={(
                    <CommonText xsmall>Duration</CommonText>
                  )}
                  rightColumn={(
                    <CommonText xsmall>
                      {this.state.spanTime}min
                    </CommonText>
                  )}
                />
              </View>
            </View >

            {/* <View style={style.viewColumn}>
              <Text style={style.textCampaignTraveled}>
                {((this.state.totalCampaignTraveled)).toFixed(2)}km
              </Text>
              <Text style={style.textCarTraveled}>
                {((this.state.totalCarTraveled)).toFixed(2)}km 
              </Text>
            </View>

            <View style={style.viewColumn}>
              <Text style={style.textLocation}>
                {this.state.map.name}
              </Text>
              <Text style={style.textTime}>
                {this.state.startTimeText}
              </Text>
              <Text style={style.textTime}>
                {this.state.spanTime}min
              </Text>
            </View> */}

            <View style={style.viewButtonRow}>
              <TouchableOpacity
                style={[buttonStyle.buttonStyle]}
                onPress={() => this.save()}
              >
                <Text style={[buttonStyle.buttonLabel, style.button]}>
                  End
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Page>
    );
  }
}

const mapStateToProps = (state) => ({
  campaign: state.campaignReducer.mylist_selected,
  trip: state.campaignReducer.trip,
  campaign_location: state.campaignReducer.campaign_location
});

const mapDispatchToProps = dispatch => ({
  dispatchMyList: (successCallback) => dispatch(CampaignAction.mylist(successCallback)),
  dispatchUpdateSelected: () => dispatch(CampaignAction.updateSelected()),
});

export default connect(mapStateToProps, mapDispatchToProps)(StartCampaignPage);

class RowContent extends Component {
  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
        }}
      >
        <View
          style={{
            flex: 1,
            paddingRight: 10,
            alignItems: 'flex-start'
          }}
        >
          {this.props.leftColumn}
        </View>
        
        <View
          style={{
            flex: 1,
            paddingLeft: 10,
            alignItems: 'flex-end'
          }}
        >
          {this.props.rightColumn}
        </View>
      </View>
    );
  }
}
