import { NavigationActions } from 'react-navigation';
import MokApp from '../MainApp';


const initialState = MokApp.router.getStateForAction(NavigationActions.init());

module.exports = (state = initialState, action) => {
	const nextState = MokApp.router.getStateForAction(action,state);
	
	return nextState || state;
}