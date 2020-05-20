import Login from './Login';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Map from './Map';

const AppNavightor = createStackNavigator(
  {
    Login: {
      screen: Login,
    },
    Map: {
      screen: Map,
    },

},
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);

export default createAppContainer(AppNavightor);
