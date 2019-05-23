
import { createStackNavigator, createAppContainer } from 'react-navigation';
import LogInPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';

const RouteStack = createStackNavigator({
  login: {
    screen: LogInPage
  },
  signup: {
    screen: HomePage
  }
});

const Routes = createAppContainer(RouteStack);
export default Routes;
