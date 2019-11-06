import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { Image } from 'react-native';

class VehicleType extends Component {
	render() {
        var vehicleUrl = [
            { 
                vehicle: 'regular',
                number: 0,
                color: 'black',
                url: require('../assets/image/icons/car_small_black_icon.png')
            },{
                vehicle: 'premium',
                number: 1,
                color: 'black',
                url: require('../assets/image/icons/car_large_black_icon.png')
            },{ 
                vehicle: 'motorcycle',
                number: 2,
                color: 'black',
                url: require('../assets/image/icons/motorcycle_black_icon.png')
            },{ 
                vehicle: 'regular',
                number: 0,
                color: 'white',
                url: require('../assets/image/icons/car_small_white_icon.png')
            },{
                vehicle: 'premium',
                number: 1,
                color: 'white',
                url: require('../assets/image/icons/car_large_white_icon.png')
            },{ 
                vehicle: 'motorcycle',
                number: 2,
                color: 'white',
                url: require('../assets/image/icons/motorcycle_white_icon.png')
            }
        ];
        
		return (
            <Image
                style={{
                    width: 40
                }}
                resizeMode="contain"
                source={vehicleUrl
                    .filter(vu =>
                        vu.color == this.props.vehicleColor &&
                        (vu.vehicle == this.props.vehicleType
                         || vu.number == this.props.vehicleType)
                    )[0].url
                }
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
