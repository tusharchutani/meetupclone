import { NavigationActions } from 'react-navigation';
import MokAppRouter from '../AppRouter';

const initialState = MokAppRouter.router.getStateForAction(NavigationActions.init());

module.exports = (state = initialState, action) => {
    

	let nextState = MokAppRouter.router.getStateForAction(action,state);
	switch(action.type){
		case 'OPEN_MAIN_APP':
			nextState = MokAppRouter.router.getStateForAction(
				NavigationActions.navigate({ routeName: 'MainApp' }),
				state);
				break;
		case 'NAVIGATE_TO_EVENT_INFO':
			nextState = MokAppRouter.router.getStateForAction(
				NavigationActions.navigate({ routeName: 'EventInfo' }),
				state);
			break;
		case 'OPEN_FLAG_OBJECT':
				nextState = MokAppRouter.router.getStateForAction(
				NavigationActions.navigate({ routeName: 'ReportObject' }),
				state);
			break;
		case 'OBJECT_FLAGGED':
				nextState = MokAppRouter.router.getStateForAction(
				NavigationActions.back(),
				state);
			break;		
		case 'EVENT_CREATED':
				nextState = MokAppRouter.router.getStateForAction(
				NavigationActions.back(),
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
		case 'OPEN_FORGET_PASSWORD':
			nextState = MokAppRouter.router.getStateForAction(
				NavigationActions.navigate({ routeName: 'ForgotPassword' }),
				state);
			break;
		case 'OPEN_PEOPLE_INFO':
			nextState = MokAppRouter.router.getStateForAction(
				NavigationActions.navigate({ routeName: 'PeopeInfo' }),
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
		case 'OPEN_EVENT_LOCATION':
			nextState = MokAppRouter.router.getStateForAction(
				NavigationActions.navigate({ routeName: 'EventMap' }),
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