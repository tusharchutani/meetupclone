var defaultState = {
	rehyderated:false,
}

module.exports = (state=defaultState, action)=>{
	switch(action.type){
		case 'REHYDERATION_COMPLETE':
			return {
				rehyderated:true
			}
		default:
			return state;
	}
}