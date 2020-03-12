import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
	TouchableOpacity,
	ActivityIndicator,
	PermissionsAndroid
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { LabelText } from '../../../components/Text';
import { CampaignAction } from '../../../redux/actions/campaign.action';
import {
	checkIfCampaignActive
} from '../../../config/functions';

import PageLayout from '../../../components/PageLayout';
import PageContainer from '../../../components/PageContainer';
import { IfElse, Then, Else } from '../../../components/IfElse';
import {
	MyCampaignContainer,
	MyCampaignHeaderWrapper,
	MyCampaignContentContainer,
	MyCampaignPickerWrapper
} from './MyCampaignStyledComponents';
import { Picker } from '../../../components/App';
import { PendingCampaign } from './Pending';
import { ActiveCampaign } from './Active';

const pickerData = [
	{ label: 'Active Campaign', value: 'active' },
	{ label: 'Pending Campaign', value: 'pending' },
];

const MyCampaignPage = props => {
	const [loader, setLoader] = useState(true);
	const [startTripLoader, setStartTripLoader] = useState([]);
	const [myList, setMyList] = useState([]);
	const [campaigns, setCampaigns] = useState([]);
	const [maxCount, setMaxCount] = useState(4);
	const [displayCampaign, setDisplayCampaign] = useState('active');

	useEffect(() => {
		init();
	}, [props.myList]);

	const init = () => {
		setLoader(true);
		const campaignID = props.navigation.getParam('cid', false);
		var newMyList = props.myList.map(l => l);
		if(campaignID) {
			var index = newMyList.findIndex((e) => {
				return e.id === campaignID;
			});

			if(index !== -1) {
				var campaign = newMyList.splice(index, 1);
				newMyList.unshift(campaign);
			}
		}

		setMaxCount(4);
		setLoader(false);
		setMyList(newMyList);
		setDisplayCampaign('active');
		setCampaignData(newMyList, displayCampaign);
	}

	const setCampaignData = (theCampaignList, dCampaign) => {
		const campaignList = theCampaignList.map(l => l);
		const newCampaigns = campaignList.filter(l => {
			const {duration_from, duration_to} = l.campaignDetails;
			const checkData = {
				dateFrom: duration_from,
				dateTo: duration_to
			};

			if(dCampaign === 'active')
				if(l.request_status === 1 && !l.end && checkIfCampaignActive(checkData))
					return true;

			if(dCampaign === 'pending')
				if(l.request_status === 0 && !l.end)
					return true;

			return false;
		});

		setCampaigns(newCampaigns);
	}

	const changeDisplayCampaign = value => {
		setDisplayCampaign(value);
		setCampaignData(myList, value);
	}

	const seeMoreOnPress = () =>
		setMaxCount(maxCount + 4);
		
	const requestCameraPermission = async(id, location_id) => {
		try {
			const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
				{
					title: 'TapAds',
					message: `TapAds reuires your location`,
					buttonNegative: 'Cancel',
					buttonPositive: 'OK',
				},
			);
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				props.campaignSelected(id, false, () => {
					props.checkCampaignLocation(location_id, () => {
						props.dispatchTrip();
					});
				});
			} else {

			}
		} catch (err) {
			console.warn(err);
		}
	}

	const activeCampaignStartTrip = (id, location_id, index) => () => {
		const newStartTripLoader = startTripLoader;
		newStartTripLoader[index] = !newStartTripLoader[index];
		setStartTripLoader(newStartTripLoader);
		requestCameraPermission(id, location_id);
	}

	const CampaignContent = () => {
		if(displayCampaign === 'active') {
			return <ActiveCampaign campaigns={campaigns} />
		} else if(displayCampaign === 'pending') {
			return <PendingCampaign campaigns={campaigns} />
		}
	}

	return (
		<PageLayout campaignPage>
			<NavigationEvents	onWillFocus={init} />

			<PageContainer
				overScrollMode='never'
				showsVerticalScrollIndicator={false}>
				<MyCampaignContainer>
					<MyCampaignHeaderWrapper>
						<LabelText color="white">
							Campaign Monitoring
						</LabelText>
					</MyCampaignHeaderWrapper>
					
					<IfElse condition={loader}>
						<Then>
							<ActivityIndicator color="#fff" />
						</Then>

						<Else>
							<MyCampaignContentContainer>
								<MyCampaignPickerWrapper>
									<Picker
										defaultValue={displayCampaign}
										onChangeValue={changeDisplayCampaign}
										placeholder="Choose Campaign"
										data={pickerData}
										displayPlaceHolder={false} />
								</MyCampaignPickerWrapper>

								<CampaignContent />
								
								<IfElse condition={campaigns.length >= maxCount}>
									<Then>
										<TouchableOpacity
											style={{
												alignSelf: 'center',
												justifyContent: 'center',
												marginVertical: 7
											}}
											onPress={seeMoreOnPress}>
											<LabelText color="white">Load more</LabelText>
										</TouchableOpacity>
									</Then>
								</IfElse>
							</MyCampaignContentContainer>
						</Else>
					</IfElse>
				</MyCampaignContainer>
			</PageContainer>
		</PageLayout>
	);
}

const mapStateToProps = (state) => ({
	myList: state.campaignReducer.mylist
});

const mapDispatchToProps = (dispatch) => ({
  campaignSelected: (id, navigate = false, callback = false) => dispatch(CampaignAction.mylistSelected(id, navigate, callback)),
	favoriteCampaign: (id) => dispatch(CampaignAction.favorite(id)),
	dispatchTrip: () => dispatch(CampaignAction.startTrip()),
	checkCampaignLocation: (id, callback) => dispatch(CampaignAction.checkCampaignLocation(id, callback))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyCampaignPage);