import { StackNavigator} from 'react-navigation';
import LoginSignup from './LoginSignup';
import LoginScreen from './LoginScreen'
import SignUp from './SignUp';

module.exports = new StackNavigator({
	LoginSignup:{
		screen:LoginSignup,
		navigationOptions:{
			header:null
		}
	},LoginScreen:{
		screen:LoginScreen,
		navigationOptions:{title:'Log in'}
	},SignUp:{
		screen:SignUp,
		navigationOptions:{title:'Sign up'}
	}
},{		navigationOptions:{
			headerMode:'screen'
		}

	}
			);