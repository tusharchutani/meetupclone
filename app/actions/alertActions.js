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

exports.showErrorAlert = (error) => {

	if(!error){
		error = "Unknown error";
	}
	console.log("Error is "+error);
	return {
		type:'SHOW_ALERT',
		alert_title:"Oops",
		alert_msg: error
	}
}