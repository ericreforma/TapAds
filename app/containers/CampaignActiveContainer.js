import { connect } from 'react-redux';
import { CampaignCardActive } from '../components/CampaignCard';
import { CampaignAction } from '../redux/actions/campaign.action';

const mapStatetoProps = (state) => ({
  myList: state.campaignReducer.mylist,
  mylistRequesting: state.campaignReducer.mylistRequesting,
  mylistRequestDone: state.campaignReducer.mylistRequestDone
});

const mapDispatchToProps = (dispatch) => ({
  campaignSelected: (id, navigate = false, callback = false) => dispatch(CampaignAction.mylistSelected(id, navigate, callback)),
  dispatchTrip: () => dispatch(CampaignAction.startTrip()),
  checkCampaignLocation: (id, callback) => dispatch(CampaignAction.checkCampaignLocation(id, callback))
});

export default connect(mapStatetoProps, mapDispatchToProps)(CampaignCardActive);