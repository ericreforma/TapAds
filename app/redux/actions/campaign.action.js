import { CAMPAIGN } from './types.action';
import { CampaignController, CampaignLocationController } from '../../controllers';
import NavigationService from '../../services/navigation';
import { CampaignSchema } from '../../database';

export const CampaignAction = {
  list: (successCallBack = false) => (dispatch, getState) => {
    dispatch({ type: CAMPAIGN.LIST.REQUEST });
    const state = getState();
    CampaignController.home.list(
        `?cl=${state.campaignReducer.vehicle_classification}&page=${state.campaignReducer.current_page + 1}`)
      .then(response => {
        dispatch({ type: CAMPAIGN.LIST.SUCCESS, data: response.data });
        if(successCallBack) {
          successCallBack();
        }
      })
      .catch(error => {
        console.log(error);
        console.log(error.response);
        dispatch({ type: CAMPAIGN.LIST.FAILED });
      });
  },

  mylist: (successCallBack = null) => dispatch => {
    CampaignController.mylist()
      .then(response => {
        dispatch({ type: CAMPAIGN.MYLIST.GET, mylist: response.data });
        if (successCallBack !== null) {
          successCallBack();
        }
      })
      .catch(e => {
        console.log('error');
        console.log(e);
      });
  },

  selected: id => (dispatch, getState) => {
    NavigationService.navigate('Campaign');

    const state = getState();
    const campaignList = state.campaignReducer.list;
    const campaignRecList = state.campaignReducer.recommended;
    const campaign =
      campaignList.find(x => x.id === id) === undefined
        ? campaignRecList.find(x => x.id === id)
        : campaignList.find(x => x.id === id);

    dispatch({ type: CAMPAIGN.SELECTED, campaign });
  },

  mylistSelected: (id, navigate, callback = false) => (dispatch, getState) => {
    const state = getState();
    const campaignList = state.campaignReducer.mylist;
    const campaign = campaignList.find(x => x.id === id);

    dispatch({ type: CAMPAIGN.MYLIST.SELECTED, campaign });

    if(callback) {
      callback();
    } else {
      NavigationService.navigate(navigate ? navigate : 'CampaignCardActive');
    }
  },

  updateSelected: () => (dispatch, getState) => {
    const state = getState();
    const user_campaign_id = state.campaignReducer.mylist_selected.id;
    const campaignList = state.campaignReducer.mylist;
    const campaign = campaignList.find(x => x.id === user_campaign_id);

    dispatch({ type: CAMPAIGN.MYLIST.SELECTED, campaign: campaign });
  },

  interested: () => (dispatch, getState) => {
    // NavigationService.navigate('MyCampaign');

    const state = getState();
    const selectedCampaign = state.campaignReducer.selected;
    const mylist = state.campaignReducer.mylist;

    if (mylist.find(x => x.id === selectedCampaign.id) === undefined) {
      CampaignSchema.insert(selectedCampaign, e => {
        console.log(e);
        console.log('Error Saving');
      });

      CampaignController.interested(0, selectedCampaign.id)
        .then(() => {
          // CampaignController.mylist()
          //   .then(response => {
          //     dispatch({ type: CAMPAIGN.MYLIST.GET, mylist: response.data });
          //     NavigationService.navigate('MyCampaign');
          //   })
          //   .catch(e => {
          //     console.log('error');
          //     console.log(e);
          //   });
        })
        .catch(e => {
          console.log('error');
          console.log(e);
        });
    }
  },

  changeCategory: classification => dispatch => {
    dispatch({ type: CAMPAIGN.LIST.CHANGE, classification });
  },

  recommended: (successCallBack = false) => dispatch => {
    dispatch({ type: CAMPAIGN.RECOMMENDED.REQUEST });
    CampaignController.home.list('?rec=1')
      .then(response => {
        dispatch({ type: CAMPAIGN.RECOMMENDED.SUCCESS, data: response.data });
        if(successCallBack) {
          successCallBack();
        }
      })
      .catch(error => {
        console.log(error);
        console.log(error.response);
        alert('Network Error');
        dispatch({ type: CAMPAIGN.RECOMMENDED.FAILED });
      });
  },

  startTrip: () => (dispatch, getState) => {
    const state = getState();
    const campaign = state.campaignReducer.mylist_selected;

    CampaignController.trip_create(campaign.campaign_id, campaign.id)
      .then(response => {
        dispatch({ type: CAMPAIGN.TRIP.START, trip: response.data.trip });
        NavigationService.navigate('StartCampaign');
      })
      .catch(e => {
        console.log('Error');
        console.log(e);
        console.log(e.response);
        alert('Network Error');
      });
  },

  favorite: cid => dispatch => {
    CampaignController.favorite(cid)
    .then(response => {
      dispatch({ type: CAMPAIGN.FAVORITE.SUCCESS, mylist: response.data });
    })
    .catch(error => {
        console.log(error);
        dispatch({ type: CAMPAIGN.FAVORITE.FAILED });
    });
  },

  checkCampaignLocation: (id, successCallBack = false) => dispatch => {
    CampaignLocationController.getLocation(id, locations => {
      dispatch({ type: CAMPAIGN.LOCATION.SUCCESS, campaign_location: locations });

      if(successCallBack) {
        successCallBack();
      }
    }, error => {
      console.log(error);
      dispatch({ type: CAMPAIGN.LOCATION.FAILED });
    });
  },

  addVehicleMonthlyUpdate: (id, photo) => (dispatch, getState) => {
    const state = getState();
    const campaignList = state.campaignReducer.mylist;
    const campaign = campaignList.find(x => x.campaign_id === id);

    const objectKeys = Object.keys(campaign);
    const newCampaign = {};
    for(const k of objectKeys) {
      var objValue = campaign[k];
      if(k === 'vehicleMonthlyUpdate') {
        objValue.unshift(photo);
      }
      newCampaign[k] = objValue;
    }
    
    const newCampaignSelected = [];
    for(const c of campaignList) {
      if(c.campaign_id === id) {
        newCampaignSelected.push(newCampaign);
      } else {
        newCampaignSelected.push(c);
      }
    }

    dispatch({
      type: CAMPAIGN.VEHICLE_MONTHLY_UPDATE,
      mylist: newCampaignSelected,
      mylist_selected: newCampaign
    });
  }
};
