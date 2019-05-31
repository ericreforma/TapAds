import { AUTH, USER } from './types.action';
import {
  AuthController,
  UserController
} from '../../controllers';
import { TokenSchema, UserSchema } from '../../database';

export const AuthAction = {
  login: (email, password) => (dispatch) => {
      dispatch({
        type: AUTH.LOGIN.REQUEST,
        email,
        password
      });

      AuthController.login(email, password)
        .then((authResponse) => {
          dispatch({ type: AUTH.LOGIN.SUCCESS });
          TokenSchema.update(authResponse.data.token,
            () => {
              // SUCCESS
              dispatch({ type: USER.GET.PROFILE.REQUEST });

              UserController.request.profile()
              .then((userResponse) => {
                dispatch({ type: USER.GET.PROFILE.SUCCESS });

                UserSchema.update(userResponse.data,
                () => {
                  console.log('UserSchema Saved');
                },
                (e) => {
                  console.log(e);
                });
              })
              .catch((error) => {
                dispatch({ type: USER.GET.PROFILE.FAILED });
                console.log(error);
              });
            },
            (e) => {
              console.log('Error saving Token');
              console.log(e);
          });
        })
        .catch((error) => {
          console.log(error);
          dispatch({ type: AUTH.LOGIN.FAILED });
        });
  },
};
