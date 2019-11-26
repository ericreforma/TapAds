import { USER } from './types.action';
import { UserController } from '../../controllers';

export const UserAction = {
  getNotification: () => dispatch => {
    UserController.request.get.notifications()
    .then(res => {
      dispatch({ type: USER.NOTIFICATION.SUCCESS });
      dispatch({ type: USER.NOTIFICATION.GET, notification: res.data });
    })
    .catch(error => {
      console.log(error);
      console.log(error.response);
      dispatch({ type: USER.NOTIFICATION.FAILED });
    })
  },
  updateNotification: (args = {}) => dispatch => {
    UserController.request.update.notifications(args)
    .then(res => {
      dispatch({ type: USER.NOTIFICATION.SUCCESS });
      dispatch({ type: USER.NOTIFICATION.UPDATE, notification: res.data });
    })
    .catch(error => {
      console.log(error);
      console.log(error.response);
      dispatch({ type: USER.NOTIFICATION.FAILED });
    })
  }
};