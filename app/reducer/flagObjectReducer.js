module.exports = (state, action) => {
	switch(action.type){
		case 'OPEN_FLAG_OBJECT':
			return {
				isEvent:action.isEvent
			}
		default:
			return {
				isEvent:true,
			};
	}
}