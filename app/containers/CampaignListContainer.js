import { connect } from 'react-redux';
import { CampaignCardList } from '../components/CampaignCard';
import { CampaignAction } from '../redux/actions/campaign.action';

const mapStatetoProps = (state) => ({
  campaigns: state.campaignReducer.list
});

const mapDispatchToProps = (dispatch) => ({
  viewDetails: (id) => dispatch(CampaignAction.selected(id))
});

export default connect(mapStatetoProps, mapDispatchToProps)(CampaignCardList);
