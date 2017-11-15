exports.showActivityIndicator = () => {
		return {
		type:'SHOW_ACTIVITY_INDICATOR'
		}
}

exports.hideActivityIndicator = () => {
	return {
		type:'HIDE_ACTIVITY_INDICATOR'
	}
}

exports.autoRehydrationComplete = () => {
	return {
		type: 'REHYDERATION_COMPLETE'
	}
}