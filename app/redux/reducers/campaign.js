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
  mylist: [],
  mylist_selected: {},
  trip: {}
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
        list: state.list === [] ? action.data.data :
          [...state.list, ...action.data.data],
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
        list: [],
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

    case CAMPAIGN.MYLIST.UPDATE:
      return Object.assign({}, state, {
        mylist: state.mylist === []
          ? action.campaign
          : [...state.mylist, ...action.campaign]
      });

    case CAMPAIGN.MYLIST.ADD:
      return Object.assign({}, state, {
        mylist: state.mylist === [] ? action.campaign :
          [...state.mylist, action.campaign]
      });

    case CAMPAIGN.MYLIST.GET:
      return Object.assign({}, state, {
        mylist: action.mylist
      });

    case CAMPAIGN.MYLIST.SELECTED:
      return Object.assign({}, state, {
        mylist_selected: action.campaign
      });

    case CAMPAIGN.TRIP.START:
      return Object.assign({}, state, {
        trip: action.trip
      });

    default:
      return state;
  }
}
