var defaultState = {
	myProfile:undefined,
	other_user_profile:undefined
}

module.exports = (state=defaultState, action)=>{
	switch(action.type){
		case 'SET_MY_PROFILE':
			return {
				...state,
				myProfile:action.myProfile
			}
		case 'SET_USER_PROFILE':
			return {
				...state,
				other_user_profile:action.other_user_profile
			}
		
		case 'UNAUTH_USER':
			return {
				user_id:undefined
			}
		default:
			return state;
	}
}