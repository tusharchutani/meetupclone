import {reducer as formReducer} from 'redux-form';
import {combineReducers} from 'redux';
import authReducer from './authReducer';
import eventReducer from './eventReducer';
import profilesReducer from './profilesReducer';
import nav from './nav.js';
import alerts from './alerts.js';
import userSearch from './userSearch';
import uiEnabled from './uiEnabled';
import flagObjectReducer from './flagObjectReducer';
import notifications from './notifications';
import locationReducer from './locationReducer'
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
	flagObject:flagObjectReducer,
	location:locationReducer
	// activity:activityIndicator
});