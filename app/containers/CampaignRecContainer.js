import { connect } from 'react-redux';
import { CampaignCardRec } from '../components/CampaignCard';

const mapStatetoProps = (state) => ({
  campaigns: state.campaignReducer.recommended
});

export default connect(mapStatetoProps)(CampaignCardRec);
