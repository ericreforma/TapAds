import { CAMPAIGN } from './types.action';
import { CampaignController } from '../../controllers';
import NavigationService from '../../services/navigation';
import { CampaignSchema } from '../../database';

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
  mylist: () => (dispatch) => {
    CampaignController.mylist()
      .then(response => {
        dispatch({ type: CAMPAIGN.MYLIST.GET, mylist: response.data });
      })
      .catch((e) => {
        console.log('error');
        console.log(e);
      });
  },
  selected: (id) => (dispatch, getState) => {
    NavigationService.navigate('Campaign');

    const state = getState();
    const campaignList = state.campaignReducer.list;
    const campaignRecList = state.campaignReducer.recommended;
    const campaign = campaignList.find(x => x.id === id) === undefined ?
                      campaignRecList.find(x => x.id === id) :
                      campaignList.find(x => x.id === id);

    dispatch({ type: CAMPAIGN.SELECTED, campaign });
  },

  interested: () => (dispatch, getState) => {
    NavigationService.navigate('MyCampaign');

    const state = getState();
    const selectedCampaign = state.campaignReducer.selected;
    const mylist = state.campaignReducer.mylist;

    if (mylist.find(x => x.id === selectedCampaign.id) === undefined) {
      CampaignSchema.insert(selectedCampaign, (e) => {
        console.log(e);
        console.log('Error Saving');
      });

      CampaignController.interested(0, selectedCampaign.id)
      .then(() => {
        console.log('uploaded');
      }).catch((e) => {
        console.log('error');
        console.log(e);
      });

      dispatch({ type: CAMPAIGN.MYLIST.ADD, campaign: selectedCampaign });
    }
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
