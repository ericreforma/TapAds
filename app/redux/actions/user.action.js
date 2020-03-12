import { USER } from './types.action';
import { UserController } from '../../controllers';
import NavigationService from '../../services/navigation';

export const UserAction = {
  getNotification: () => dispatch => {
    UserController.request.get.notifications()
    .then(res => {
      dispatch({ type: USER.NOTIFICATION.GET, notification: res.data });
    })
    .catch(error => {
      console.log(error);
      console.log(error.response);
      dispatch({ type: USER.NOTIFICATION.FAILED });
    })
  },
  updateNotification: (args = {}, action) => (dispatch, getState) => {
    UserController.request.update.seen[action](args)
    .then(res => {
      console.log(res.data);
      if(res.data.status) {
        const state = getState();
        const notification = state.userReducer.notification;
        const newNotification = notification - res.data.message;
        dispatch({ type: USER.NOTIFICATION.UPDATE, notification: newNotification });
      } else {
        dispatch({ type: USER.NOTIFICATION.FAILED });
        alert(res.data.message);
        NavigationService.navigate('Home');
      }
    })
    .catch(error => {
      console.log(error);
      console.log(error.response);
      dispatch({ type: USER.NOTIFICATION.FAILED });
    })
  },
  removeVehicle: (uvid, callback) => (dispatch, getState) => {
    dispatch({ type: USER.VEHICLE.REMOVE.REQUEST });

    const args = `?user_vehicle_id=${uvid}`;
    UserController.request.remove.vehicle(args)
    .then(res => {
      const state = getState();
      const user = state.userReducer.user;
      const vehicles = user.vehicles.filter(v => v.id !== uvid);
      dispatch({ type: USER.VEHICLE.REMOVE.SUCCESS, vehicles });
      callback();
    })
    .catch(err => {
      console.log(err);
      console.log(err.response);
      dispatch({ type: USER.VEHICLE.REMOVE.FAILED });
      callback();
    });
  }
};