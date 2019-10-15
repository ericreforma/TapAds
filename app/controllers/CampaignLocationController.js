import { CampaignLocationSchema } from '../database';
import { HttpRequest } from '../services/http';

export const CampaignLocationController = {
  getLocation: (id, callbackSuccess, callbackFailed) => {
    const loc = CampaignLocationSchema.get(id);
    const locations = [];
    const allID = id.map(location_id => location_id);
    for(const l of loc) {
      const res = {
        id: l.table_id,
        name: l.name,
        json_coordinates: l.json_coordinates
      };
      locations.push(res);

      const index = allID.findIndex(id => id === l.table_id);
      if(index >= 0) {
        allID.splice(index, 1);
      }
    }

    if(allID.length === 0) {
      callbackSuccess(locations);
    } else {
      HttpRequest.post('/user/campaign/location', {id: allID})
      .then(res => {
        CampaignLocationSchema.insert(res.data,
        loc => {
          callbackSuccess(
            [...loc, ...locations]
          );
        },
        callbackFailed);
      })
      .catch(callbackFailed);
    }
  }
};