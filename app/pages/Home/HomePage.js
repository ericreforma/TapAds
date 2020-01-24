import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	View,
  RefreshControl
} from 'react-native';
import { NavigationEvents } from 'react-navigation';

import styles from './Styles/HomePage.style';
import theme from '../../styles/theme.style';

import { CampaignAction } from '../../redux/actions/campaign.action';
import PageLayout from '../../components/PageLayout';
import PageContainer from '../../components/PageContainer';
import NavigationService from '../../services/navigation';

import { HomePageRowContainer } from './HomePageRowContainer';
import ActiveCampaignContainer from './ActiveCampaignContainer';
import RecommendedCampaignContainer from './RecommendedCampaignContainer';
import CategoriesCampaignContainer from './CategoriesCampaignContainer';
import CategoriesSelectionContainer from './CategoriesSelectionContainer';

class HomePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loadingActive: false,
			loadingRecommended: false,
			loadingCategories: false,
			refresh: false
		};
	}

	init = () => {
		this.setState({
			refresh: new Date().getTime(),
			loadingActive: true,
			loadingRecommended: true,
			loadingCategories: true
		});

		const jumpTo = this.props.navigation.getParam('jumpTo', null);
		if(jumpTo) {
			const { page, args } = jumpTo;
			NavigationService.reset(page, args);
		}
	}

	loadingDone = name => {
		this.setState({[name]: false});
	}

	render() {
		const {
			loadingActive,
			loadingRecommended,
			loadingCategories
		} = this.state;
		const refreshing = loadingActive || loadingRecommended || loadingCategories;

		return (
			<PageLayout>
				<NavigationEvents onWillFocus={this.init} />

				<PageContainer
					alwaysBounceVertical={false}
					style={styles.scrollView}
					showsVerticalScrollIndicator={false}
					refreshControl={
						<RefreshControl
							tintColor={theme.COLOR_GRAY_LIGHT}
							refreshing={refreshing}
							onRefresh={this.init}
						/>
					}
				>
					<HomePageContainer>
						{/* active campaign row */}
						<HomePageRowContainer
							headerLeftText="Active Campaigns"
							headerRightText="View All"
							headerRightUrl={'MyCampaign'}
							visible={this.props.activeCampaign.length !== 0 ? true : false}
						>
							<ActiveCampaignContainer
								refresh={this.state.refresh}
								loadingDone={this.loadingDone} />
						</HomePageRowContainer>

						{/* recommended for you row */}
						<HomePageRowContainer
							headerLeftText="Recommended for you"
							headerRightText="View All"
							headerRightUrl={'Recommended'}
						>
							<RecommendedCampaignContainer
								refresh={this.state.refresh}
								homePageInit={this.init}
								loadingDone={this.loadingDone} />
						</HomePageRowContainer>

						{/* selector */}
						<CategoriesSelectionContainer />

						{/* categories */}
						<CategoriesCampaignContainer
							refresh={this.state.refresh}
							homePageInit={this.init}
							loadingDone={this.loadingDone} />
					</HomePageContainer>
				</PageContainer>
			</PageLayout>
		);
	}
}

const HomePageContainer = ({children}) => {
	return (
		<View style={styles.container}>
			{children}
		</View>
	)
}

const mapStateToProps = (state) => ({
	activeCampaign: state.campaignReducer.activeCampaign
});

export default connect(mapStateToProps)(HomePage);