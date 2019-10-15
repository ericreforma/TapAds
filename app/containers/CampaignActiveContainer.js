import { connect } from 'react-redux';
import { CampaignCardActive } from '../components/CampaignCard';
import { CampaignAction } from '../redux/actions/campaign.action';

const mapStatetoProps = (state) => ({
  myList: state.campaignReducer.mylist
});

const mapDispatchToProps = (dispatch) => ({
  campaignSelected: (id) => dispatch(CampaignAction.mylistSelected(id)),
  dispatchTrip: () => dispatch(CampaignAction.startTrip())
});

export default connect(mapStatetoProps, mapDispatchToProps)(CampaignCardActive);