import { NavigationActions } from 'react-navigation';
import MokAppRouter from '../AppRouter';

const initialState = MokAppRouter.router.getStateForAction(NavigationActions.init());

module.exports = (state = initialState, action) => {

	let nextState = MokAppRouter.router.getStateForAction(action,state);
	switch(action.type){
		case 'AUTH_USER':
			nextState = MokAppRouter.router.getStateForAction(
				NavigationActions.navigate({ routeName: 'MainApp' }),
				state);
				break;
		case 'GET_EVENT_INFO':
			nextState = MokAppRouter.router.getStateForAction(
				NavigationActions.navigate({ routeName: 'EventInfo' }),
				state);
			break;
		case 'OPEN_CREATE_EVENT':
			nextState = MokAppRouter.router.getStateForAction(
				NavigationActions.navigate({ routeName: 'CreateEvent' }),
				state);
			break;	
			//remove this 
		case 'GET_FOLLOWERS_FOLLOWING':
			nextState = MokAppRouter.router.getStateForAction(
				NavigationActions.navigate({ routeName: 'Connections' }),
				state);
			break;
		case 'OPEN_EDIT_EVENT':
			nextState = MokAppRouter.router.getStateForAction(
				NavigationActions.navigate({ routeName: 'EventEdit' }),
				state);
			break;		
		case 'OPEN_EDIT_PROFILE':
			nextState = MokAppRouter.router.getStateForAction(
				NavigationActions.navigate({ routeName: 'EditProfile' }),
				state);		
			break
		case 'OPEN_USER_PROFILE':
			nextState = MokAppRouter.router.getStateForAction(
				NavigationActions.navigate({ routeName: 'UserProfile' }),
				state);		
			break			
		case 'OPEN_FIND_FRIENDS':
			nextState = MokAppRouter.router.getStateForAction(
				NavigationActions.navigate({ routeName: 'Connections' }),
				state);
			break;				
		case 'UNAUTH_USER':
			nextState = MokAppRouter.router.getStateForAction(
				NavigationActions.navigate({ routeName: 'LoginSignup' }),
				state);
				break;
	}
	

	return nextState || state;
}