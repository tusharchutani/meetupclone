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
			dispatch(showErrorAlert("Unable to login. Try again"));
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
			dispatch(showErrorAlert(error.response.data.error));
		})
	}
}


authUser = (user_id) =>{
	return {
		type: 'AUTH_USER',
		user_id
	}
}


showErrorAlert = (error) => {

	if(!error){
		error = "Unknown error";
	}
	console.log("Error is "+error);
	return {
		type:'SHOW_ALERT',
		alert_title:"Oops",
		alert_msg: error
	}
}

 exports.unauthUser = {
		type: 'UNAUTH_USER',
		user_id:undefined
}