import {SecureStore} from 'expo';
import axios from 'axios';
import {showErrorAlert} from './alertActions.js';


import {GET_USER_NOTIFICATION,READ_NOTIFICATION} from '../api';

exports.getMyNotifications = (userId) => {
	return function(dispatch){
		if(userId != undefined || userId.length == 0){
				return axios.get(GET_USER_NOTIFICATION(userId),{timeout:60000}).
					then((response)=>{
						dispatch ({type: 'SET_NOTIFICATIONS',notifications:response.data});			
					}).catch((error)=>{
						// dispatch(showErrorAlert(error.message));
					});
			}
			else{
				return;
			}
	}
}

exports.readNotification = (notificationId) => {
	return function(dispatch){
		return axios.put(READ_NOTIFICATION(notificationId),{timeout:10000}).
			then((response)=>{
				dispatch ({type: 'READ_NOTIFICATION',notificationId:notificationId});			
			}).catch((error)=>{
				dispatch(showErrorAlert(error.message));
			});
	}	
}





