import {SecureStore} from 'expo';
import axios from 'axios';
import {showErrorAlert} from './alertActions.js';


import {GET_USER_NOTIFICATION} from '../api';

exports.getMyNotifications = () => {
	return function(dispatch){
		return SecureStore.getItemAsync('user_id').then((userId)=>{
			return axios.get(GET_USER_NOTIFICATION(userId),{timeout:10000}).
			then((response)=>{
				dispatch ({type: 'SET_NOTIFICATIONS',notifications:response.data});			
			}).catch((error)=>{
				dispatch(showErrorAlert(error.message));
				});
			}).catch((error)=>{
				console.log("There was an error "+error);
			});
	}
}





