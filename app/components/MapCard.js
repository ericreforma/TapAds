import React, { Component } from 'react';
import { connect } from 'react-redux';
import MapView, { PROVIDER_GOOGLE, Polygon } from 'react-native-maps';
import { View, ActivityIndicator } from 'react-native';
import mapStyle from '../styles/map.style';
import { MapController } from '../controllers/MapController';

import { CAMPAIGN } from '../redux/actions/types.action';
import { CampaignAction } from '../redux/actions/campaign.action';

class MapCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: [],
    };

    this.props.requestCheckCampaignLocation();
  }

  componentDidMount = () => {
    this.props.checkCampaignLocation(this.props.location_id);
  }
  
  static getDerivedStateFromProps(nextProps, prevState) {
    if(!nextProps.isRequesting) {
      const map = MapController.getPoints(nextProps.campaign_location);
      return {map};
    }
    return null;
  }
  
  
  render() {
    return (
      <View style={mapStyle.container}>
        {this.props.isRequesting ? (
          <View style={mapStyle.loader}>
            <ActivityIndicator />
          </View>
        ) : (
          <MapView
            style={mapStyle.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={this.state.map.region}
            scrollEnabled={false}
            zoomEnabled={false}
          >
            {this.state.map.coordinates.map(polygon =>
              polygon.map((coor, key) =>
                <Polygon
                  key={key}
                  coordinates={coor}
                  fillColor="rgba(255, 17, 44, 0.4)"
                  strokeColor="rgba(255, 17, 44, 0.4)"
                />
              )
            )}
          </MapView>
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  isRequesting: state.campaignReducer.campaign_loc_isRequesting,
  campaign_location: state.campaignReducer.campaign_location
});

const mapDispatchToProps = (dispatch) => ({
  requestCheckCampaignLocation: () => dispatch({ type: CAMPAIGN.LOCATION.REQUEST }),
  checkCampaignLocation: (id) => dispatch(CampaignAction.checkCampaignLocation(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(MapCard);
