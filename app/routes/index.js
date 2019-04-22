
import { createStackNavigator, createAppContainer } from 'react-navigation';
import LogInPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';

const RouteStack = createStackNavigator({
  login: {
    screen: LogInPage
  },
  signup: {
    screen: SignUpPage
  }
});

const Routes = createAppContainer(RouteStack);
export default Routes;
