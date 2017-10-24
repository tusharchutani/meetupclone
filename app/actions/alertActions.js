exports.showAlert = (alertTitle, alertMessage) => {
		return {
		type:'SHOW_ALERT',
		alert_title:alertTitle,
		alert_msg: alertMessage
		}
}

exports.hideAlert = () => {
	return {
		type:'HIDE_ALERT'
	}
}