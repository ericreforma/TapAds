import { HttpRequest } from '../services/http';

export const CampaignController = {
  home: {
    list: (filters = '') => HttpRequest.get(`/user/campaigns${filters}`),
    
  },


};
