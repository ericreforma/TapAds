import React, { Component } from 'react';
import {
  View,
  Image,
  Dimensions,
} from 'react-native';
import {
    Card,
    CardBody,
    CardFooter
} from '../components/Card';
import { LabelText, CommonText } from '../components/Text';
import styles from '../styles/page.Home.style';

export class VehicleCategoryCard extends Component {
    render() {
      return (
        <View>
            <Card>
                <CardBody header>
                    <View style={styles.homePageAlignCenter} >
                      <Image
                          style={{
                              width: (Dimensions.get('window').width / 3) - 40
                          }}
                          resizeMode="contain"
                          source={this.props.vehicle.icon.large}
                      />
                    </View>
                </CardBody>

                <CardFooter active>
                    <View
                        style={styles.homePageAlignCenter}
                    >
                        <LabelText color="white">
                            {this.props.vehicle.name.charAt(0).toUpperCase() + this.props.vehicle.name.slice(1)}
                        </LabelText>

                        <View
                            style={styles.homePageCategoryDescriptionContainer}
                        />

                        <View
                            style={styles.homePageCategoryDescriptionWrapper}
                        >
                            {this.props.vehicle.name === 'mid' ? (
                                this.props.vehicle.description.map((d, dIdx) =>
                                    <View
                                        key={dIdx}
                                        style={{
                                            alignSelf: 'center'
                                        }}
                                    >
                                        <CommonText color="white">{d}</CommonText>
                                    </View>
                                )
                            ) : (
                                <CommonText 
                                    color="white"
                                >
                                    {this.props.vehicle.description}
                                </CommonText>
                            )}
                        </View>
                    </View>
                </CardFooter>
            </Card>
        </View>
      );
    }
}
