module.exports = (state, action) => {
	switch(action.type){
		case 'SHOW_ALERT':
			return {
				showAlert:true,
				alert_title: action.alert_title,
				alert_msg: action.alert_msg
			}
		case 'HIDE_ALERT':
		default:
			return {
				showAlert:false,
			};
	}
}