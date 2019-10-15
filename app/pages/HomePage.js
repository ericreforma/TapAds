import React, { Component } from 'react';
import { connect } from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	Dimensions,
	ActivityIndicator
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import DropdownAlert from 'react-native-dropdownalert';

import styles from '../styles/page.Home.style';
import theme from '../styles/theme.style';
import UserInfo from '../components/UserInfo';
import CampaignListContainer from '../containers/CampaignListContainer';
import CampaignRecContainer from '../containers/CampaignRecContainer';
import CampaignActiveContainer from '../containers/CampaignActiveContainer';
import { VEHICLE } from '../config/variables';
import { VehicleCategoryCard } from '../components/VehicleCategoryCard';
import { LabelText } from '../components/Text';

import { CampaignAction } from '../redux/actions/campaign.action';
import { CAMPAIGN } from '../redux/actions/types.action';
import Page from './Page';
import NavigationService from '../services/navigation';

class HomePage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			width: Dimensions.get('window').width,
			categoryData: Object.values(VEHICLE.CLASS),
			vehicleCategoryIndex: 0,
			categoryStartDrag: false
		};
	}

	init = () => {
		const alert = this.props.navigation.getParam('alert', null);
		if(alert) {
			this.dropDownHomeAlertRef.alertWithType(
				alert.type,
				alert.message,
				alert.description
			);
		}

		this.props.CampaignRecRequest();
		this.props.CampaignListRequest();
		this.props.dispatchMyList();
	}

	_renderCategoryItem = ({ item }) => (
		<VehicleCategoryCard vehicle={item} />
	);

	_currentCategory = (slideIndex) => {
		console.log(slideIndex);
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
			<Page>
				<NavigationEvents
					onWillFocus={this.init}
					// onDidFocus={() => NavigationService.navigate('MyCampaign')}
				/>

				<ScrollView
					style={styles.homePageScrollView}
					overScrollMode='never'
					showsVerticalScrollIndicator={false}
				>
					<UserInfo />

					<View style={styles.homePageContainer} >
						{/* recommended for you section */}
						<View
							style={[
								styles.homePageRecommendedContainer,
								styles.homePageSectionVerticalMargin
							]}
						>
							{/* labels */}
							<View style={styles.homePageRecommendedLabel}>
								<LabelText color="white">Recommended for you</LabelText>

								<TouchableOpacity
									onPress={() => NavigationService.navigate('Recommended')}
								>
									<Text style={styles.homePageViewAll}>
										View All
									</Text>
								</TouchableOpacity>
							</View>

							{/* content */}
							<View style={styles.homePageContentPadding}>
								<CampaignRecContainer />
							</View>
						</View>

						{/* active campaign */}
						<View style={styles.homePageActiveCampaignContainer}>
							{/* label text */}
							<View style={styles.homePageActiveCampaignLabel}>
								<LabelText color="white">Active Campaigns</LabelText>
								<TouchableOpacity
									onPress={() => NavigationService.navigate('MyCampaign')}
								>
									<Text style={styles.homePageViewAll}>
										View All
									</Text>
								</TouchableOpacity>
							</View>

							{/* content */}
							<View style={styles.homePageContentPadding}>
								<CampaignActiveContainer />
							</View>
						</View>

						{/* categories section */}
						<View style={styles.homePageSectionVerticalMargin}>
							{/* label */}
							<View style={styles.homePageCategoryLabel} >
								<View style={styles.homePageCategoryLabelLine} />

								<View style={styles.homePageCategoryLabelText} >
									<LabelText color="white">Categories</LabelText>
								</View>

								<View style={styles.homePageCategoryLabelLine} />
							</View>

							{/* content */}
							<View style={styles.homePageContainer}>
								<Carousel
									data={this.state.categoryData}
									renderItem={this._renderCategoryItem}
									layout={'default'}
									sliderWidth={this.state.width}
									itemWidth={(this.state.width / 3) + 20}
									loop={true}
									enableSnap={true}
									loopClonesPerSide={10}
									onSnapToItem={this._currentCategory}
									onScrollBeginDrag={this.onScrollBeginDrag}
									lockScrollWhileSnapping={true}
									lockScrollTimeoutDuration={2000}
								/>
							</View>
						</View>

						{/* campaign section */}
						<View style={styles.homePageCampaignContainer}>
							<View style={styles.homePageCampaignLabel}>
								<LabelText color="white">Campaigns</LabelText>
								<LabelText color="white">Latest</LabelText>
							</View>

							{/* content */}
							{this.state.categoryStartDrag ? (
								<ActivityIndicator color="#fff" style={{ height: 75 }} />
							) : (
								<View>
									<CampaignListContainer />
	
									{!this.props.isRequesting ?
										this.props.current_page < this.props.total_page ?
											<View style={styles.homePageAlignCenter} >
												<TouchableOpacity
													onPress={() => { this.props.CampaignListRequest(); }}
													style={{
														marginTop: 20
													}}
												>
													<LabelText color="white">Load more</LabelText>
												</TouchableOpacity>
											</View>
										: false
									: (
										<ActivityIndicator color="#fff" style={{ height: 75 }} />
									)}
								</View>
							)}
						</View>
					</View>
				</ScrollView>
							
				<DropdownAlert ref={ref => this.dropDownHomeAlertRef = ref} />
			</Page>
		);
	}
}
const mapStateToProps = (state) => ({
	current_page: state.campaignReducer.current_page,
	total_page: state.campaignReducer.total_page,
	isRequesting: state.campaignReducer.isRequesting
});

const mapDispatchToProps = (dispatch) => ({
  CampaignChangeCategory: (category) => dispatch(CampaignAction.changeCategory(category)),
  CampaignListRequest: () => dispatch(CampaignAction.list()),
  CampaignRecRequest: () => dispatch(CampaignAction.recommended()),
	dispatchMyList: () => dispatch(CampaignAction.mylist())
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
