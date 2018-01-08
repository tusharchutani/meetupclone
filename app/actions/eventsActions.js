// import axios from 'axios';

import {SecureStore} from 'expo';
import axios from 'axios';
import {showErrorAlert} from './alertActions.js';
import {EVENT_FEED, CREATE_EVENT,SEARCH_EVENT_BY_TAG,GET_EVENT_INFO} from '../api';



exports.getEventsNearMe = (latitude,longitude,page=1) => {
		return function(dispatch){
	 		return SecureStore.getItemAsync('user_id').then((userId)=>{
				return axios.get(EVENT_FEED(longitude,latitude,userId,page),{timeout:60000}).then((response)=>{
					if(page == 1){
						dispatch(setEvents(response.data));
					}else{
						if(response.data.length != 0){
							dispatch(setMoreEvents(response.data))
						}
					}
				}).catch((error)=>{
					console.log("There is an error "+error);
					throw error.message
				});	 			
	 		});
	}
}



exports.getMapEvents = (latitude,longitude) => {
		return function(dispatch){
	 		return SecureStore.getItemAsync('user_id').then((userId)=>{
				return axios.get(EVENT_FEED(longitude,latitude,userId),{timeout:60000}).then((response)=>{
				dispatch(setMapEvents(response.data));
				}).catch((error)=>{
					console.log("There is an error "+error);
					dispatch(showErrorAlert("Unable to get events for map"));
				});	 			
	 		});
	}
}


exports.createEvent = (newEvent) =>{
	return function(dispatch){
		return SecureStore.getItemAsync('token').then((token)=>{
	 		SecureStore.getItemAsync('user_id').then((user_id)=>{
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

setMoreEvents = (events) => {
	return {
		type:'SET_MORE_LOADED_EVENTS',
		events
	}
}
export function createEvent(args){

	return {
		type:'CREATE_EVENT',
		args
	};
}


export function getEventInfo(id,myUserId){


	return function(dispatch){
		return axios.get(GET_EVENT_INFO(id,myUserId),{timeout:60000}).then((response)=>{
			dispatch({type:'SET_EVENT_INFO',eventInfo:response.data})
		});
	}
}


export function navigateToEventInfo(){
	return {
		type:'NAVIGATE_TO_EVENT_INFO'
	}
}


export function updateEventInfo(args, myUserId){

	return function(dispatch){
		return axios.get(GET_EVENT_INFO(args, myUserId),{timeout:60000}).then((response)=>{
			dispatch({type:'UPDATE_EVENT_INFO',eventInfo:response.data})
		}).catch((error)=>{
			dispatch(showErrorAlert(error.response.data.error))
		});
	}

}

export function searchEventsByTag(tags){
	return function(dispatch){
	 		return SecureStore.getItemAsync('user_id').then((userId)=>{
	 			tags = tags.replace(/\s*,\s*/g, ",");
				return axios.get(SEARCH_EVENT_BY_TAG(userId,tags)).then((response)=>{
				dispatch(setEvents(response.data));
				}).catch((error)=>{
					throw error.message
				});	 			
	 		});

	}
}



