import { NavigationActions } from 'react-navigation';

let navigator;

function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef;
}

function navigate(routeName, params = null, websocket = null) {
  if(websocket) {
    websocket.Socket.stop(websocket.socket);
  }

  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    }),
  );
}

export default {
  navigate,
  setTopLevelNavigator,
};
