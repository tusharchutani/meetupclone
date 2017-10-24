import {SecureStore} from 'expo';
import axios from 'axios';



import {GET_USER_PROFILE,GET_FOLLOWERS,GET_FOLLOWING,FIND_PEOPLE} from '../api';

exports.getMyprofile = () => {
	
	return function(dispatch){
		return SecureStore.getItemAsync('user_id').then((userId)=>{
			return axios.get(GET_USER_PROFILE(userId)).
			then((response)=>{
				dispatch ({type: 'SET_MY_PROFILE',myProfile:response.data});			
			}).catch((error)=>{
				dispatch(showErrorAlert(error.message));
				});
			}).catch((error)=>{
				console.log("There was an error "+error);
			});
	}
}
exports.getUserConnections = () => {
	return function(dispatch){
			dispatch({type:'GET_FOLLOWERS_FOLLOWING'});
		}
}

exports.setUserConnections = (followerOrFollowing,userId, isFindUser=false) => {
	var url = "";
	var title = "";
	if(followerOrFollowing == "follower"){
		url = GET_FOLLOWERS(userId);
		title = "Followers";
	}
	else if(followerOrFollowing == "following"){
		url = GET_FOLLOWING(userId);
		title = "Following"
	}
	return function(dispatch){
		return axios.get(url).then((response)=>{
			  dispatch({type:'SET_FOLLOWERS_FOLLOWING',list:response.data, isFindUser, title});
		}).catch((error)=>{
			dispatch(showErrorAlert(error.message));
		});
	}
}

exports.searchUsers = (searchQuerry) => {
	if(searchQuerry == ""){
		return {type:'SET_FIND_FRIENDS',list:[]};
	}
	return function(dispatch){
		return SecureStore.getItemAsync('user_id').then((userId)=>{
			return axios.get(FIND_PEOPLE(userId,searchQuerry)).then((response)=>{
				dispatch({type:'SET_FIND_FRIENDS',list:response.data});
			}).catch((error)=>{
				dispatch(showErrorAlert(error.response.data.error));
			});
	})
	};
}


exports.openUserProfile = (userId) => {

	return function(dispatch){
		return axios.get(GET_USER_PROFILE(userId)).then((response)=>{
			dispatch({type:'OPEN_USER_PROFILE',other_user_profile:response.data});
		}).catch((error)=>{
			dispatch(showErrorAlert(error.response.data.error));
		});		
	};
}

