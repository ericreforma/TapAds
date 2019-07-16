import React, { Component } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE, Polygon } from 'react-native-maps';
import { View } from 'react-native';
import mapStyle from '../styles/map.style';
import { Map } from '../map';

export default class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: Map.MetroManila.cities.QuezonCity
    };
  }

  componentDidMount() {
    console.log(this.state.polygons);
  }

  render() {
    return (
      <View style={mapStyle.container}>
        <MapView
          style={mapStyle.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={this.state.map.data.region}
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

        <Marker
        coordinate={{
          latitude: this.state.map.data.region.latitude,
          longitude: this.state.map.data.region.longitude
        }}
        title={this.state.map.name}
        />
        </MapView>
      </View>
    );
  }
}
