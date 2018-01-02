var defaultState = {
	notificationList:{
		notification_array:[]
	}
}

module.exports = (state=defaultState, action)=>{
	switch(action.type){
		case 'SET_NOTIFICATIONS':
			return {
				notificationList:action.notifications
				}
		case 'READ_NOTIFICATION':
				let notificationList = state.notificationList.notification_array.map((notification)=>{
						if(notification._id == action.notificationId){
							notification.read = true;
						}
						return notification;
					});
				return {
					notificationList:{
						notification_array:notificationList
					}
				}
			
		default:
			return state;
	}
}