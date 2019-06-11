import { CAMPAIGN } from '../actions/types.action';

const initialState = {
  list: [],
  vehicle_classification: 0,
  current_page: 0,
  total_page: 0,
  isRequesting: false,
  isRequestDone: false,
  recommended: []
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
        list: state.list === [] ? action.data.data : [...state.list, ...action.data.data],
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
    default:
      return state;
  }
}
