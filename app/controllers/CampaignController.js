import { HttpRequest } from '../services/http';
import { URL } from '../config/variables';

export const CampaignController = {
  home: {
    list: (filters = '') => HttpRequest.get(`${URL.PAGE.CAMPAIGN}${filters}`),
  },

  interested: (user_vehicle_id, campaign_id) =>
      HttpRequest.post(`${URL.PAGE.ADDLIST}`, {
        campaign_id,
        user_vehicle_id
  }),

  mylist: () => HttpRequest.get(`${URL.PAGE.MYLIST}`)

};
