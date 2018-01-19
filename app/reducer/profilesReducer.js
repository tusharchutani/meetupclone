var defaultState = {
	myProfile:undefined,
	other_user_profile:undefined
}

module.exports = (state=defaultState, action)=>{
	let other_user_profile = state.other_user_profile;
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
		case 'BLOCK_USER':
			
			other_user_profile.blockedBy.push(action.userId);
			return {
				...state,
				other_user_profile:{
					...state.other_user_profile,
					blockedBy:other_user_profile.blockedBy
				}
			}			
		case 'UNBLOCK_USER':

			other_user_profile.blockedBy = other_user_profile.blockedBy.filter(userId => userId != action.userId)
			
			return {
				...state,
				other_user_profile:{
					...state.other_user_profile,
					blockedBy:other_user_profile.blockedBy
				}
			}
		case 'UNAUTH_USER':
			return {
				user_id:undefined
			}
		default:
			return state;
	}
}