var defaultState = {
	eventInfo:{}
}

module.exports = (state=defaultState, action)=>{
	switch(action.type){
		case 'SET_EVENTS':
			return {
				...state,
				eventList: action.events,
				mapEvents:action.events
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
		case 'UPDATE_EVENT_INFO':
			return {
				...state,
				eventInfo:action.eventInfo
			}
		case 'SET_MAP_EVENTS':
		return {
			...state,
			mapEvents:actions.events
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