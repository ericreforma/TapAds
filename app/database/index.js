import Realm from 'realm';
import moment from 'moment';
import { API } from '../config/api';

const DATETIME_FORMAT = 'YYYY-MM-DDTHH:mm:ss';

class Token extends Realm.Object {}
Token.schema = {
  name: 'Token',
  properties: {
    token: 'string',
    created_at: 'date',
    valid: 'bool',
  },
};

class User extends Realm.Object {}
User.schema = {
  name: 'User',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
    username: 'string',
    media_id: 'int',
    profilePicture: 'string',
    licenseImage: 'string',
    birthdate: 'string',
    contact_number: 'string',
    location: 'string',
    email: 'string',
    account_number: 'string',
    notificationCount: 'int',
    created_at: 'date',
    updated_at: 'date',
    ratings: 'Rating[]'
  }
};

class Rating extends Realm.Object {}
Rating.schema = {
  name: 'Rating',
  properties: {
    id: 'int',
    user_id: 'int',
    client_id: 'int',
    rate: 'int',
    comment: 'string',
    created_at: 'date',
    updated_at: 'date'
  }
};

class UserVehicle extends Realm.Object {}
UserVehicle.schema = {
  name: 'Vehicle',
  primaryKey: 'id',
  properties: {
    id: 'int',
    user_id: 'string',
    vehicle_id: 'string',
    color: 'string',
    type: 'string',
    created_at: 'date',
    updated_at: 'date'
  }
};

class Campaign extends Realm.Object {}
Campaign.schema = {
  name: 'Campaign',
  primaryKey: 'campaign_id',
  properties: {
    campaign_id: 'int',
    client_id: 'int',
    name: 'string',
    description: 'string',
    location: 'string',
    media_id: 'int',
    vehicle_classification: 'int',
    vehicle_type: 'int',
    vehicle_stickerArea: 'int',
    slots: 'int',
    pay_basic: 'float',
    pay_additional: 'float',
    pay_additional_km: 'float',
    created_at: 'date',
    slots_used: 'int',
    active: 'bool',
    completed: 'bool',
    favorite: 'bool'
  }
};

class CampaignTrip extends Realm.Object {}
CampaignTrip.schema = {
  name: 'CampaignTrip',
  primaryKey: 'id',
  properties: {
    id: 'int',
    campaign_id: 'int',
    campaign_traveled: 'string',
    car_traveled: 'string',
    started: 'int',
    ended: 'int',
    started_lat: 'string',
    started_lng: 'string',
    ended_lat: 'string',
    ended_lng: 'string',
  },
};

class CampaignTripMap extends Realm.Object {}
CampaignTripMap.schema = {
  name: 'CampaignTripMap',
  primaryKey: 'id',
  properties: {
    id: 'int',
    campaign_id: 'int',
    campaign_trip_id: 'int',
    counted: 'int',
    latitude: 'string',
    longitude: 'string',
    distance: 'string',
    speed: 'string',
    timestamp: 'int',
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
    User,
    Rating,
    UserVehicle,
    Campaign,
    CampaignTrip,
    CampaignTripMap,
    CampaignLocation
  ],
});

export const UserSchema = {
  update: (user, callbackSuccess, callbackFailed) => {
    try {
      realm.write(() => {
        realm.delete(realm.objects('User'));
        const newUser = realm.create('User', {
          id: user.id,
          name: user.name,
          username: user.username,
          media_id: user.media_id,
          profilePicture: user.profilePicture,
          licenseImage: user.licenseImage,
          birthdate: user.birthdate,
          contact_number: user.contact_number,
          location: user.location,
          email: user.email,
          account_number: user.account_number,
          notificationCount: user.notificationCount,
          created_at: moment(user.created_at).format(DATETIME_FORMAT),
          updated_at: moment(user.updated_at).format(DATETIME_FORMAT),
          ratings: []
        });

        for (const r of user.ratings) {
          newUser.ratings.push({
            id: r.id,
            user_id: r.user_id,
            client_id: r.client_id,
            rate: r.rate,
            comment: r.comment ? r.comment : '',
            created_at: moment(r.created_at).format(DATETIME_FORMAT),
            updated_at: moment(r.updated_at).format(DATETIME_FORMAT)
          });
        }
        callbackSuccess();
      });
    } catch (error) {
      callbackFailed(error);
    }
  },

  get() {
    const u = {
      id: 0,
      name: '',
      username: '',
      media_id: 0,
      profilePicture: '',
      licenseImage: '',
      birthdate: '',
      contact_number: '',
      location: '',
      email: '',
      account_number: '',
      email_verified_at: '',
      notificationCount: '',
      created_at: '',
      updated_at: '',
      ratings: []
    };

    const us = realm.objects('User');
    for (const usr of us) {
      u.id = usr.id;
      u.name = usr.name;
      u.username = usr.username;
      u.media_id = usr.media_id;
      u.licenseImage = usr.licenseImage;
      u.profilePicture = usr.profilePicture;
      u.birthdate = usr.birthdate;
      u.contact_number = usr.contact_number;
      u.location = usr.location;
      u.email = usr.email;
      u.account_number = usr.account_number;
      u.notificationCount = usr.notificationCount;
      u.created_at = usr.created_at;
      u.updated_at = usr.updated_at;
      u.ratings = usr.ratings;
    }

    return u;
  },

};

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

export const CampaignSchema = {
  insert: (campaign, callbackFailed) => {
    try {
      realm.write(() => {
        realm.create('Campaign', {
          id: campaign.id,
          campaign_id: campaign.id,
          client_id: campaign.client_id,
          name: campaign.name,
          description: campaign.description,
          location: campaign.location,
          media_id: campaign.media_id,
          vehicle_classification: campaign.vehicle_classification,
          vehicle_type: campaign.vehicle_type,
          vehicle_stickerArea: campaign.vehicle_stickerArea,
          slots: campaign.slots,
          pay_basic: parseFloat(campaign.pay_basic),
          pay_additional: parseFloat(campaign.pay_additional),
          pay_additional_km: parseFloat(campaign.pay_additional_km),
          created_at: moment(campaign.created_at).format(DATETIME_FORMAT),
          slots_used: campaign.slots_used,
          active: true,
          completed: false,
          favorite: false
        });
      });
    } catch (e) {
      callbackFailed(e);
    }
  },

  get: () => realm.objects('Campaign'),

};

export const CampaignTripSchema = {
  insert: (campaigntrip, callbackFailed = null) => {
    const m = realm.objects('CampaignTrip').max('id');
    const maxId = m === undefined ? 0 : m;
    const id = maxId + 1;

    try {
      realm.write(() => {
        realm.create('CampaignTrip', {
          id,
          campaign_id: campaigntrip.campaign_id,
          campaign_traveled: campaigntrip.campaign_traveled.toString(),
          car_traveled: campaigntrip.car_traveled.toString(),
          started: campaigntrip.started,
          ended: campaigntrip.ended,
          started_lat: campaigntrip.started_lat.toString(),
          started_lng: campaigntrip.started_lng.toString(),
          ended_lat: campaigntrip.ended_lat.toString(),
          ended_lng: campaigntrip.ended_lng.toString()
        });
      });
    } catch (e) {
      console.log(e);
      if (callbackFailed !== null) {
        callbackFailed(e);
      }
    }

    return id;
  },
  get: () => realm.objects('CampaignTrip')
};

export const CampaignTripMapSchema = {
  insert: (campaigntripmap, callbackFailed = null) => {
    const m = realm.objects('CampaignTripMap').max('id');
    const maxId = m == null ? 0 : m;
    const id = maxId + 1;

    try {
      realm.write(() => {
        realm.create('CampaignTripMap', {
          id,
          campaign_id: campaigntripmap.campaign_id,
          campaign_trip_id: campaigntripmap.campaign_trip_id,
          counted: campaigntripmap.counted,
          latitude: campaigntripmap.latitude.toString(),
          longitude: campaigntripmap.longitude.toString(),
          distance: campaigntripmap.distance.toString(),
          speed: campaigntripmap.speed.toString(),
          timestamp: campaigntripmap.timestamp,
        });
      });
    } catch (e) {
      console.log(e);
      if (callbackFailed !== null) {
        callbackFailed(e);
      }
    }
  },
  get: () => realm.objects('CampaignTripMap')
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