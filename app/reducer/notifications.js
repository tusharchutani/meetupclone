var defaultState = {
	notifications:[]
}

module.exports = (state=defaultState, action)=>{
	switch(action.type){
		case 'SET_NOTIFICATIONS':
			return {
				notificationList:action.notifications
				}
		default:
			return state;
	}
}