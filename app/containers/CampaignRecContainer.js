import { connect } from 'react-redux';
import { CampaignCardRec } from '../components/CampaignCard';
import { CampaignAction } from '../redux/actions/campaign.action';

const mapStatetoProps = (state) => ({
  campaigns: state.campaignReducer.recommended
});

const mapDispatchToProps = (dispatch) => ({
  viewDetails: (id) => dispatch(CampaignAction.selected(id))
});

export default connect(mapStatetoProps, mapDispatchToProps)(CampaignCardRec);