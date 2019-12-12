import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { Image } from 'react-native';
import { VEHICLE } from '../config/variables';

class VehicleType extends Component {
	render() {
        const vehicleSource = Object.values(VEHICLE.CLASS).find(v => v.id === this.props.vehicleType);

		return (
            <Image
                style={{
                    width: 40
                }}
                resizeMode="contain"
                // source={vehicleUrl
                //     .filter(vu =>
                //         vu.color == this.props.vehicleColor &&
                //         (vu.vehicle == this.props.vehicleType
                //          || vu.number == this.props.vehicleType)
                //     )[0].url
                // }
                source={vehicleSource.icon[this.props.vehicleColor]}
            />
		);
    }
}

class VehicleCategory extends Component {
    render() {
        var vehicleUrl = [
            { 
                vehicle: 'small',
                url: require('../assets/image/category_car_small.png')
            },{ 
                vehicle: 'mid',
                url: require('../assets/image/category_car_mid.png')
            },{ 
                vehicle: 'large',
                url: require('../assets/image/category_car_large.png')
            },{ 
                vehicle: 'motorcycle',
                url: require('../assets/image/category_motorcycle.png')
            }
        ];

        var source = vehicleUrl.filter((vu, vuIdx) => vu.vehicle == this.props.vehicleType || vuIdx == this.props.vehicleType);
        return (
            <Image
                style={{
                    width: (Dimensions.get('window').width / 3) - 40
                }}
                resizeMode="contain"
                source={source[0].url}
            />
        );
    }
}

export { VehicleType, VehicleCategory };
