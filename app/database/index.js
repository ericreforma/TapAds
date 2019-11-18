import Realm from 'realm';
import { API } from '../config/api';

class Token extends Realm.Object {}
Token.schema = {
  name: 'Token',
  properties: {
    token: 'string',
    created_at: 'date',
    valid: 'bool',
  },
};

class CampaignLocation extends Realm.Object {}
CampaignLocation.schema = {
  name: 'CampaignLocation',
  primaryKey: 'id',
  properties: {
    id: 'int',
    table_id: 'int',
    name: 'string',
    json_coordinates: 'string'
  }
};

const realm = new Realm({
  schema: [
    Token,
    CampaignLocation
  ],
});

export const TokenSchema = {
  get() {
    const tok = {
      token: '',
      created_at: '',
      valid: false
    };
    const to = realm.objects('Token');
    for (const t of to) {
      tok.token = t.token;
      tok.created_at = t.created_at;
      tok.valid = t.valid;
    }

    return tok;
  },

  update: (token, callbackSuccess = null, callbackFailed = null) => {
    try {
      realm.write(() => {
        realm.delete(realm.objects('Token'));
        realm.create('Token', {
          token,
          created_at: new Date(),
          valid: true
        });
      });
      callbackSuccess();
    } catch (e) {
      callbackFailed();
    }
  },

  revoke: () => realm.write(() => {
    Token.valid = false;
  }),

  api: () => {

    const schema = realm.objects('Token');
    let token = '';

    for (const s of schema) {
      token = s.token;
    }
    const api = API;
    api.headers.Authorization = `Bearer ${token}`;
    return api;
  }
};

export const CampaignLocationSchema = {
  insert: (loc, callbackSuccess, callbackFailed) => {
    try {
      for(const l of loc) {
        realm.write(() => {
          realm.create('CampaignLocation', {
            id: getPrimaryKeyId('CampaignLocation'),
            table_id: l.id,
            name: l.name,
            json_coordinates: l.json_coordinates
          });
        });
      }
      callbackSuccess(loc);
    } catch(e) {
      callbackFailed(e);
    }
  },

  get: (id = false) => {
    let locations = realm.objects('CampaignLocation');

    if(id) {
      const arrayIDs = id.map(i => `table_id == ${i}`);
      const query = arrayIDs.join(' OR ');
      locations = locations.filtered(query); 
    }

    return locations;
  },

  getAll: () => {
    let locations = realm.objects('CampaignLocation');
    let loc = [];
    for(const l of locations) {
      const res = {
        id: l.table_id,
        name: l.name,
        json_coordinates: l.json_coordinates
      };
      loc.push(res);
    }
    return loc;
  }
};

const getPrimaryKeyId = (model) => {
  if (realm.objects(model).max("id")) {
    return realm.objects(model).max("id") + 1;
  }
  return 1;
};