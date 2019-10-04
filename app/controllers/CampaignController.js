import { HttpRequest } from '../services/http';
import { URL } from '../config/variables';

export const CampaignController = {
  home: {
    list: (filters = '') =>
      HttpRequest.get(`${URL.PAGE.CAMPAIGN.BROWSE}${filters}`),
  },

  interested: (user_vehicle_id, campaign_id) =>
    HttpRequest.post(`${URL.PAGE.CAMPAIGN.ADD}`, {
      campaign_id,
      user_vehicle_id,
    }),

  mylist: () => HttpRequest.get(`${URL.PAGE.CAMPAIGN.LIST}`),

  trip_create: (campaign_id, user_campaign_id) =>
    HttpRequest.post(`${URL.PAGE.TRIP.ADD}`, {
      campaign_id,
      user_campaign_id,
    }),

  trip_send_location: trip_map =>
    HttpRequest.post(`${URL.PAGE.TRIP.MAP}`, {
      trip_map,
    }),

  trip_end: trip =>
    HttpRequest.post(`${URL.PAGE.TRIP.END}`, {
      trip,
    }),
  
  favorite: cid => HttpRequest.get(`${URL.PAGE.CAMPAIGN.FAVORITE(cid)}`),

  recommendedPage: (filters = '') => HttpRequest.get(`${URL.PAGE.CAMPAIGN.RECOMMENDED}${filters}`),
};
