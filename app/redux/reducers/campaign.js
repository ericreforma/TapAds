import { CAMPAIGN } from '../actions/types.action';

const initialState = {
  list: [],
  selected: {},
  vehicle_classification: 0,
  current_page: 0,
  total_page: 0,
  isRequesting: false,
  isRequestDone: false,
  recommended: [],
  mylistRequesting: false,
  mylistRequestDone: false,
  mylist: [],
  mylist_selected: {},
  trip: {},
  campaign_location: [],
  campaign_loc_isRequesting: false,
  activeCampaign: []
};

export function campaignReducer(state = initialState, action) {
  switch (action.type) {
    case CAMPAIGN.LIST.REQUEST:
      return Object.assign({}, state, {
        isRequesting: true,
        isRequestDone: false
      });

    case CAMPAIGN.LIST.SUCCESS:
      return Object.assign({}, state, {
        // list: state.list === [] ? action.data.data :
        //   ( action.newBatch ? action.data.data :
        //     [...state.list, ...action.data.data] ),
        list: action.newBatch
          ? action.data.data
          : [...state.list, ...action.data.data],
        current_page: action.data.current_page,
        total_page: action.data.last_page,
        isRequesting: false,
        isRequestDone: true
      });

    case CAMPAIGN.LIST.FAILED:
      return Object.assign({}, state, {
        isRequesting: false,
        isRequestDone: true
      });

    case CAMPAIGN.LIST.CHANGE:
      return Object.assign({}, state, {
        current_page: 0,
        vehicle_classification: action.classification,
        total_page: 0,
        // list: [],
        isRequesting: true,
        isRequestDone: false,
      });

    case CAMPAIGN.RECOMMENDED.REQUEST:
    case CAMPAIGN.RECOMMENDED.FAILED:
      return state;

    case CAMPAIGN.RECOMMENDED.SUCCESS:
      return Object.assign({}, state, {
        recommended: action.data
      });

    case CAMPAIGN.SELECTED:
      return Object.assign({}, state, {
        selected: action.campaign
      });

    // case CAMPAIGN.MYLIST.UPDATE:
    //   return Object.assign({}, state, {
    //     mylist: state.mylist === []
    //       ? action.campaign
    //       : [...state.mylist, ...action.campaign]
    //   });
    
    case CAMPAIGN.MYLIST.UPDATE:
      return Object.assign({}, state, {
        mylist: action.campaign.mylist,
        mylistRequesting: false,
        mylistRequestDone: true
      });

    case CAMPAIGN.MYLIST.ADD:
      return Object.assign({}, state, {
        mylist: state.mylist === [] ? action.campaign :
          [...state.mylist, action.campaign]
      });

    case CAMPAIGN.MYLIST.REQUEST:
      return Object.assign({}, state, {
        mylistRequesting: true,
        mylistRequestDone: false
      });

    case CAMPAIGN.MYLIST.GET:
      return Object.assign({}, state, {
        mylist: action.campaign.mylist,
        activeCampaign: action.campaign.active,
        mylistRequesting: false,
        mylistRequestDone: true
      });

    case CAMPAIGN.MYLIST.SELECTED:
      return Object.assign({}, state, {
        mylist_selected: action.campaign
      });

    case CAMPAIGN.TRIP.START:
      return Object.assign({}, state, {
        trip: action.trip
      });

    case CAMPAIGN.FAVORITE.SUCCESS:
      return Object.assign({}, state, {
        mylist: action.mylist
      });

    case CAMPAIGN.FAVORITE.FAILED:
      return state;
      
    case CAMPAIGN.RESET:
      return Object.assign({}, state, {
        list: [],
        selected: {},
        vehicle_classification: 0,
        current_page: 0,
        total_page: 0,
        isRequesting: false,
        isRequestDone: false,
        recommended: [],
        mylist: [],
        mylist_selected: {},
        trip: {}
      });

    case CAMPAIGN.LOCATION.SUCCESS:
      return Object.assign({}, state, {
        campaign_location: action.campaign_location,
        campaign_loc_isRequesting: false
      });

    case CAMPAIGN.LOCATION.REQUEST:
      return Object.assign({}, state, {
        campaign_loc_isRequesting: true
      });

    case CAMPAIGN.LOCATION.FAILED:
      return Object.assign({}, state, {
        campaign_loc_isRequesting: false
      });

    case CAMPAIGN.VEHICLE_MONTHLY_UPDATE:
      return Object.assign({}, state, {
        mylist: action.mylist,
        mylist_selected: action.mylist_selected
      });

    case CAMPAIGN.REMOVE.SUCCESS:
      return Object.assign({}, state, {
        mylist_selected: {},
        mylist: action.mylist
      });

    default:
      return state;
  }
}
