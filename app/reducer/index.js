import {reducer as formReducer} from 'redux-form';
import {combineReducers} from 'redux';
import authReducer from './authReducer';
import nav from './nav.js'

export default combineReducers({
	form:formReducer,
	auth: authReducer,
	nav: nav
});