import {reducer as formReducer} from 'redux-form';
import {combineReducers} from 'redux';
import authReducer from './authReducer';
import eventReducer from './eventReducer';
import profilesReducer from './profilesReducer';
import nav from './nav.js';
import alerts from './alerts.js';
import userSearch from './userSearch';
import uiEnabled from './uiEnabled';
import notifications from './notifications';
// import activityReducer from './activityReducer.js';
export default combineReducers({
	form:formReducer,
	auth: authReducer,
	events:eventReducer,
	profiles:profilesReducer,
	nav,
	alerts,
	notifications,
	userSearch:userSearch,
	uiEnabled,
	// activity:activityIndicator
});