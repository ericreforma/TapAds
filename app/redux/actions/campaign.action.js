import { CAMPAIGN } from './types.action';
import { CampaignController } from '../../controllers';

export const CampaignAction = {
  list: () => (dispatch, getState) => {
    dispatch({ type: CAMPAIGN.LIST.REQUEST });
    const state = getState();

    CampaignController.home.list(`?cl=${state.campaignReducer.vehicle_classification}&page=${state.campaignReducer.current_page + 1}`)
    .then(response => {
      dispatch({ type: CAMPAIGN.LIST.SUCCESS, data: response.data });
    })
    .catch(error => {
      console.log(error);
      dispatch({ type: CAMPAIGN.LIST.FAILED });
    });
  },
  changeCategory: (classification) => (dispatch) => {
    dispatch({ type: CAMPAIGN.LIST.CHANGE, classification });
  },
  recommended: () => (dispatch) => {
    dispatch({ type: CAMPAIGN.RECOMMENDED.REQUEST });

    CampaignController.home.list('?rec=1')
    .then(response => {
      dispatch({ type: CAMPAIGN.RECOMMENDED.SUCCESS, data: response.data });
    })
    .catch(error => {
      console.log(error);
      dispatch({ type: CAMPAIGN.RECOMMENDED.FAILED });
    });
  }
};
