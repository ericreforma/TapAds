import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import NavigationService from '../services/navigation';
import { connect } from 'react-redux';

import { CampaignController } from '../controllers/CampaignController';
import { CAMPAIGN } from '../redux/actions/types.action';

import {
  LabelText,
} from '../components/Text';

import Page from './Page';
import UserInfo from '../components/UserInfo';
import { CampaignCardList } from '../components/CampaignCard';

class RecommendedPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      maxPage: false,
      loader: false,
      mainLoader: true,
      campaigns: [],
      page: 1
    };
  }

  getRecommendedCampaign = () => {
    this.toggleLoader();
    var { page,
      campaigns,
      maxPage } = this.state;

    if(!maxPage) {
      CampaignController.recommendedPage(`?page=${page}`)
      .then(res => {
        const result = res.data;
        this.setState({
          maxPage: result.current_page === result.last_page ? true : false,
          campaigns: [...campaigns, ...result.data],
          page: this.state.page + 1,
          mainLoader: false
        });
        this.toggleLoader();
      })
      .catch(error => {
        console.log(error);
        this.toggleLoader();
      });
    }
  }

  toggleLoader = () => {
    this.setState({ loader: !this.state.loader });
  }

  viewDetailsButtonPressed = (id) => {
    const { campaigns } = this.state;
    const campaign = campaigns.find(x => x.id === id);
    this.props.viewDetails(campaign);
    NavigationService.navigate('Campaign');
  }

  render() {
    return (
      <Page>
        <NavigationEvents
          onWillFocus={this.getRecommendedCampaign}
        />

        <ScrollView
          style={{
            marginBottom: 60,
          }}
          overScrollMode='never'
          showsVerticalScrollIndicator={false}
        >
          
          <UserInfo />

          <View
            style={{
              margin: 20
            }}
          >
            <View
              style={{
                alignSelf: 'center',
                marginBottom: 20
              }}
            >
              <LabelText color="white">
                Recommended for you
              </LabelText>
            </View>

            {this.state.mainLoader ? (
              <View
                style={{
                  marginVertical: 7
                }}
              >
                 <ActivityIndicator color="#fff" />
              </View>
            ) : (
              <View>
                <View>
                  {CampaignCardList({
                    campaigns: this.state.campaigns,
                    viewDetails: (id) => this.viewDetailsButtonPressed(id)
                  })}
                </View>

                {this.state.loader ? (
                  <View
                    style={{
                      marginVertical: 20,
                    }}
                  >
                    <ActivityIndicator color="#fff" />
                  </View>
                ) : (
                  !this.state.maxPage ? (
                    <View
                      style={{
                        marginVertical: 20,
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          alignSelf: 'center'
                        }}
                        onPress={this.getRecommendedCampaign}
                      >
                        <LabelText color="white">view more</LabelText>
                      </TouchableOpacity>
                    </View>
                  ) : null
                )}
              </View>
            )}
          </View>
        </ScrollView>
      </Page>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  viewDetails: (campaign) => dispatch({ type: CAMPAIGN.SELECTED, campaign })
});

export default connect(null, mapDispatchToProps)(RecommendedPage);
