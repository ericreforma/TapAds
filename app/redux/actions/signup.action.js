import { SIGNUP } from './types.action';
import NavigationService from '../../services/navigation';


export const SignupAction = {
  info: data => dispatch => {
    dispatch({ type: SIGNUP.INFO, data });
    NavigationService.navigate('SignUpAddImage');
  },
  license_profile_image: data => dispatch => {
    dispatch({ type: SIGNUP.IMAGES, data });
    NavigationService.navigate('SignUpAddVehicles');
  }
}