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
    valid: 'bool'
  }
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
    description: 'string',
    birthdate: 'string',
    contact_number: 'string',
    location: 'string',
    email: 'string',
    email_verified_at: 'string',
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

const realm = new Realm({ schema: [Token, User, Rating, UserVehicle] });

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
          description: user.description,
          birthdate: user.birthdate,
          contact_number: user.contact_number,
          location: user.location,
          email: user.email,
          email_verified_at: user.email_verified_at,
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
            comment: r.comment,
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
      description: '',
      birthdate: '',
      contact_number: '',
      location: '',
      email: '',
      email_verified_at: '',
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
      u.description = usr.description;
      u.birthdate = usr.birthdate;
      u.contact_number = usr.contact_number;
      u.location = usr.location;
      u.email = usr.email;
      u.email_verified_at = usr.email_verified_at;
      u.created_at = usr.created_at;
      u.updated_at = usr.updated_at;
      u.ratings = usr.ratings;
    }

    return u;
  }
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

  update: (token, callbackSuccess, callbackFailed) => {
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
    console.log(api);
    return api;
  }
};