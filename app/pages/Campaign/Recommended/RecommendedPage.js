import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { connect } from 'react-redux';

import NavigationService from '../../../services/navigation';
import { CampaignController } from '../../../controllers/CampaignController';
import { CAMPAIGN } from '../../../redux/actions/types.action';

import {
  LabelText,
} from '../../../components/Text';

import PageLayout from '../../../components/PageLayout';
import PageContainer from '../../../components/PageContainer';
import RecommendedCampaignContainer from './RecommendedCampaignContainer';
import styles from '../Styles/RecPage.style';

class RecommendedPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      maxPage: false,
      loader: false,
      loading: false,
      campaigns: [],
      page: 1
    };
  }

  init = () => {
    this.setState({loading: false});
    const passValue = {
      page: 1,
      campaigns: [],
      maxPage: false
    };
    this.getRecommendedCampaign(passValue);
  }

  viewMore = () => {
    this.toggleLoader();
    const { page,
      campaigns,
      maxPage } = this.state;
    this.getRecommendedCampaign({page, campaigns, maxPage});
  }

  getRecommendedCampaign = ({page, campaigns, maxPage}) => {
    if(!maxPage) {
      CampaignController.recommendedPage(`?page=${page}`)
      .then(res => {
        const result = res.data;
        this.setState({
          maxPage: result.current_page === result.last_page ? true : false,
          campaigns: [...campaigns, ...result.data],
          page: this.state.page + 1,
          loading: true
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
      <PageLayout>
        <NavigationEvents
          onWillFocus={this.init}
        />

        <PageContainer
          style={styles.scrollView}
          overScrollMode='never'
          showsVerticalScrollIndicator={false}
        >
          <RecPageContainer>
            <RecPageTitle text="Recommended for you" />

            <RecommendedCampaignContainer
              homePageInit={this.init}
              campaigns={this.state.campaigns}
              loading={this.state.loading} />

            {this.state.loading ? (
              this.state.loader ? (
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
                      onPress={this.viewMore}
                    >
                      <LabelText color="white">view more</LabelText>
                    </TouchableOpacity>
                  </View>
                ) : null
              )
            ) : null}
          </RecPageContainer>
        </PageContainer>
      </PageLayout>
    );
  }
}

const RecPageContainer = ({children}) => <View style={styles.container}>{children}</View>
const RecPageTitle = ({text}) => {
  return (
    <View style={styles.pageTitle}>
      <LabelText color="white">
        {text}
      </LabelText>
    </View>
  );
}

const mapDispatchToProps = dispatch => ({
  viewDetails: (campaign) => dispatch({ type: CAMPAIGN.SELECTED, campaign })
});

export default connect(null, mapDispatchToProps)(RecommendedPage);
