import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { connect } from 'react-redux';
import { RFValue } from 'react-native-responsive-fontsize';

import NavigationService from '../../../services/navigation';
import { CampaignController } from '../../../controllers/CampaignController';
import { CAMPAIGN } from '../../../redux/actions/types.action';

import {
  LabelText,
} from '../../../components/Text';

import PageLayout from '../../../components/PageLayout';
import PageContainer from '../../../components/PageContainer';
import Loader from '../../../components/Loader';
import { IfElse, Then } from '../../../components/IfElse';
import RecommendedCampaignContainer from './RecommendedCampaignContainer';
import styles from '../Styles/RecPage.style';
import theme from '../../../styles/theme.style';

const RecText = {
  ViewMore: ({text}) => {
    return (
      <Text
        style={{
          fontFamily: 'Montserrat-Bold',
          fontSize: RFValue(11),
          color: theme.COLOR_WHITE,
          lineHeight: RFValue(13)
        }}
        numberOfLines={1}
      >{text}</Text>
    );
  }
};

const RecPageContainer = ({children}) => <View style={styles.container}>{children}</View>

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
        <NavigationEvents onWillFocus={this.init} />

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

            <IfElse condition={this.state.loading}>
              <Then>
                <Loader
                  loading={!this.state.loader}
                  spinnerStyle={{ marginVertical: 20 }} >
                  <IfElse condition={!this.state.maxPage}>
                    <Then>
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
                          <RecText.ViewMore text="view more" />
                        </TouchableOpacity>
                      </View>
                    </Then>
                  </IfElse>
                </Loader>
              </Then>
            </IfElse>
          </RecPageContainer>
        </PageContainer>
      </PageLayout>
    );
  }
}

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
