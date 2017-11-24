import {SecureStore} from 'expo';
import axios from 'axios';



import {SIGNIN_URL, SIGNUP_URL} from '../api';



exports.loginUser = (email, password) => {

	return function(dispatch){
		return axios.post(SIGNIN_URL, {email, password}).then((response)=>{
			var {user_id, token} = response.data;

			SecureStore.setItemAsync('user_id',user_id).then(()=>{
				SecureStore.setItemAsync('token',token).then(()=>{
						dispatch(authUser(user_id)); });
			});
		}).catch((error)=>{
			throw "Unable to login. Try again";
		});
	}
}

exports.signUpUser = (payload) => {
	return function(dispatch){
		return axios.post(SIGNUP_URL, payload).then((response)=>{
			var {user_id, token} = response.data;
			SecureStore.setItemAsync('user_id',user_id).then(()=>{
				SecureStore.setItemAsync('token',token).then(()=>{
					dispatch(authUser(user_id));
				})
			});	
		}).catch((error)=>{
			throw error.response.data.error;
		})
	}
}


exports.authUserPublic = (user_id) => {
	return authUser(user_id);
}


authUser = (user_id) =>{
	return {
		type: 'AUTH_USER',
		user_id
	}
}



exports.unauthUser = {
		type: 'UNAUTH_USER',
		user_id:undefined
}