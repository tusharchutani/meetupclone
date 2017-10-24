var defaultState = {}

module.exports = (state=defaultState, action)=>{
	switch(action.type){
		case 'SET_EVENTS':
			return {
				eventList: action.events,
				mapEvents:action.events
				}
		case 'GET_EVENT_INFO':
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
			...this.state,
			mapEvents:actions.events
		}
		case 'CREATE_EVENT':
			return {
				user_id:action.user_id
			}
		default:
			return state;
	}
}