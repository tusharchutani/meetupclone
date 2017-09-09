// import axios from 'axios';
import Keychain from 'react-native-keychain';

import {EVENT_FEED} from '../api';



export function getEvents(){


	return [{
		eventName:'Event 1',
		tags: ['Tag 1', 'Tag 2', 'Tag 2'],
		eventInfo: 'Event information goes here. This is a test 1 2 3 4 5'
	}, {
		eventName:'Camping',
		tags: ['Party', 'Camping', 'Adventure'],
		eventInfo: 'Event information goes here. This is a test 1 2 3 4 5'
	}, {
		eventName:'Ice hockey',
		tags: ['Sports', 'Hockey', 'Skating'],
		eventInfo: 'Event information goes here. This is a test 1 2 3 4 5'
	}]
}

export function createEvent(args){

	return {
		type:'CREATE_EVENT',
		args
	};
}