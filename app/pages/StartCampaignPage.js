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
import { CampaignTripSchema, CampaignTripMapSchema } from '../database';
import MapView, { Marker, Polygon, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import { MapController } from '../controllers';
import NavigationService from '../services/navigation';
import { timeConverter } from '../utils';
import style from '../styles/page.StartCampaign.style';
import mapStyle from '../styles/map.style';
import buttonStyle from '../styles/component.ButtonBlue.style';
import theme from '../styles/theme.style';
import { MAP } from '../map';

class StartCampaignPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      campaign: this.props.campaign,
      map: Object.values(MAP)[this.props.campaign.campaignDetails.location_id],
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
      start_location: {
        latitude: 14.6307252,
        longitude: 121.0436033
      },
      end_location: {
        latitude: 14.6307252,
        longitude: 121.0436033
      },
      watchId: null,
      savingModalVisible: false,
      summaryModalVisible: false,
      markerImage: require('../assets/image/car_blue_marker.png')
    };

    console.disableYellowBox = true;
  }

  componentDidMount() {
    // Create CampaignTrip Instance
    const trip_id = CampaignTripSchema

    let polys = [];

    this.state.map.data.coordinates.map((polygon) =>
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

  onMapReady() {
    Geolocation.getCurrentPosition(
      (position) => {
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
          }
        });
      }
    );

    const watchId = Geolocation.watchPosition(
      (position) => {

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

        this.checkIfWithinLocation();
        this.zoomToMe(this.state.myPosition.coords);
      },
      (error) => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        fastestInterval: 50,
        interval: 100,
        distanceFilter: 10
      }
    );

    this.setState({ watchId });
  }

  save() {
    this.setState({
      savingModalVisible: true,
      endTime: new Date().getTime(),
    });

    clearInterval(this.state.timeInterval);
    
    setTimeout(() => {
      Geolocation.clearWatch(this.state.watchId);
      Geolocation.stopObserving();

      const campaignTrip = {
        campaign_id: this.state.campaign.campaignDetails.id,
        campaign_traveled: this.state.totalCampaignTraveled,
        car_traveled: this.state.totalCarTraveled,
        started: this.state.startTime,
        ended: new Date().getTime(),
        started_lat: this.state.start_location.latitude,
        started_lng: this.state.start_location.longitude,
        ended_lat: this.state.end_location.latitude,
        ended_lng: this.state.end_location.longitude,
      };

      MapController.DBInsert(campaignTrip, this.state.campaignTripMap);

      this.setState({
        savingModalVisible: false,
        summaryModalVisible: true
      });
    }, 500);
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

  checkIfWithinLocation() {
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
        totalCampaignTraveled: this.state.totalCampaignTraveled + distance
      });
    }
    this.setState({
      totalCarTraveled: this.state.totalCarTraveled + distance
    });

    const locationDataNew = {
      latitude: this.state.myPosition.coords.latitude,
      longitude: this.state.myPosition.coords.longitude
    };

    const campaignTripMapArr = {
      campaign_id: '',
      campaign_trip_id: '',
      counted: this.state.counted,
      latitude: this.state.myPosition.coords.latitude,
      longitude: this.state.myPosition.coords.longitude,
      distance,
      speed: this.state.myPosition.speed,
      timestamp: this.state.myPosition.timestamp
    };

    CampaignTripMapSchema.insert(
      campaignTripMapArr,
      (error) => {

      });

    let campaignTripMap =
      (this.state.campaignTripMap === undefined || this.state.campaignTripMap.length === 0) ?
      [] : [...this.state.campaignTripMap];

    let locationData =
      (this.state.locationData === undefined || this.state.locationData.length === 0) ?
      [] : [...this.state.locationData];

    campaignTripMap.push(campaignTripMapArr);
    locationData.push(locationDataNew);

    this.setState({
      campaignTripMap,
      locationData
    });
  }

  mapContent = () =>
    <View style={[mapStyle.container, style.mapContainer]}>
      <MapView
        style={mapStyle.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={this.state.map.data.region}
        ref={ref => this.mapView = ref}
        onMapReady={() => this.onMapReady()}
      >
      {this.state.map.data.coordinates.map((polygon, key) =>
        polygon.map(coord =>
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
              {((this.state.totalCampaignTraveled) / 1000).toFixed(2)}km
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
              {((this.state.totalCarTraveled) / 1000).toFixed(2)}km
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
              onPress={() => this.closeTrip()}
            >
              <Text style={[buttonStyle.buttonLabel, style.button]}>
                Exit
              </Text>
            </TouchableOpacity>
          </View>
      </View>
    </Modal>

  closeTrip = () => {
    this.setState({
      summaryModalVisible: false
    });
    NavigationService.navigate('CampaignCardActive');
  }

  render() {
    return (
      <View style={style.container}>
      {this.summaryModal()}
      {this.savingModal()}
      {this.mapContent()}
        <View style={style.bottomPanel}>

          <View style={[style.viewCampaignRow, this.state.styleAlarm]}>

            <Text style={[style.textCampaignRow, this.state.styleAlarm]}>
              {this.state.campaign.campaignDetails.name}
            </Text>
            <Text style={style.textBrandRow}>
              {this.state.campaign.client.business_name}
            </Text>

          </View>

          <View style={style.viewCounterRow}>

            <View style={style.viewColumn}>
              <Text style={style.textCampaignTraveled}>
                {((this.state.totalCampaignTraveled) / 1000).toFixed(2)}km
              </Text>
              <Text style={style.textCarTraveled}>
                {((this.state.totalCarTraveled) / 1000).toFixed(2)}km
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
            </View>

          </View >

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
    );
  }
}

const mapStateToProps = (state) => ({
  campaign: state.campaignReducer.mylist_selected
});

export default connect(mapStateToProps)(StartCampaignPage);
