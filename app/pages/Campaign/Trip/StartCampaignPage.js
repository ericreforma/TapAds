import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  BackHandler,
  Platform,
  Animated
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import KeepAwake from 'react-native-keep-awake';
import Modal from 'react-native-modal';
import { connect } from 'react-redux';
import MapView, {
  Marker,
  Polygon,
  Polyline,
  PROVIDER_GOOGLE,
  AnimatedRegion
} from 'react-native-maps';

import { MapController } from '../../../controllers';
import { CampaignController } from '../../../controllers';
import { CampaignAction } from '../../../redux/actions/campaign.action';
import { timeConverter } from '../../../utils';
import style from '../../../styles/page.StartCampaign.style';
import mapStyle from '../../../styles/map.style';
import { LabelText, CommonText } from '../../../components/Text';
import Page from './../../Page';
import { totalKmDistance, getHeadingTwoPoints } from '../../../config/functions';
import CampaignSummaryModal from './Modal/CampaignSummaryModal';
import {
  Container,
  CampaignRow,
  BottomPanel,
  RowContentWrapper,
  LeftColumnWrapper,
  RightColumnWrapper,
  CampaignRowWithPadding,
  CampaignRowContent,
  ContentRow,
  RedCircle,
  GreenCricle,
  TimeContentWrapper,
  ButtonWrapper,
  LabelButton,
  SavingModalWrapper,
  LabelSaving,
  CampaignLabelWrapper,
  MinMaxWrapper,
  MinMaxIcon,
  LoaderWrapper,
  LoaderContainer
} from './StartCampaignStyledComponents';
import { IMAGES } from '../../../config/variables';
import theme from '../../../styles/theme.style';

const animationDuration = 2000;

class StartCampaignPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campaign: this.props.campaign,
      map: MapController.getPoints(this.props.campaign_location),
      mapView: null,
      myPosition: {
        coords: {
          latitude: 14.6307252,
          longitude: 121.0436033
        },
        animatedCoords: new AnimatedRegion({
          latitude: 14.6307252,
          longitude: 121.0436033,
          latitudeDelta: 0.02,
          longitudeDelta: 0.01
        }),
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
      markerImage: require('../../../assets/image/car_blue_marker.png'),
      unsentLocations: [],
      initLoading: true,
      animatedHeight: new Animated.Value(1000),
      cardHeight: 1000,
      imageRotate: 90
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

    KeepAwake.activate();
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  handleBackPress = () => {
    console.log('Back button press');
    return true;
  }

  watchPosition() {
    const watchId = Geolocation.watchPosition(position => {
      position.coords.heading = getHeadingTwoPoints(this.state.myPosition, position);
      const newPosition = Object.assign({}, this.state.myPosition, {
        coords: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        },
        heading: position.coords.heading,
        timestamp: position.timestamp,
        speed: position.coords.speed
      });
      
      this.setState({
        prevPosition: this.state.myPosition,
        myPosition: newPosition
      });

      this.goAnimate(this.state.myPosition.coords);
      this.zoomToMe(this.state.myPosition.coords);
      this.checkIfWithinLocation(position);
    }, error => {
      console.log(error);
    }, {
      enableHighAccuracy: true,
      fastestInterval: 3000,
      interval: 5000,
      distanceFilter: 100
    });

    this.setState({ watchId });
  }
  
  goAnimate = newCoordinate => {
    if(Platform.OS === 'android') {
      if(this.marker) {
        this.marker._component
        .animateMarkerToCoordinate(
          newCoordinate,
          animationDuration
        );
      }
    } else {
      this.state.coordinate.timing({
        newCoordinate,
        animationDuration
      }).start();
    }
  }

  async onMapReady() {
    Geolocation.getCurrentPosition(
      async (position) => {
        position.coords.heading = getHeadingTwoPoints(this.state.myPosition, position);
        const newPosition = Object.assign({}, this.state.myPosition, {
          coords: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          },
          heading: position.coords.heading,
          timestamp: position.timestamp,
          speed: position.coords.speed
        });

        this.setState({
          myPosition: newPosition,
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
        this.setState({ startAddress: startAddress.formattedAddress });
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

    this.mapView.animateToRegion(c, animationDuration);
  }

  checkIfWithinLocation(position) {
    if(MapController.isInsidePolygon(this.state.polygons, this.state.myPosition.coords)) {
      // inside campaign
      this.setState({
        prevCounted: this.state.counted,
        counted: 1,
        polygonFill: 'rgba(255, 17, 44, 0)'
      });
    } else {
      // outside Campaign
      this.setState({
        prevCounted: this.state.counted,
        counted: 0,
        polygonFill: 'rgba(255, 17, 44, 0.4)'
      });
    }

    const distance = MapController.getDistanceBetween(
      this.state.prevPosition.coords,
      this.state.myPosition.coords
    );

    if(this.state.counted && this.state.prevCounted) {
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

  mapContent = () => {
    return (
      <View style={[mapStyle.container, style.mapContainer]}>
        <MapView
          style={mapStyle.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={this.state.map.region}
          ref={ref => this.mapView = ref}
          onMapReady={() => this.onMapReady()}>
          {this.state.map.coordinates.map(polygon =>
            polygon.map((coord, key) =>
              <Polygon
                key={key}
                coordinates={coord}
                fillColor={this.state.polygonFill}
                strokeColor="rgba(255, 17, 44, 0.4)" />
            )
          )}

          <Polyline
            coordinates={this.state.locationData}
            strokeColor="rgba(38, 96, 255, 0.8)"
            strokeWidth={6}
            lineCap="round" />

          <Marker.Animated
            image={this.state.markerImage}
            ref={ref => this.marker = ref}
            coordinate={this.state.myPosition.animatedCoords}
            rotation={this.state.myPosition.heading}
            anchor={{x: 0.5, y: 0.5}} />
        </MapView>

      </View>
    )
  }

  savingModal = () => {
    return (
      <Modal isVisible={this.state.savingModalVisible}>
        <SavingModalWrapper>
          <ActivityIndicator size="large" color="#005B96" />
          <LabelSaving>Saving</LabelSaving>
        </SavingModalWrapper>
      </Modal>
    )
  }

  summaryModal = () => {
    const totalDistance = parseFloat(totalKmDistance(this.state.campaign.campaignDetails));
    const traveledDistance = parseFloat((this.state.totalCampaignTraveled).toFixed(2)); 
    const campaignDistance = [
      {
        textAlign: 'left',
        label: 'Required',
        value: `${parseInt(totalDistance)}km`
      }, {
        textAlign: 'center',
        label: 'Traveled',
        value: `${traveledDistance}km`
      }, {
        textAlign: 'right',
        label: 'Remaining',
        value: `${parseInt(totalDistance - traveledDistance)}km`
      }
    ];
    const campaignContent = [
      {
        left: 'Time Started',
        right: timeConverter(this.state.startTime)
      }, {
        left: 'Time Ended',
        right: timeConverter(this.state.endTime)
      }, {
        left: 'Total Trip Duration',
        right: `${this.state.spanTime}min`
      }
    ];

    return (
      <CampaignSummaryModal
        isVisible={this.state.summaryModalVisible}
        campaignDistance={campaignDistance}
        campaignContent={campaignContent}
      />
    );
  }

  bottomPanelOnLayout = ({nativeEvent}) => {
    const {height} = nativeEvent.layout;

    if(this.state.initLoading)
      Animated.timing(this.state.animatedHeight, {
        toValue: height,
        duration: 500
      }).start(() => {
        this.setState({
          cardHeight: height,
          initLoading: false
        });
      });
  }

  minMaxViewOnPress = () => {
    Animated.timing(this.state.animatedHeight, {
      toValue: this.state.animatedHeight._value ? 0 : this.state.cardHeight,
      duration: 500
    }).start(() => {
      this.setState({ imageRotate: this.state.animatedHeight._value ? 90 : 270 });
    });
  }

  render() {
    return (
      <Page nonPage>
        <LoaderContainer
          visible={this.state.initLoading}>
          <LoaderWrapper>
            <ActivityIndicator
              size="large"
              color={theme.COLOR_GRAY_HEAVY} />
          </LoaderWrapper>
        </LoaderContainer>

        <Container>
          {this.summaryModal()}
          {this.savingModal()}
          {this.mapContent()}

          <BottomPanel>
            <CampaignRow active={this.state.counted}>
              <CampaignLabelWrapper>
                <LabelText
                  color={this.state.counted ? "black" : "white"}
                  numberOfLines={1}>
                  {this.state.campaign.campaignDetails.name}
                </LabelText>

                <CommonText
                  color={this.state.counted ? "black" : "white"}
                  numberOfLines={1}>
                  {this.state.campaign.client.business_name}
                </CommonText>
              </CampaignLabelWrapper>

              <MinMaxWrapper
                onPress={this.minMaxViewOnPress}>
                <MinMaxIcon
                  style={{
                    transform: [{ rotate: `${this.state.imageRotate}deg` }]
                  }}
                  source={IMAGES.ICONS.caret_right} />
              </MinMaxWrapper>
            </CampaignRow>

            <Animated.View
              style={{
                height: this.state.animatedHeight
              }}>
              <View onLayout={this.bottomPanelOnLayout}>
                <CampaignRowWithPadding>
                  <CampaignRowContent>
                    <RowContentWrapper>
                      <LeftColumnWrapper>
                        <CommonText>Counting</CommonText>
                      </LeftColumnWrapper>

                      <RightColumnWrapper>
                        <ContentRow>
                          <RedCircle active={this.state.counted} />
                          <GreenCricle active={this.state.counted} />
                        </ContentRow>
                      </RightColumnWrapper>
                    </RowContentWrapper>
                    
                    <RowContentWrapper>
                      <LeftColumnWrapper>
                        <CommonText>Campaign Distance</CommonText>
                      </LeftColumnWrapper>

                      <RightColumnWrapper>
                        <LabelText large>
                          {((this.state.totalCampaignTraveled)).toFixed(2)}km
                        </LabelText>
                      </RightColumnWrapper>
                    </RowContentWrapper>
                    
                    <RowContentWrapper>
                      <LeftColumnWrapper>
                        <CommonText>Total Distance</CommonText>
                      </LeftColumnWrapper>

                      <RightColumnWrapper>
                        <LabelText>
                          {((this.state.totalCarTraveled)).toFixed(2)}km
                        </LabelText>
                      </RightColumnWrapper>
                    </RowContentWrapper>
                  </CampaignRowContent>

                  <TimeContentWrapper>
                    <RowContentWrapper>
                      <LeftColumnWrapper>
                        <CommonText xsmall>Time Started</CommonText>
                      </LeftColumnWrapper>

                      <RightColumnWrapper>
                        <CommonText xsmall>
                          {this.state.startTimeText}
                        </CommonText>
                      </RightColumnWrapper>
                    </RowContentWrapper>

                    <RowContentWrapper>
                      <LeftColumnWrapper>
                        <CommonText xsmall>Duration</CommonText>
                      </LeftColumnWrapper>

                      <RightColumnWrapper>
                        <CommonText xsmall>
                          {this.state.spanTime}min
                        </CommonText>
                      </RightColumnWrapper>
                    </RowContentWrapper>
                  </TimeContentWrapper>
                </CampaignRowWithPadding>

                <ButtonWrapper onPress={() => this.save()}>
                  <LabelButton>
                    End
                  </LabelButton>
                </ButtonWrapper>
              </View>
            </Animated.View>
          </BottomPanel>
        </Container>
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