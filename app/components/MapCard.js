import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE, Polygon } from 'react-native-maps';
import { View } from 'react-native';
import mapStyle from '../styles/map.style';
import { MAP } from '../map';

export default class MapCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: Object.values(MAP)[this.props.location_id]
    };
  }

  render() {
    return (
      <View style={mapStyle.container}>
        <MapView
          style={mapStyle.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={this.state.map.data.region}
          scrollEnabled={false}
          zoomEnabled={false}
        >
        {this.state.map.data.coordinates.map((polygon, key) =>
          polygon.map(coord =>
            <Polygon
              key={key}
              coordinates={coord}
              fillColor="rgba(255, 17, 44, 0.4)"
              strokeColor="rgba(255, 17, 44, 0.4)"
            />
          )
        )}
        </MapView>
      </View>
    );
  }
}
