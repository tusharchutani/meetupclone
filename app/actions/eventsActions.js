// import axios from 'axios';

import {SecureStore} from 'expo';
import axios from 'axios';
import {EVENT_FEED, CREATE_EVENT,SEARCH_EVENT_BY_TAG,GET_EVENT_INFO} from '../api';



exports.getEventsNearMe = (latitude,longitude) => {
		return function(dispatch){
	 		return SecureStore.getItemAsync('user_id').then((userId)=>{
				return axios.get(EVENT_FEED(longitude,latitude,userId)).then((response)=>{
				dispatch(setEvents(response.data));
				}).catch((error)=>{
					console.log("There is an error "+error);
					dispatch(showErrorAlert(error.response.data.error));
				});	 			
	 		});
	}
}



exports.getMapEvents = (latitude,longitude) => {
		return function(dispatch){
	 		return SecureStore.getItemAsync('user_id').then((userId)=>{
				return axios.get(EVENT_FEED(longitude,latitude,userId)).then((response)=>{
				dispatch(setMapEvents(response.data));
				}).catch((error)=>{
					console.log("There is an error "+error);
					dispatch(showErrorAlert(error.response.data.error));
				});	 			
	 		});
	}
}


exports.createEvent = (newEvent) =>{
	return function(dispatch){
		return SecureStore.getItemAsync('token').then((token)=>{
	 		SecureStore.getValueWithKeyAsync('user_id').then((user_id)=>{
				return axios.post(CREATE_EVENT(user_id),newEvent,{headers: {'Authorization': token}}).then((response)=>{
					
				}).catch((error)=>
				{	
					console.log("error "+error);
					dispatch(showErrorAlert(error.message));
				});
	 		});			
		});

	}
}

setMapEvents = (events) =>{
	return {
		type: 'SET_MAP_EVENTS',
		events
	}
}
setEvents = (events) => {
	return {
		type: 'SET_EVENTS',
		events
	}
}
export function createEvent(args){

	return {
		type:'CREATE_EVENT',
		args
	};
}


export function getEventInfo(args){

	return {
		type:'GET_EVENT_INFO',
		eventInfo:args
	}
}


export function updateEventInfo(args){

	return function(dispatch){
		return axios.get(GET_EVENT_INFO(args)).then((response)=>{
			dispatch({type:'UPDATE_EVENT_INFO',eventInfo:response.data})
		}).catch((error)=>{
			dispatch(showErrorAlert(error.response.data.error))
		});
	}

}

export function searchEventsByTag(tags){
	return function(dispatch){
	 		return SecureStore.getItemAsync('user_id').then((userId)=>{
				return axios.get(SEARCH_EVENT_BY_TAG(userId,tags)).then((response)=>{
				dispatch(setEvents(response.data));
				}).catch((error)=>{
					console.log("There is an error "+error);
					dispatch(showErrorAlert(error.message));
				});	 			
	 		});

	}
}

