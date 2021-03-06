import { AUTH, USER } from './types.action';
import { Alert } from 'react-native';
import { AuthController, UserController } from '../../controllers';
import { TokenSchema } from '../../database';
import NavigationService from '../../services/navigation';

export const AuthAction = {
  login: (email, password) => dispatch => {
    dispatch({
      type: AUTH.LOGIN.REQUEST,
      email,
      password,
    });

    AuthController.login(email, password)
    .then(authResponse => {
      var { status } = authResponse.data;
      
      if(status) {
        dispatch({ type: AUTH.LOGIN.SUCCESS });
        TokenSchema.update(
          authResponse.data.token,
          () => {
            dispatch({ type: USER.GET.PROFILE.REQUEST });
            UserController.request.profile()
              .then(userResponse => {
                dispatch({
                  type: USER.GET.PROFILE.SUCCESS,
                  user: userResponse.data,
                });

                NavigationService.navigate('Loading');
              })
              .catch(error => {
                dispatch({ type: USER.GET.PROFILE.FAILED });
                console.log(error);
              });
          },
          e => {
            console.log('Error saving Token');
            console.log(e);
          });
        } else {
          dispatch({ type: AUTH.LOGIN.FAILED });
          Alert.alert('Login Failed', authResponse.data.message);
        }
    })
    .catch(error => {
      console.log(error);
      console.log(error.response);
      dispatch({ type: AUTH.LOGIN.FAILED });
      Alert.alert('Login Failed',error.message);
    });
  },

  getProfile: () => dispatch => {
		UserController.request.profile()
		.then(userResponse => {
      dispatch({
        type: USER.GET.PROFILE.SUCCESS,
        user: userResponse.data,
      });
		})
		.catch(error => {
      console.log(error);
			console.log(error.response);
      dispatch({ type: USER.GET.PROFILE.FAILED });
		});
  }
};
