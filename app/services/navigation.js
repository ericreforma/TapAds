import { StackActions, NavigationActions } from 'react-navigation';

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
  navigator.dispatch(NavigationActions.back());
}

function reset(routeName, params = null) {
  navigator.dispatch(resetValue(routeName, params));
}

function resetValue(routeName, params) {
  return StackActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({
        routeName,
        params
      })
    ]
  });
}

export default {
  back,
  reset,
  navigate,
  setTopLevelNavigator,
};
