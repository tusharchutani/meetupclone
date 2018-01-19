var defaultState = {
	location:{
		latitude:null, 
		longitude: null
	}
}

module.exports = (state=defaultState, action)=>{
	switch(action.type){
		case 'SET_CURRENT_LOCATION':
			return action.location
		default:
			return state;
	}
}