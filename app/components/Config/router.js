import React from 'react';
import { StackNavigator } from 'react-navigation';

import Login from '../Login/Login';
import LoginOptions from '../Login/LoginOptions';
import LoginScreen from '../Login/LoginScreen';
import SignUp from '../Login/SignUp';

	
export const LoginStack = StackNavigator({
	Login: {
		screen: Login
	}
});
 