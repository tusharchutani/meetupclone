var defaultState = {
}

module.exports = (state=defaultState, action)=>{
	switch(action.type){
		case 'SET_FOLLOWERS_FOLLOWING':
			return {
				...state,
				list:action.list,
				isFindUser:action.isFindUser,
				title:action.title
			}		
		case 'OPEN_FIND_FRIENDS':
			return {
				list:[],
				isFindUser:true,
				title:'Find friends'
			}
		case 'SET_FIND_FRIENDS':
			return {
				isFindUser:true,
				list: action.list,
				title:'Find friends'
			}
		default:
			return state;
	}
}