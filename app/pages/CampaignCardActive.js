import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    View,
    Text,
    ScrollView,
    Dimensions,
} from 'react-native';
import { Page } from '../pages/Page';

import UserInfo from '../components/UserInfo';
import { LabelText, CommonText } from '../components/Text';
import ButtonBlue from '../components/ButtonBlue';

import theme from '../styles/theme.style';
import styles from '../styles/page.Home.style';
import MapCard from '../components/MapCard';
import NavigationService from '../services/navigation';

class CampaignCardActive extends Component {

    constructor(props) {
      super(props);

      this.state = {
          height: Dimensions.get('window').height,
          width: Dimensions.get('window').width,
          campaign: {},
      };
    }

    render() {
        return (
            <Page>
                <ScrollView
                    style={styles.homePageScrollView}
                    overScrollMode='never'
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={this.state.scrollEnable}
                >

                    <UserInfo />

                    <View
                        style={{
                            padding: theme.PAGE_PADDING_HORIZONTAL,
                            paddingTop: 30
                        }}
                    >
                        <View
                            style={{
                                borderRadius: theme.PAGE_CARD_RADIUS,
                                backgroundColor: theme.COLOR_WHITE
                            }}
                        >
                            {/* map portion */}
                            <View
                                style={{
                                    height: this.state.width - 50,
                                    width: '100%',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                              <MapCard location_id={this.props.campaign.campaignDetails.location_id} />
                            </View>

                            {/* header information */}
                            <View
                                style={{
                                    backgroundColor: theme.COLOR_DIRTY_WHITE,
                                    paddingVertical: 15,
                                    paddingHorizontal: 30
                                }}
                            >
                                <CommonText
                                    color="blue"
                                >
                                    Active
                                </CommonText>

                                <LabelText>
                                    {this.props.campaign.campaignDetails.name}
                                </LabelText>

                                <CommonText>
                                    {this.props.campaign.client.business_name}
                                </CommonText>
                            </View>

                            <View
                                style={{
                                    paddingVertical: 15,
                                    marginHorizontal: 30,
                                    borderBottomColor: theme.COLOR_GRAY_LIGHT,
                                    borderBottomWidth: 2
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: theme.FONT_SIZE_SMALL,
                                        fontFamily: 'Montserrat-Regular',
                                        color: theme.COLOR_NORMAL_FONT,
                                        lineHeight: 18,
                                        paddingBottom: 5
                                    }}
                                >
                                    {this.props.campaign.campaignDetails.description}
                                </Text>
                            </View>

                            <View
                                style={{
                                    paddingVertical: 15,
                                    paddingHorizontal: 30,
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        paddingBottom: 5
                                    }}
                                >
                                    <View
                                        style={{
                                            flex: 1,
                                            justifyContent: 'flex-start',
                                            alignItems: 'flex-start'
                                        }}
                                    >
                                        <LabelText
                                            large={true}
                                        >
                                            {0}km
                                        </LabelText>

                                        <CommonText>
                                            km travelled counter
                                        </CommonText>
                                    </View>

                                    <View
                                        style={{
                                            flex: 1,
                                            justifyContent: 'flex-end',
                                            alignItems: 'flex-end'
                                        }}
                                    >
                                        <LabelText
                                            large={true}
                                        >
                                            {this.props.campaign.campaignDetails.location}
                                        </LabelText>

                                        <CommonText>
                                            Frequent Location
                                        </CommonText>
                                    </View>
                                </View>
                            </View>

                            <View
                                style={{
                                    backgroundColor: theme.COLOR_GRAY_HEAVY,
                                    paddingVertical: 15,
                                    paddingHorizontal: 30,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    borderBottomLeftRadius: theme.PAGE_CARD_RADIUS,
                                    borderBottomRightRadius: theme.PAGE_CARD_RADIUS,
                                }}
                            >
                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-start'
                                    }}
                                >
                                    <LabelText
                                        color="white"
                                    >
                                        P{this.props.campaign.campaignDetails.pay_basic}
                                    </LabelText>

                                    <CommonText
                                        color="white"
                                    >
                                        Basic Pay
                                    </CommonText>
                                </View>

                                <View
                                    style={{
                                        flex: 1,
                                        justifyContent: 'flex-end',
                                        alignItems: 'flex-end'
                                    }}
                                >
                                    <ButtonBlue
                                        label="Start Trip"
                                        onPress={() => { NavigationService.navigate('StartCampaign'); } }
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>

            </Page>
        );
    }
}

const mapStateToProps = (state) => ({
  campaign: state.campaignReducer.mylist_selected
});

export default connect(mapStateToProps)(CampaignCardActive);
