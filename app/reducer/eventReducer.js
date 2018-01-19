var defaultState = {
	eventInfo:{}
}

module.exports = (state=defaultState, action)=>{
	switch(action.type){
		case 'SET_EVENTS':
			return {
				...state,
				eventList: action.events,
				// mapEvents:action.events
				}
		case 'NAVIGATE_TO_EVENT_INFO':
			return {
				...state,
				eventInfo:{}
			}
		case 'SET_EVENT_INFO':
		return {
			...state,
			eventInfo:action.eventInfo
		}
		case 'OBJECT_FLAGGED':
		return {
			...state,
			eventList: state.eventList.filter(event => event._id != action.eventId),
			mapEvents: state.mapEvents.filter(event => event._id != action.eventId)
		}
		case 'UPDATE_EVENT_INFO':
			return {
				...state,
				eventInfo:action.eventInfo
			}
		case 'SET_MAP_EVENTS':
		return {
			...state,
			mapEvents:action.events
		}
		case 'OPEN_EVENT_LOCATION':
		return {
			...state,
			mapEvent:{
				location:action.location
			}
		}
		case 'SET_MORE_LOADED_EVENTS':
			return {
				...state,
				eventList: [...state.eventList, ...action.events]

			}
		case 'CREATE_EVENT':
			return {
				...state,
				user_id:action.user_id
			}
		default:
			return state;
	}
}