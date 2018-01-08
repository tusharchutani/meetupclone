var defaultState = {
	uiEnabled:false,
}

module.exports = (state=defaultState, action)=>{
	switch(action.type){
		case 'ENABLE_UI':
			return {
				uiEnabled:true
			}
		default:
			return state;
	}
}