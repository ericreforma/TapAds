import { NavigationActions } from 'react-navigation';

let navigator;

function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef;
}

function navigate(routeName, params = null) {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  );
}

function back() {
  navigator.dispatch(
    NavigationActions.back()
  );
}

export default {
  back,
  navigate,
  setTopLevelNavigator,
};
