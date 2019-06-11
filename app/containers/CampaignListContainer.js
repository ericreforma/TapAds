import { connect } from 'react-redux';
import { CampaignCardList } from '../components/CampaignCard';

const mapStatetoProps = (state) => ({
  campaigns: state.campaignReducer.list
});

export default connect(mapStatetoProps)(CampaignCardList);
