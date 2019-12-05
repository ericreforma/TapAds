import React, { Component } from 'react';
import { connect } from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import {
	View,
	Text,
  RefreshControl,
	ScrollView,
	TouchableOpacity,
	Dimensions,
	ActivityIndicator
} from 'react-native';
import { NavigationEvents } from 'react-navigation';

import styles from '../../styles/page.Home.style';
import theme from '../../styles/theme.style';
import UserInfo from '../../components/UserInfo';
import CampaignListContainer from '../../containers/CampaignListContainer';
import CampaignRecContainer from '../../containers/CampaignRecContainer';
import CampaignActiveContainer from '../../containers/CampaignActiveContainer';
import { VEHICLE } from '../../config/variables';
import { VehicleCategoryCard } from '../../components/VehicleCategoryCard';
import { LabelText } from '../../components/Text';

import { CampaignAction } from '../../redux/actions/campaign.action';
import PageLayout from '../../components/PageLayout';
import NavigationService from '../../services/navigation';

import { HomePageRowContainer } from './HomePageRowContainer';
import ActiveCampaignContainer from './ActiveCampaignContainer';
import RecommendedCampaignContainer from './RecommendedCampaignContainer';
import CategoriesCampaignContainer from './CategoriesCampaignContainer';

class HomePage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			width: Dimensions.get('window').width,
			categoryData: Object.values(VEHICLE.CLASS),
			vehicleCategoryIndex: 0,
			categoryStartDrag: false,
			refreshing: false,
			campaignRec: false,
			campaignList: false,
			campaignMyList: false,
		};
	}

	init = () => {
		this.defaultValues();
		this.props.CampaignRecRequest(() => {
			this.setState({ campaignRec: true });
			if(this.state.campaignList && this.state.campaignMyList) {
				this.setState({ refreshing: false });
			}
		});
		this.props.CampaignListRequest(true, () => {
			this.setState({ campaignList: true });
			if(this.state.campaignRec && this.state.campaignMyList) {
				this.setState({ refreshing: false });
			}
		});
		this.props.dispatchMyList(() => {
			this.setState({ campaignMyList: true });
			if(this.state.campaignRec && this.state.campaignList) {
				this.setState({ refreshing: false });
			}
		});
		
		const jumpTo = this.props.navigation.getParam('jumpTo', null);
		if(jumpTo) {
			const { page, args } = jumpTo;
			NavigationService.reset(page, args);
		}
	}

	defaultValues = () => {
		this.setState({
			refreshing: true,
			campaignRec: false,
			campaignList: false,
			campaignMyList: false
		});
	}

	_renderCategoryItem = ({ item }) => (
		<VehicleCategoryCard vehicle={item} />
	);

	_currentCategory = (slideIndex) => {
		this.setState({ vehicleCategoryIndex: slideIndex });
		this.props.CampaignChangeCategory(slideIndex);
		this.setState({ categoryStartDrag: false });
		this.props.CampaignListRequest();
	};

	onScrollBeginDrag = (e) => {
		this.setState({categoryStartDrag: true});
	}

	render() {
		return (
			<PageLayout>
				<NavigationEvents onWillFocus={this.init} />

				<ScrollView
					alwaysBounceVertical={false}
					style={styles.homePageScrollView}
					showsVerticalScrollIndicator={false}
					refreshControl={
						<RefreshControl
							tintColor={theme.COLOR_GRAY_LIGHT}
							refreshing={this.state.refreshing}
							onRefresh={this.init}
						/>
					}
				>
					<UserInfo />

					<View
						style={{
							marginTop: 10,
							marginBottom: 30
						}}
					>
						{/* active campaign row */}
						<HomePageRowContainer
							headerLeftText="Active Campaigns"
							headerRightText="View All"
							headerRightUrl={'MyCampaign'}
							visible={this.props.activeCampaign.length !== 0 ? true : false}
						>
							<ActiveCampaignContainer
								loading={this.state.campaignMyList} />
						</HomePageRowContainer>

						{/* recommended for you row */}
						<HomePageRowContainer
							headerLeftText="Recommended for you"
							headerRightText="View All"
							headerRightUrl={'Recommended'}
						>
							<RecommendedCampaignContainer
								loading={this.state.campaignRec}
								homePageInit={this.init} />
						</HomePageRowContainer>

						{/* categories */}
						<CategoriesCampaignContainer
							homePageInit={this.init}
						/>
					</View>
				</ScrollView>
			</PageLayout>
		);
	}
}
const mapStateToProps = (state) => ({
	current_page: state.campaignReducer.current_page,
	total_page: state.campaignReducer.total_page,
	isRequesting: state.campaignReducer.isRequesting,
	mylist: state.campaignReducer.mylist,
	user: state.campaignReducer.user,
	activeCampaign: state.campaignReducer.activeCampaign
});

const mapDispatchToProps = (dispatch) => ({
  CampaignChangeCategory: (category) => dispatch(CampaignAction.changeCategory(category)),
  CampaignListRequest: (newBatch = false, callback) => dispatch(CampaignAction.list(newBatch, callback)),
  CampaignRecRequest: callback => dispatch(CampaignAction.recommended(callback)),
	dispatchMyList: callback => dispatch(CampaignAction.mylist(callback))
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);