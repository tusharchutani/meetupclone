import {SecureStore} from 'expo';
import axios from 'axios';
import {showErrorAlert} from './alertActions.js';


import {GET_USER_PROFILE,GET_FOLLOWERS,GET_FOLLOWING,FIND_PEOPLE,BLOCK_USER,UNBLOCK_USER} from '../api';

exports.getMyprofile = () => {
	
	return function(dispatch){
		return SecureStore.getItemAsync('user_id').then((userId)=>{
			return axios.get(GET_USER_PROFILE(userId, userId)).
			then((response)=>{
				dispatch ({type: 'SET_MY_PROFILE',myProfile:response.data});			
			}).catch((error)=>{
				dispatch(showErrorAlert(error.message));
				throw error
				});
			}).catch((error)=>{
				throw error
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
			if(Object.keys(response.data).length === 0 && response.data.constructor === Object){
				dispatch({type:'SET_FOLLOWERS_FOLLOWING',list:[], isFindUser, title});
			}else{
			  dispatch({type:'SET_FOLLOWERS_FOLLOWING',list:response.data, isFindUser, title});
			}
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

exports.setUserProfile = (userId, requestingUserId) => {
		return function(dispatch){
			return axios.get(GET_USER_PROFILE(userId, requestingUserId)).then((response)=>{
				dispatch({type:'SET_USER_PROFILE',other_user_profile:response.data});
			}).catch((error)=>{
				dispatch(showErrorAlert(error.response.data.error));
			});		
	};
}

// exports.BLOCK_USER = (userRequestingBlock, userToBeBlocked) => 
// `${API_URL}/block/${userRequestingBlock}/${userToBeBlocked}`;

exports.blockUser = (userIdToBlock, requestingUserId) =>{
	return function(dispatch){
		return axios.get(BLOCK_USER(requestingUserId,userIdToBlock)).then((response)=>{
			dispatch({type:'BLOCK_USER',userId:requestingUserId})
		}).catch((error)=>{
			dispatch(showErrorAlert("We were unable to block the user"));
		})
	}
}

exports.unBlockUser = (userIdToUnblock, requestingUserId) =>{
	return function(dispatch){
		return axios.get(UNBLOCK_USER(requestingUserId,userIdToUnblock)).then((response)=>{
			dispatch({type:'UNBLOCK_USER',userId:requestingUserId})
		}).catch((error)=>{
			dispatch(showErrorAlert("We were unable to block the user"));
		})
	}
}



