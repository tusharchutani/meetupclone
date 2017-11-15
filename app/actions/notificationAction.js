import {SecureStore} from 'expo';
import axios from 'axios';



import {GET_USER_PROFILE,GET_FOLLOWERS,GET_FOLLOWING,FIND_PEOPLE} from '../api';

exports.getMyNotifications = () => {
	return function(dispatch){
		return SecureStore.getItemAsync('user_id').then((userId)=>{
			return axios.get(GET_USER_PROFILE(userId)).
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





